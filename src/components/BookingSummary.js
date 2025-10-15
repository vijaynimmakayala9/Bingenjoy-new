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

const BookingForm = () => {
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
        let updatedTerms = res.data.policy.termsAndCondition;

        // Replace the terms and conditions text
        updatedTerms = updatedTerms.replace(
          /https:\/\/carnivalcastle\.com/g,
          'https://bingenjoy.com'
        ).replace(
          /Carnival Castle/g,
          'Binge n Joy'
        );

        setpolicys({ termsAndCondition: updatedTerms });
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
      // Construct payload from sessionStorage
      const payload = {
        bookingId: sessionStorage.getItem("bookingid"),
        totalPrice: parseFloat(sessionStorage.getItem("TotalPrice")),
        subTotal:
          parseFloat(sessionStorage.getItem("theaterPrice") || 0) +
          parseFloat(sessionStorage.getItem("cakeprice") || 0) +
          parseFloat(sessionStorage.getItem("occprice") || 0) +
          (parseFloat(sessionStorage.getItem("addons")) || 0),
        advancePayment: parseFloat(sessionStorage.getItem("advancePayment")),
        theatrePrice: parseFloat(sessionStorage.getItem("theaterPrice")),
        couponId: sessionStorage.getItem("coupon_Id"),
        couponAmount: parseFloat(sessionStorage.getItem("coupondis") || 0),
        extraAddedPersonsForTheatre: sessionStorage.getItem("countPeople"),
        extraPersonPrice: parseFloat(sessionStorage.getItem("extraPersonperprice") || 0),
        cashType: "online",
        remainingAmount: parseFloat(sessionStorage.getItem("TotalPrice")) - parseFloat(sessionStorage.getItem("advancePayment")),
        create_type: "web",
      };

      const res = await axios.post(
        `https://api.carnivalcastle.com/v1/carnivalApi/web/booking/new/updatebookingforPaymentforrazorpay`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200 && res.data.success) {
        const orderData = res.data.data;

        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Carnival Castle",
          description: "Booking Payment",
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
         console.log("tttttttttttttttttttttttt", payload)
        console.log("sssssssssssssssssssssssssssss", payload)
        console.log("fffffffffffffffffffffffffffffffffff", options)
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        toast.error(res.data.message || "Failed to initialize Razorpay order");
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

      const totoalbasicprice =
        parseFloat(sessionStorage.getItem("theaterPrice") || 0) +
        parseFloat(sessionStorage.getItem("cakeprice") || 0) +
        parseFloat(sessionStorage.getItem("occprice") || 0) +
        (parseFloat(sessionStorage.getItem("addons")) || 0) -
        parseFloat(sessionStorage.getItem("couponAmount") || 0);

      const totoalbasicpricesubtotal =
        parseFloat(sessionStorage.getItem("theaterPrice") || 0) +
        parseFloat(sessionStorage.getItem("cakeprice") || 0) +
        parseFloat(sessionStorage.getItem("occprice") || 0) +
        (parseFloat(sessionStorage.getItem("addons")) || 0);

      const data = {
        totalPrice: totoalbasicprice,
        subTotal: totoalbasicpricesubtotal,
        advancePayment: parseFloat(sessionStorage.getItem("advancePayment")),
        theatrePrice: parseFloat(sessionStorage.getItem("theaterPrice")),
        bookingId: sessionStorage.getItem("bookingid"),
        couponId: sessionStorage.getItem("coupon_Id"),
        couponAmount: sessionStorage.getItem("coupondis"),
        extraAddedPersonsForTheatre: sessionStorage.getItem("countPeople"),
        cashType: "online",
        remainingAmount: totoalbasicprice - parseFloat(sessionStorage.getItem("advancePayment")),
        create_type: "web",
        razorpayOrderId: paymentId,
        transactionStatus: "completed",
        status: "booking-confirmed"
      };

      if (extrapersiontheater > maxPeopletheater) {
        data.extraPersonPrice = sessionStorage.getItem("extraPersonperprice") || 0;
      }

      const res = await axios.post(
        `https://api.carnivalcastle.com/v1/carnivalApi/web/booking/new/updatebookingforPaymentforrazorpay`,
        data,
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        }
      );

      if (res.status === 200) {
        // Submit cakes if any
        await submitCakes();

        // Store in localStorage
        localStorage.setItem("invoicePath", res.data.invoicePath);
        localStorage.setItem("orderId", res.data.orderId);
        localStorage.setItem("bookingid", res.data.bookingId); // Store bookingId here

        // Alert to show that bookingId is saved and display it
        alert(`Booking successful! Your Booking ID is: ${res.data.bookingId}\nThe booking ID has been saved in localStorage.`);

        // Navigate to Thank You page
        navigate("/payment-success");
      }
    } catch (error) {
      console.error("Booking completion error:", error);
      toast.error(error.response?.data?.message || "Booking completion failed");

      if (error.response?.status === 400) {
        navigate("/PaymentFail");
      } else if (error.response?.status === 406) {
        setTimeout(() => {
          navigate("/theaters");
        }, 2000);
      }
    } finally {
      setIsLoading1(false);
    }
  };

  const submitCakes = async () => {
    const allcakes = JSON.parse(sessionStorage.getItem("cartCakes")) || [];
    const allcakeslength = JSON.parse(sessionStorage.getItem("selectedWeights")) || {};

    if (allcakes.length === 0) return;

    const productMap = allcakes.map((e) => ({
      _id: e._id,
      name: e.name,
      type: "cake",
      cakeType: e.cakeType,
      price: e.price,
      quantity: parseFloat(allcakeslength[e._id] || "500"),
    }));

    const bodyData = {
      products: productMap,
      bookingId: sessionStorage.getItem("bookingid"),
    };

    try {
      await axios.post(`https://api.carnivalcastle.com/v1/carnivalApi/web/booking/new/updatecakes`, bodyData);
    } catch (error) {
      console.error("Error submitting cakes:", error);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center loading-screen">
          <img src="assets/img/gipss.gif" alt="Loading" />
          <h6>Loading...</h6>
        </div>
      ) : (
        <div className="home-page indexsix">
          <Header />
          <main className="main-wrapper">
            <section className="slider-area breadcrumb-area d-flex align-items-center justify-content-center fix">
              <div className="container"></div>
            </section>

            <section className="shop-area pt-4 pb-5 p-relative lightest-back" style={{ background: "white" }}>
              <div className="container mx-auto p-4">
                <button
                  type="button"
                  className="btn light-back shadow-lg text-light mb-3 "
                  onClick={() => navigate("/AddOnscomponent")}
                >
                  <i className="far fa-arrow-alt-circle-left"></i> Back
                </button>

                <div className="row">
                  <div className="col-12">
                    <div className="shadow-lg bg-white text-black p-4 d-flex flex-column rounded-2 terms-container">
                      <div
                        className="mt-2 flex-grow-1 terms-content"
                        dangerouslySetInnerHTML={{
                          __html: policys.termsAndCondition,
                        }}
                      ></div>

                      <div className="mt-auto text-center agree-checkbox">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          id="agreeCheckbox"
                          checked={isAgreed}
                          onChange={(e) => setIsAgreed(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="agreeCheckbox">
                          I agree to all the above conditions.
                        </label>
                      </div>

                      <div className="d-flex justify-content-end mt-3">
                        {isLoading1 ? (
                          <button className="btn btn-outline-success main-booknow" disabled>
                            Processing Payment...
                          </button>
                        ) : (
                          <button
                            className="btn darkest-back text-white"
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
            <Footer />
          </main>
          {/* Payment Confirmation Modal */}
          {showPopup && (
            <div className="modal fade show" style={{ display: 'block', zIndex: 1050 }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">

                  {/* Modal Header */}
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Confirm Your Booking</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCancel}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="modal-body">
                    <p className="confirmation-text">
                      You're about to proceed with the payment. The advance amount will be charged immediately. Are you sure you want to continue?
                    </p>

                    {/* Price Details */}
                    <div className="price-details">
                      <div>
                        <p><strong>Advance Amount:</strong> ₹{sessionStorage.getItem("advancePayment")}</p>
                      </div>
                      <div>
                        <p><strong>Due Amount:</strong> ₹{sessionStorage.getItem("TotalPrice")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="btn light-back text-white" onClick={handleConfirmPayment}>Confirm Payment</button>
                  </div>
                </div>
              </div>
            </div>
          )}


          <ToastContainer />
          <style jsx>{`
            .loading-screen {
              background-color: var(--charcoal-black);
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              color: white;
            }
            
            .terms-container {
              height: 700px;
              border-radius: 10px;
            }
            
            .terms-content {
              overflow-y: auto;
              padding-right: 10px;
            }
            
            .agree-checkbox {
              padding: 15px 0;
            }
            
            /* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Modal Container */
.modal-container {
  background-color: #fff;
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-out;
}

/* Modal Content */
.modal-content {
  display: flex;
  flex-direction: column;
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.close {
  font-size: 24px;
  cursor: pointer;
  border: none;
  background: none;
  color: #333;
}

/* Modal Body */
.modal-body {
  margin-bottom: 20px;
}

.confirmation-text {
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
}

.price-details {
  font-size: 16px;
  color: #333;
}

.price-details div {
  margin-bottom: 10px;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #555;
  border: 1px solid #ccc;
  transition: background-color 0.3s ease;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}

.btn-confirm {
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
  transition: background-color 0.3s ease;
}

.btn-confirm:hover {
  background-color: #0056b3;
}

/* Animation for Modal Appearance */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

          `}</style>
        </div>
      )}
    </>
  );
};

export default BookingForm;