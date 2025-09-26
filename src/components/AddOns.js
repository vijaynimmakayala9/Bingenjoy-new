import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer, toast } from "react-toastify";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Footer from "./Footer";
import Header from "./Header";
import { URLS } from "../Url";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const AddOns = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isLoading, setIsLoading] = useState(false);
  const [addOns, setAddOns] = useState([]);
  const [IDS, setIDS] = useState([]);
  const [totalAmountOption] = useState({
    amountOption: "partialpayment",
  });
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [selectedOccasions, setSelectedOccasions] = useState(
    JSON.parse(sessionStorage.getItem("addonsData")) || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    GetTheatersData();
    GetAddOns();
    fetchBookingData();
    getOneGst();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchBookingData = () => {
    axios
      .post(
        "https://api.carnivalcastle.com/v1/carnivalApi/web/bookings/getallbookings",
        { bookingId: sessionStorage.getItem("bookingid") }
      )
      .then((res) => {
        setIDS(res?.data?.booking?.addons || []);
        sessionStorage.setItem("paymentkey", "partialpayment");
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
      });
  };

  const GetTheatersData = () => {
    axios
      .post(URLS.GetAllTheaters, {})
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching theaters data:", error);
        setIsLoading(false);
      });
  };

  const GetAddOns = () => {
    axios
      .post(
        "https://api.carnivalcastle.com/v1/carnivalApi/web/getalladdonproducts",
        {}
      )
      .then((res) => {
        if (res.status === 200) {
          setAddOns(res?.data?.products || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching addons:", error);
        setAddOns([]);
      });
  };

  const getOneGst = async () => {
    try {
      const res = await axios.post(URLS.GetCharges, {});
      if (res.status === 200) {
        setAdvanceAmount(Number(res.data.charges.advancePayment));
        sessionStorage.setItem(
          "advancePayment",
          res.data.charges.advancePayment
        );
      }
    } catch (error) {
      console.error("Error fetching GST:", error);
    }
  };

  const handleImageClick = (occasion) => {
    setSelectedOccasions((prevSelected) => {
      const isSelected = prevSelected.some(
        (soccasion) => occasion._id === soccasion._id
      );

      if (isSelected) {
        return prevSelected.filter(
          (soccasion) => occasion._id !== soccasion._id
        );
      } else {
        return [...prevSelected, occasion];
      }
    });

    setIDS((prevIDS) => {
      const index = prevIDS.findIndex(
        (obj) => String(obj.id) === String(occasion._id)
      );
      if (index !== -1) {
        return [...prevIDS.slice(0, index), ...prevIDS.slice(index + 1)];
      } else {
        return [
          ...prevIDS,
          { id: occasion._id, price: occasion.price, name: occasion.name },
        ];
      }
    });
  };

  const totalPrice = selectedOccasions.reduce(
    (total, item) => total + item.price,
    0
  );

  const handleSubmit = () => {
    const productMap = selectedOccasions.map((e) => ({
      _id: e._id,
      name: e.name,
      type: "other",
      price: e.price,
      quantity: 1,
    }));

    const bodyData = {
      products: productMap,
      addons: JSON.stringify(IDS),
      subTotal: sessionStorage.getItem("subtotal") || "0",
      bookingId: sessionStorage.getItem("bookingid"),
    };

    axios
      .post(
        "https://api.carnivalcastle.com/v1/carnivalApi/web/booking/new/updateaddons",
        bodyData
      )
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem(
            "addonsData",
            JSON.stringify(selectedOccasions)
          );
          sessionStorage.setItem("addons", totalPrice.toString());
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", bodyData)
          navigate("/BookingSummary");
        } else if (res.status === 403) {
          toast.error(
            "Access Denied: You do not have permission to view this page."
          );
          navigate("/theaters");
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.message || "An error occurred");
          if (error.response.status === 406) {
            setTimeout(() => navigate("/theaters"), 2000);
          }
        }
      });
  };

  const navigateCakes = useNavigate();
  const handleClick = () => {
    navigateCakes("/CakesComponent");
  };

  // Calculate prices safely with fallbacks
  const theaterPrice = parseFloat(sessionStorage.getItem("theaterPrice")) || 0;
  const cakePrice = parseFloat(sessionStorage.getItem("cakeprice")) || 0;
  const occPrice = parseFloat(sessionStorage.getItem("occprice")) || 0;
  const couponAmount = parseFloat(sessionStorage.getItem("couponAmount")) || 0;
  const couponDis = parseFloat(sessionStorage.getItem("coupondis")) || 0;

  const subTotal = theaterPrice + cakePrice + occPrice + totalPrice;
  const totalAmount = subTotal - couponAmount;
  const remainingAmount =
    totalAmount -
    (totalAmountOption.amountOption === "partialpayment" ? advanceAmount : 0);

  return (
    <>
      {isLoading ? (
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
              className="shop-area pt-5 pb-5 p-relative lightest-back"
              style={{ background: "white" }}
            >
              <div className="container">
                <button
                  type="button"
                  className="btn light-back shadow-lg text-light"
                  onClick={handleClick}
                >
                  <i className="far fa-arrow-alt-circle-left"></i> Back
                </button>
                <div className="container mt-4">
                  <div className="row mb-4">
                    <div className="col-md-8 bg-white rounded-2">
                      {addOns && addOns.length > 0 ? (
                        addOns.map((data, key) => (
                          <div key={key}>
                            <div className="row">
                              <h4 className="mt-1">{data.name}</h4>
                              <div className="d-flex flex-wrap">
                                {data.products &&
                                  data.products.map((ele, ind) => (
                                    <div
                                      className="col-6 col-md-3 mb-3 text-center d-flex"
                                      key={ind}
                                      onClick={() => handleImageClick(ele)}
                                      style={{
                                        cursor: "pointer",
                                        borderRadius: "0.5rem",
                                        display: "flex",
                                        padding: "3px",
                                        boxSizing: "border-box",
                                      }}
                                    >
                                      <div
                                        className={`d-flex flex-column justify-content-between align-items-center w-100 ${selectedOccasions?.some(
                                            (addIds) =>
                                              addIds._id === String(ele._id)
                                          )
                                            ? "gradientdark"
                                            : "bg-transparent"}`}
                                        style={{
                                          padding: "10px",
                                          border: "",
                                          borderRadius: "10px",
                                          color: selectedOccasions?.some(
                                            (addIds) =>
                                              addIds._id === String(ele._id)
                                          )
                                            ? "black"
                                            : "inherit",
                                        }}
                                      >
                                        <div>
                                          <img
                                            src={URLS.Base + ele.image}
                                            alt={ele.name}
                                            className="img-fluid rounded-circle"
                                            style={{
                                              height: "150px",
                                              width: "150px",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </div>
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {ele.name}
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          ₹ {ele.price}/-
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="alert alert-info">
                          No addons available
                        </div>
                      )}
                      <div className="alert alert-warning mt-3">
                        <i
                          className="fa fa-exclamation-triangle me-2"
                          style={{ color: "red" }}
                        ></i>
                        <span style={{ color: "red" }}>
                          <b>Note:</b> The timing of the photography sessions is
                          subject to the availability of our photographers.
                        </span>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-5">
                      <div className="position-sticky" style={{ top: "20px" }}>
                        <div className="bg-white mb-3">
                          <div className="card-body mt-3">
                            <div className="d-flex justify-content-between align-items-center shadow-none p-3 mb-2 rounded">
                              <div>Total:</div>
                              <div>₹ {totalAmount.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>

                        <div className="shadow-lg">
                          <div className="card-body">
                            <div className="accordion" id="accordionExample">
                              <div className="accordion-item">
                                <h2
                                  className="accordion-header"
                                  id="headingOne"
                                >
                                  <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded={isOpen}
                                    aria-controls="collapseOne"
                                    onClick={() => setIsOpen(!isOpen)}
                                  >
                                    Summary Details
                                  </button>
                                </h2>
                                <div
                                  id="collapseOne"
                                  className={`accordion-collapse collapse ${
                                    isOpen ? "show" : ""
                                  }`}
                                  aria-labelledby="headingOne"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body">
                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div>
                                          Theatre Price (
                                          {sessionStorage.getItem("countPeople")}{" "}
                                          ppl)
                                        </div>
                                        <div>₹{theaterPrice.toFixed(2)}</div>
                                      </div>
                                      <hr />
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        <div>Addons</div>
                                      </div>
                                      {selectedOccasions.map(
                                        (occasion, index) => (
                                          <div
                                            key={index}
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              marginBottom: "8px",
                                            }}
                                          >
                                            <div>{occasion.name}</div>
                                            <div>₹{occasion.price.toFixed(2)}</div>
                                          </div>
                                        )
                                      )}

                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          marginTop: "8px",
                                        }}
                                      >
                                        ₹ {totalPrice.toFixed(2)}
                                      </div>

                                      <hr />
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div>
                                          Occasions (
                                          {sessionStorage.getItem("occasionName")}
                                          )
                                        </div>
                                        <div>₹{occPrice.toFixed(2)}</div>
                                      </div>
                                      <hr />
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div>Cake</div>
                                        <div>₹ {cakePrice.toFixed(2)}</div>
                                      </div>
                                      <hr />
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div>Sub Total</div>
                                        <div>₹ {subTotal.toFixed(2)}</div>
                                      </div>
                                      <hr />
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div>Coupon Amount</div>
                                        <div>₹{couponDis.toFixed(2)}</div>
                                      </div>
                                      <hr />

                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div>Total Amount</div>
                                        <div>₹ {totalAmount.toFixed(2)}</div>
                                      </div>
                                      <hr />

                                      {totalAmountOption.amountOption ===
                                        "partialpayment" && (
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <div>Advance Amount</div>
                                          <div>
                                            ₹{advanceAmount.toFixed(2)}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <hr />
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <div>Remaining Amount</div>
                                      <div>₹ {remainingAmount.toFixed(2)}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="btn w-100 mt-2 darkest-back text-white"
                          style={{
                            boxShadow: "none",
                            color: "black",
                            border: "none",
                          }}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Footer />
          </main>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default AddOns;