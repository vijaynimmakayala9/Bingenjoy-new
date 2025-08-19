import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";
import { URLS } from "../Url";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaRegClock,
  FaUser,
  FaBirthdayCake,
  FaRegSmile,
} from "react-icons/fa";

const ComboBooking = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const navigate = useNavigate();
  const [policys, setpolicys] = useState([]);

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    GetTheatersData();
    GetPoliciesData();
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const GetTheatersData = () => {
    axios.post(URLS.GetAllTheaters, {}).then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
      }
    });
  };

  const GetPoliciesData = () => {
    axios.post(URLS.GetPolicies, {}, {}).then((res) => {
      if (res.status === 200) {
        setpolicys(res.data.policy);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAgreed) {
      toast.error("You must agree to the terms and conditions to proceed.");
      return;
    }
    setShowPopup(true);
  };

  const handleConfirmPayment = async () => {
    setShowPopup(false);
    setIsLoading1(true);

    try {
      const extrapersiontheater = parseFloat(sessionStorage.getItem("countPeople"));
      const maxPeopletheater = parseFloat(sessionStorage.getItem("maxPeople"));
      const token = sessionStorage.getItem("token");

      const payload = {
        planOfferPrice: sessionStorage.getItem("planpricesss"),
        totalPrice: sessionStorage.getItem("totalallprice"),
        subTotal: sessionStorage.getItem("subtotalallprice"),
        advancePayment: parseFloat(sessionStorage.getItem("comboAdvancePayment")),
        theatrePrice: parseFloat(sessionStorage.getItem("theaterPrice")),
        bookingId: sessionStorage.getItem("bookingid"),
        couponId: sessionStorage.getItem("coupon_Id"),
        couponAmount: sessionStorage.getItem("coupondis"),
        extraAddedPersonsForTheatre: sessionStorage.getItem("countPeople"),
        cashType: "online",
        create_type: "web",
      };

      if (extrapersiontheater > maxPeopletheater) {
        payload.extraPersonPrice = sessionStorage.getItem("planextrapersoncharge") || 0;
      }

      const res = await axios.post(
        "https://api.carnivalcastle.com/v1/carnivalApi/web/booking/new/updatebookingforPaymentforrazorpay",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200 && res.data.success) {
        const orderData = res.data.data;

        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Carnival Castle",
          description: "Combo Booking Payment",
          order_id: orderData.orderId,
          handler: async (response) => {
            await completeBooking(response.razorpay_payment_id);
          },
          prefill: {
            name: sessionStorage.getItem("name"),
            email: sessionStorage.getItem("email"),
            contact: sessionStorage.getItem("phone"),
          },
          theme: {
            color: "#015A65",
          },
          modal: {
            ondismiss: () => {
              toast.info("Payment window closed");
            },
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        toast.error(res.data.message || "Failed to initialize payment");
      }
    } catch (error) {
      console.error("Payment init error:", error);
      toast.error(error.response?.data?.message || "Failed to start payment");
      
      if (error.response?.status === 400 || error.response?.status === 406) {
        setTimeout(() => navigate("/theaters"), 2000);
      }
    } finally {
      setIsLoading1(false);
    }
  };

  const completeBooking = async (paymentId) => {
    try {
      const extrapersiontheater = parseFloat(sessionStorage.getItem("countPeople"));
      const maxPeopletheater = parseFloat(sessionStorage.getItem("maxPeople"));
      const token = sessionStorage.getItem("token");

      const dataArray = {
        planOfferPrice: sessionStorage.getItem("planpricesss"),
        totalPrice: sessionStorage.getItem("totalallprice"),
        subTotal: sessionStorage.getItem("subtotalallprice"),
        advancePayment: parseFloat(sessionStorage.getItem("comboAdvancePayment")),
        theatrePrice: parseFloat(sessionStorage.getItem("theaterPrice")),
        bookingId: sessionStorage.getItem("bookingid"),
        couponId: sessionStorage.getItem("coupon_Id"),
        couponAmount: sessionStorage.getItem("coupondis"),
        extraAddedPersonsForTheatre: sessionStorage.getItem("countPeople"),
        transactionId: paymentId,
        transactionStatus: "completed",
        cashType: "online",
        create_type: "web",
        status: "booking-confirmed",
      };

      if (extrapersiontheater > maxPeopletheater) {
        dataArray.extraPersonPrice = sessionStorage.getItem("planextrapersoncharge") || 0;
      }

      const res = await axios.post(
        "https://api.carnivalcastle.com/v1/carnivalApi/web/booking/new/updatebookingforPayment",
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("invoicePath", res.data.invoicePath);
        localStorage.setItem("orderId", res.data.orderId);
        localStorage.setItem("bookingid", res.data.bookingId);
        navigate("/payment-success");
      }
    } catch (error) {
      console.error("Booking completion error:", error);
      toast.error(error.response?.data?.message || "Booking completion failed");
      
      if (error.response?.status === 400) {
        navigate("/payment-fail");
      } else if (error.response?.status === 406) {
        setTimeout(() => {
          navigate("/theaters");
        }, 2000);
      }
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleClick = () => {
    navigate("/ComboPlans");
  };

  return (
    <>
      {isLoading === true ? (
        <div
          className="text-center"
          style={{
            backgroundColor: "var(--charcoal-black)",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img
              src="assets/img/gipss.gif"
              style={{ height: "300px" }}
              alt="Loading"
            />
            <h6 style={{ color: "white" }}>Loading...</h6>
          </div>
        </div>
      ) : (
        <div className="home-page indexsix">
          <Header />
          <main className="main-wrapper">
            <section
              id="parallax"
              className="slider-area breadcrumb-area d-flex align-items-center justify-content-center fix"
            >
              <div className="container"></div>
            </section>
            <section
              className="shop-area pt-4 pb-5 p-relative lightest-back "
              style={{ background: "white" }}
            >
              <div className="container mx-auto p-4">
                <button
                  type="button"
                  className="btn mb-3 light-back shadow-lg text-light mb-3"
                  onClick={handleClick}
                  style={{
                    boxShadow: "none",
                    color: "black",
                    border: "none",
                  }}
                >
                  <i className="far fa-arrow-alt-circle-left"></i> Back
                </button>

                <div className="row">
                  <div className="col-12 ">
                    <div
                      className="shadow-lg bg-white p-4 d-flex flex-column rounded"
                      style={{ height: "700px" }}
                    >
                      <div
                        className="mt-2 flex-grow-1"
                        style={{
                          overflowY: "auto",
                          paddingRight: "10px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: policys.termsAndCondition,
                        }}
                      ></div>

                      <div className="mt-auto text-center">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          id="agreeCheckbox"
                          onChange={(e) => setIsAgreed(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="agreeCheckbox"
                        >
                          I agree to all the above conditions.
                        </label>
                      </div>

                      <div className="d-flex justify-content-end mt-3">
                        {isLoading1 == true ? (
                          <button
                            className="btn btn-outline-success main-booknow"
                            style={{
                              boxShadow: "none",
                              color: "black",
                              border: "none",
                            }}
                            disabled
                          >
                            Your Booking Processing...
                          </button>
                        ) : (
                          <button
                            className="btn darkest-back text-white"
                            style={{
                              boxShadow: "none",
                              color: "black",
                              border: "none",
                            }}
                            onClick={handleSubmit}
                            disabled={!isAgreed || !razorpayLoaded}
                          >
                            Confirm & Pay Advance
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Payment Confirmation Modal */}
            {showPopup && (
              <div className="modal fade show" style={{ display: 'block', zIndex: 1050 }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Confirm Your Booking</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCancel}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p className="confirmation-text">
                        You're about to proceed with the payment. The advance amount will be charged immediately. Are you sure you want to continue?
                      </p>
                      <div className="price-details">
                        <div>
                          <p><strong>Advance Amount:</strong> ₹{sessionStorage.getItem("comboAdvancePayment")}</p>
                        </div>
                        <div>
                          <p><strong>Total Amount:</strong> ₹{sessionStorage.getItem("totalallprice")}</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                      <button type="button" className="btn light-back text-white" onClick={handleConfirmPayment}>Confirm Payment</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <Footer />
          </main>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default ComboBooking;