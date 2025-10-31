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
  const [heardFrom, setHeardFrom] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponSuccess, setShowCouponSuccess] = useState(false);
  const [allCoupons, setAllCoupons] = useState([]);
  const navigate = useNavigate();
  const [policys, setpolicys] = useState([]);

  // Options for "Where did you hear about us?"
  const heardFromOptions = [
    "Google Search",
    "Social Media",
    "Friend/Family Referral",
    "Website/Blog",
    "Advertisement",
    "Instagram",
    "Facebook",
    "WhatsApp",
    "Other"
  ];

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    GetTheatersData();
    GetPoliciesData();
    getAllCoupons();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch all coupons from API
  const getAllCoupons = async () => {
    try {
      const res = await axios.get(`https://api.carnivalcastle.com/v1/carnivalApi/admin/coupon/getallbingenjoycoupons`);
      if (res.status === 200 && res.data.success) {
        setAllCoupons(res.data.coupons || []);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

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

  // Apply Coupon Code Function - With actual coupon validation
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    
    try {
      const foundCoupon = allCoupons.find(coupon => 
        coupon.couponCode && coupon.couponCode.toLowerCase() === couponCode.trim().toLowerCase()
      );

      if (foundCoupon) {
        if (foundCoupon.status !== "active") {
          toast.error("This coupon is not active");
          setIsApplyingCoupon(false);
          return;
        }

        const currentDate = new Date();
        const fromDate = new Date(foundCoupon.fromDate);
        const toDate = new Date(foundCoupon.toDate);
        
        if (currentDate < fromDate || currentDate > toDate) {
          toast.error("This coupon is expired or not yet valid");
          setIsApplyingCoupon(false);
          return;
        }

        let discountAmount = 0;
        
        if (foundCoupon.discountType === "fixed") {
          discountAmount = parseFloat(foundCoupon.value) || parseFloat(foundCoupon.amount) || 0;
        } else if (foundCoupon.discountType === "percentage") {
          const totalAmount = parseFloat(sessionStorage.getItem("TotalPrice") || 0);
          discountAmount = (totalAmount * parseFloat(foundCoupon.value)) / 100;
        } else {
          discountAmount = parseFloat(foundCoupon.amount) || parseFloat(foundCoupon.value) || 0;
        }

        const couponData = {
          couponCode: foundCoupon.couponCode,
          discountAmount: discountAmount,
          couponId: foundCoupon._id,
          message: "Coupon applied successfully!",
          couponDetails: foundCoupon
        };
        
        setAppliedCoupon(couponData);
        setShowCouponSuccess(true);
        
        sessionStorage.setItem("couponCode", couponData.couponCode);
        sessionStorage.setItem("coupondis", couponData.discountAmount);
        sessionStorage.setItem("couponAmount", couponData.discountAmount);
        sessionStorage.setItem("couponId", couponData.couponId);
        
        toast.success(`Coupon applied successfully! Discount: ₹${discountAmount}`);
      } else {
        toast.error("Invalid coupon code");
      }
    } catch (error) {
      console.error("Coupon apply error:", error);
      toast.error("Failed to apply coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Remove Coupon Function
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setShowCouponSuccess(false);
    
    sessionStorage.removeItem("couponCode");
    sessionStorage.removeItem("coupondis");
    sessionStorage.removeItem("couponAmount");
    sessionStorage.removeItem("couponId");
    
    toast.info("Coupon removed");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAgreed) {
      toast.error("You must agree to the terms and conditions to proceed.");
      return;
    }
    if (!heardFrom) {
      toast.error("Please let us know where you heard about us.");
      return;
    }
    setShowPopup(true);
  };

  const handleConfirmPayment = async () => {
    setShowPopup(false);
    setIsLoading1(true);

    try {
      const theaterPrice = parseFloat(sessionStorage.getItem("theaterPrice") || 0);
      const cakePrice = parseFloat(sessionStorage.getItem("cakeprice") || 0);
      const occPrice = parseFloat(sessionStorage.getItem("occprice") || 0);
      const addons = parseFloat(sessionStorage.getItem("addons") || 0);
      const totalPrice = parseFloat(sessionStorage.getItem("TotalPrice"));
      const advancePayment = parseFloat(sessionStorage.getItem("advancePayment"));
      
      const subTotal = theaterPrice + cakePrice + occPrice + addons;

      const payload = {
        bookingId: sessionStorage.getItem("bookingid"),
        totalPrice: totalPrice,
        subTotal: subTotal,
        advancePayment: advancePayment,
        theatrePrice: theaterPrice,
        couponCode: appliedCoupon ? appliedCoupon.couponCode : "",
        couponAmount: appliedCoupon ? appliedCoupon.discountAmount : 0,
        extraAddedPersonsForTheatre: 0,
        extraPersonPrice: parseFloat(sessionStorage.getItem("extraPersonperprice") || 0),
        cashType: "online",
        remainingAmount: totalPrice - advancePayment,
        create_type: "web",
        heardFrom: heardFrom,
      };

      console.log("🟡 Frontend - Sending payload to updatebookingforPaymentforrazorpay:", JSON.stringify(payload, null, 2));

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
          name: "Binge n Joy",
          description: "Booking Payment",
          order_id: orderData.orderId,
          handler: async (response) => {
            await completeBooking(response.razorpay_payment_id, response.razorpay_order_id);
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
        toast.error(res.data.message || "Failed to initialize Razorpay order");
      }
    } catch (error) {
      console.error("Payment init error:", error);
      toast.error(error.response?.data?.message || "Failed to start payment");

      if (error.response?.status === 400 || error.response?.status === 406) {
        setTimeout(() => navigate("/locations"), 2000);
      }
    } finally {
      setIsLoading1(false);
    }
  };

  const completeBooking = async (paymentId, orderId) => {
    try {
      const extrapersiontheater = parseFloat(sessionStorage.getItem("countPeople"));
      const maxPeopletheater = parseFloat(sessionStorage.getItem("maxPeople"));

      const theaterPrice = parseFloat(sessionStorage.getItem("theaterPrice") || 0);
      const cakePrice = parseFloat(sessionStorage.getItem("cakeprice") || 0);
      const occPrice = parseFloat(sessionStorage.getItem("occprice") || 0);
      const addons = parseFloat(sessionStorage.getItem("addons") || 0);
      const advancePayment = parseFloat(sessionStorage.getItem("advancePayment"));

      const totoalbasicpricesubtotal = theaterPrice + cakePrice + occPrice + addons;
      const totoalbasicprice = totoalbasicpricesubtotal - (appliedCoupon ? appliedCoupon.discountAmount : 0);

      const data = {
        totalPrice: totoalbasicprice,
        subTotal: totoalbasicpricesubtotal,
        advancePayment: advancePayment,
        theatrePrice: theaterPrice,
        bookingId: sessionStorage.getItem("bookingid"),
        couponCode: appliedCoupon ? appliedCoupon.couponCode : "",
        couponAmount: appliedCoupon ? appliedCoupon.discountAmount : 0,
        extraAddedPersonsForTheatre: 0,
        cashType: "online",
        remainingAmount: totoalbasicprice - advancePayment,
        create_type: "web",
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        razorpaySignature: "signature_required",
        heardFrom: heardFrom,
      };

      if (extrapersiontheater > maxPeopletheater) {
        data.extraPersonPrice = sessionStorage.getItem("extraPersonperprice") || 0;
      }

      console.log("🟡 Frontend - Sending payload to completeRazorpayPayment:", JSON.stringify(data, null, 2));

      const res = await axios.post(
        `https://api.carnivalcastle.com/v1/carnivalApi/web/booking/new/completeRazorpayPayment`,
        data,
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        }
      );

      if (res.status === 200 && res.data.success) {
        if (res.data.data.transactionStatus === "completed") {
          await submitCakes();

          const { bookingId, orderId, invoicePath } = res.data.data;

          localStorage.setItem("invoicePath", invoicePath || "");
          localStorage.setItem("orderId", orderId || "");
          localStorage.setItem("bookingid", bookingId || "");

          toast.success(`Booking successful! Your Booking ID is: ${bookingId}`);
          navigate("/payment-success");
        } else if (res.data.data.transactionStatus === "payment-initiated") {
          toast.info("Payment initiated. Your booking will be confirmed once payment is processed.");
          navigate("/payment-pending");
        } else {
          throw new Error("Payment failed");
        }
      } else {
        throw new Error(res.data.message || "Payment processing failed");
      }
    } catch (error) {
      console.error("Booking completion error:", error);
      toast.error(error.response?.data?.message || "Booking completion failed");
      navigate("/PaymentFail");
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

  // Handle Enter key press for coupon code
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      applyCoupon();
    }
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
                  className="btn mb-3 light-back shadow-lg text-light"
                  onClick={() => navigate("/AddOnscomponent")}
                >
                  <i className="far fa-arrow-alt-circle-left"></i> Back
                </button>

                <div className="row">
                  <div className="col-12">
                    <div className="shadow-lg bg-white text-black p-4 d-flex flex-column terms-container">
                      {/* Where did you hear about us? Section */}
                      <div className="mb-4 heard-from-section">
                        <label htmlFor="heardFrom" className="form-label fw-bold">
                          Where did you hear about us? *
                        </label>
                        <select
                          className="form-select"
                          id="heardFrom"
                          value={heardFrom}
                          onChange={(e) => setHeardFrom(e.target.value)}
                          required
                        >
                          <option value="">Select an option</option>
                          {heardFromOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <div className="form-text">
                          Help us understand how you discovered Binge n Joy
                        </div>
                      </div>

                      {/* Apply Coupon Code Section */}
                      <div className="mb-4 coupon-section">
                        <label htmlFor="couponCode" className="form-label fw-bold">
                          Apply Coupon Code
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="couponCode"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isApplyingCoupon || appliedCoupon}
                          />
                          {appliedCoupon ? (
                            <button
                              className="btn btn-outline-danger"
                              type="button"
                              onClick={removeCoupon}
                              disabled={isApplyingCoupon}
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-success"
                              type="button"
                              onClick={applyCoupon}
                              disabled={isApplyingCoupon || !couponCode.trim()}
                            >
                              {isApplyingCoupon ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  Applying...
                                </>
                              ) : (
                                "Apply"
                              )}
                            </button>
                          )}
                        </div>
                        
                        {/* Applied Coupon Display */}
                        {appliedCoupon && (
                          <div className="mt-2 p-2 light-back text-white rounded">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <div>
                                  <strong>Coupon Applied:</strong> {appliedCoupon.couponCode}
                                </div>
                                <div>
                                  <small>Discount: ₹{appliedCoupon.discountAmount}</small>
                                </div>
                                {appliedCoupon.couponDetails && (
                                  <div>
                                    <small>Title: {appliedCoupon.couponDetails.title}</small>
                                  </div>
                                )}
                              </div>
                              <button 
                                type="button" 
                                className="btn-close btn-close-white" 
                                onClick={removeCoupon}
                                aria-label="Remove coupon"
                              ></button>
                            </div>
                          </div>
                        )}
                        
                        <div className="form-text">
                          Enter your coupon code and press Apply or hit Enter
                        </div>
                      </div>

                      {/* Terms and Conditions Section */}
                      <div className="terms-section">
                        <h5 className="mb-3">Terms & Conditions</h5>
                        <div className="terms-content-container">
                          <div
                            className="terms-content"
                            dangerouslySetInnerHTML={{
                              __html: policys.termsAndCondition,
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Agreement Checkbox - Fixed at bottom */}
                      <div className="terms-footer">
                        <div className="agree-checkbox">
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

                        {/* Confirm Button */}
                        <div className="confirm-button">
                          {isLoading1 ? (
                            <button className="btn btn-outline-success main-booknow" disabled>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Processing Payment...
                            </button>
                          ) : (
                            <button
                              className="btn confirm-pay-btn"
                              style={{
                                background: (isAgreed && heardFrom) ? "#330C5F" : "#6c757d",
                                border: "none",
                                color: "white",
                                fontWeight: "600",
                                padding: "10px 30px",
                              }}
                              onClick={handleSubmit}
                              disabled={!isAgreed || !heardFrom || !razorpayLoaded}
                            >
                              {razorpayLoaded ? "Confirm & Pay Advance" : "Loading Payment..."}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Footer />
          </main>

          {/* Coupon Success Modal */}
          {showCouponSuccess && (
            <div className="modal fade show" style={{ display: 'block', zIndex: 1060, display: "flex", alignItems: "center", justifyContent: "center" }} tabIndex="-1" role="dialog">
              <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                  <div className="modal-header light-back text-white">
                    <h5 className="modal-title">Congratulations! 🎉</h5>
                    <button 
                      type="button" 
                      className="btn-close btn-close-white" 
                      onClick={() => setShowCouponSuccess(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body text-center">
                    <div className="mb-3">
                      <i className="bi bi-gift-fill light-text" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h6 className="light-text">Coupon Applied Successfully!</h6>
                    <p className="mb-0">
                      <strong>Code:</strong> {appliedCoupon?.couponCode}<br/>
                      <strong>Discount:</strong> ₹{appliedCoupon?.discountAmount}<br/>
                    </p>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button 
                      type="button" 
                      className="btn light-back text-white"
                      onClick={() => setShowCouponSuccess(false)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Confirmation Modal */}
          {showPopup && (
            <div className="modal fade show" style={{ display: 'block', zIndex: 1050, display: "flex", alignItems: "center", justifyContent: "center" }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <p><strong>Advance Amount:</strong> ₹{sessionStorage.getItem("advancePayment")}</p>
                      </div>
                      <div>
                        <p><strong>Balance Amount:</strong> ₹{sessionStorage.getItem("TotalPrice")}</p>
                      </div>
                      {appliedCoupon && (
                        <div>
                          <p><strong>Coupon Applied:</strong> {appliedCoupon.couponCode} (₹{appliedCoupon.discountAmount} off)</p>
                        </div>
                      )}
                      {heardFrom && (
                        <div>
                          <p><strong>Heard From:</strong> {heardFrom}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="btn darkest-back text-white" onClick={handleConfirmPayment}>
                      {isLoading1 ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Processing...
                        </>
                      ) : (
                        "Confirm Payment"
                      )}
                    </button>
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
              position: relative;
              display: flex;
              flex-direction: column;
            }
            
            .heard-from-section {
              border-bottom: 1px solid #dee2e6;
              padding-bottom: 1rem;
              flex-shrink: 0;
            }
            
            .coupon-section {
              border-bottom: 1px solid #dee2e6;
              padding-bottom: 1rem;
              flex-shrink: 0;
            }
            
            .terms-section {
              flex: 1;
              display: flex;
              flex-direction: column;
              min-height: 0;
            }
            
            .terms-content-container {
              flex: 1;
              overflow: hidden;
              display: flex;
              flex-direction: column;
            }
            
            .terms-content {
              overflow-y: auto;
              padding-right: 10px;
              flex: 1;
              max-height: 100%;
              border: 1px solid #e9ecef;
              border-radius: 5px;
              padding: 15px;
              background: #f8f9fa;
            }
            
            .terms-footer {
              flex-shrink: 0;
              border-top: 1px solid #dee2e6;
              padding-top: 15px;
              margin-top: 15px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background: white;
            }
            
            .agree-checkbox {
              display: flex;
              align-items: center;
              margin: 0;
            }
            
            .confirm-button {
              display: flex;
              align-items: center;
            }
            
            .confirm-pay-btn {
              min-width: 200px;
            }
            
            /* Scrollbar Styling */
            .terms-content::-webkit-scrollbar {
              width: 8px;
            }
            
            .terms-content::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 4px;
            }
            
            .terms-content::-webkit-scrollbar-thumb {
              background: #c1c1c1;
              border-radius: 4px;
            }
            
            .terms-content::-webkit-scrollbar-thumb:hover {
              background: #a8a8a8;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default BookingForm;