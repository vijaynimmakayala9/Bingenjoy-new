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

const ComboPlans = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768); // Open on desktop by default
  const [clickCounts, setClickCounts] = useState({}); // State to track clicks for each benefit

  const [isLoading, setIsLoading] = useState(false);
  const [include, setIncludes] = useState([]);

  const [showImages, setShowImages] = useState(null);
  console.log(showImages);
  const [cakesFlavour, setCakesFlavour] = useState(null);
  console.log(cakesFlavour);
  const [itemkey, setItemkey] = useState("");
  const [plans, setPlans] = useState([]);
  console.log(plans);
  const [planProducts, setPlanProducts] = useState([]);
  console.log(planProducts);
  const [cakes, setCakes] = useState([]); // egg and eglees
  const [otherProducts, setotherProducts] = useState([]); // other PLAN PRODUCTS
  console.log(otherProducts);

  const [totalAmountOption, setTotalAmountOption] = useState({
    amountOption: "partialpayment", // Set this to "partialpayment" by default
  });

  const navigate = useNavigate();
  useEffect(() => {
    axios.post(URLS.GetAllTheaters, {}).then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
      }
    });
    sessionStorage.setItem("paymentkey", "partialpayment");
  }, []);

  useEffect(() => {
    const getid = sessionStorage.getItem("theaterId");
    const occasiondata = sessionStorage.getItem("occasion");
    const datas = JSON.parse(occasiondata);

    if (datas && getid) {
      axios
        .post(URLS.GetOccationById, { occasionId: datas._id, theatreId: getid })
        .then((res) => {
          console.log(res.data);
          setPlans(res.data?.plans || []);
        });
    }
  }, []);

  const handleBack = () => {
    navigate("/ComboOccassions");
    setShowMessage(false);  // Hide the message when clicked
  };

  useEffect(() => {
    // Update the state based on the window width when the component mounts
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768); // Open if width is greater than 768px
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [advanceAmount, setAdvanceAmount] = useState(0);
  console.log(advanceAmount);
  useEffect(() => {
    getOneGst();
  }, []);

  const getOneGst = async () => {
    try {
      const res = await axios.post(URLS.GetCharges, {});
      if (res.status === 200) {
        console.log(res.data.charges.comboAdvancePayment, "response");
        setAdvanceAmount(Number(res.data.charges.comboAdvancePayment));
        sessionStorage.setItem("comboAdvancePayment", res.data.charges.comboAdvancePayment
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // setGst(0);
      }
    }
  };

  const [totalAmountOption1, setTotalAmountOption1] = useState("");

  const slecthandleChange = (e) => {
    const myChange = { ...totalAmountOption };
    myChange[e.target.name] = e.target.value;
    console.log(e.target.value);
    sessionStorage.setItem("paymentkey", e.target.value);
    setTotalAmountOption(myChange);
    if (e.target.value == "partialpayment") {
      const advanceamountkey =
        parseFloat(sessionStorage.getItem("TotalPrice")) -
        parseFloat(advanceAmount);
      setTotalAmountOption1(advanceamountkey);
      sessionStorage.setItem("TotalPrice2", advanceamountkey);
      sessionStorage.setItem("advancePayment", parseFloat(advanceAmount));
    } else {
      const advanceamountkey = parseFloat(sessionStorage.getItem("TotalPrice"));
      setTotalAmountOption1(advanceamountkey);
      sessionStorage.setItem("TotalPrice2", advanceamountkey);
    }
  };

  // Conditional total amount calculation
  const remainingAmount =
    totalAmountOption === "fullpayment"
      ? 0
      : sessionStorage.getItem("TotalPrice") - advanceAmount;

  const totalAmount = Number(sessionStorage.getItem("TotalPrice"));
  const remainingAmountFixed = remainingAmount.toFixed(2);
  const totalAmountFixed = totalAmount.toFixed(2);
  const displayedAdvanceAmount =
    totalAmountOption === "fullpayment" ? 0 : advanceAmount;

  const [extrapersionschanges, setextrapersionschanges] = useState(0);
  const [extrapersionschanges1, setextrapersionschanges1] = useState(0);

  const nintymin = Number(sessionStorage.getItem("nintymin"));

  const [plansdata, setplansdata] = useState([]);
  console.log(plansdata);

  const [theaterplanstate, settheaterplanstate] = useState(0)
  const [totalplanprice, settotalplanprice] = useState(0)
  const [subtotalplanprice, setsubtotalplanprice] = useState(0)

  const handleChoose = (item, index) => {
    setplansdata(item);
    if (showImages === index) {
      setShowImages(null);
    } else {
      setShowImages(index);
    }
    axios.post(URLS.GetByPlanIdProducts, { planId: item._id }).then((res) => {
      const selectedCaketype = res?.data?.planProducts.filter(
        (cake) => cake.categoryName === "cakes"
      );
      setPlanProducts(selectedCaketype[0]);
      setCakes(selectedCaketype);
      const selectedCaketype1 = res?.data?.planProducts.filter(
        (cake) => cake.categoryName !== "cakes"
      );
      setotherProducts(selectedCaketype1);

    });
    const theaterPrice = parseFloat(nintymin == 90 ? sessionStorage.getItem("theatrePrices") : sessionStorage.getItem("theatrePrices")) || 0;
    const theaterplanprice = (nintymin == 90 ? item.oneandhalfslotPrice : item.offerPrice)
    settheaterplanstate(theaterplanprice)
    sessionStorage.setItem("planpricesss", theaterplanprice)

    const extrapersions = sessionStorage.getItem("countPeople");
    if (Number(extrapersions) > item.noOfPersons) {
      const extrapersons = extrapersions - item.noOfPersons;
      setextrapersionschanges1(extrapersons);
      const extrapersonscharge = extrapersons * item.extraPersonPrice;
      setextrapersionschanges(extrapersonscharge);
      sessionStorage.setItem("planextrapersoncharge", extrapersonscharge)
      const totalallprice = parseFloat(theaterplanprice) + parseFloat(extrapersonscharge) + parseFloat((item.theatrePriceIncluded === "No" ? theaterPrice : 0)) - (parseFloat(sessionStorage.getItem("coupondis") || 0))
      const subtotalallprice = parseFloat(theaterplanprice) + parseFloat(extrapersonscharge) + parseFloat((item.theatrePriceIncluded === "No" ? theaterPrice : 0))
      settotalplanprice(totalallprice)
      setsubtotalplanprice(subtotalallprice)
      sessionStorage.setItem("totalallprice", totalallprice)
      sessionStorage.setItem("subtotalallprice", subtotalallprice)
    } else {
      const extrapersonscharge = 0;
      const totalallprice = parseFloat(theaterplanprice) + parseFloat(extrapersonscharge) + parseFloat((item.theatrePriceIncluded === "No" ? theaterPrice : 0)) - (parseFloat(sessionStorage.getItem("coupondis") || 0))
      const subtotalallprice = parseFloat(theaterplanprice) + parseFloat(extrapersonscharge) + parseFloat((item.theatrePriceIncluded === "No" ? theaterPrice : 0))
      settotalplanprice(totalallprice)
      setsubtotalplanprice(subtotalallprice)
      setextrapersionschanges1(0);
      setextrapersionschanges(extrapersonscharge);
      sessionStorage.setItem("planextrapersoncharge", extrapersonscharge)
      sessionStorage.setItem("totalallprice", totalallprice)
      sessionStorage.setItem("subtotalallprice", subtotalallprice)
    }

    // Scroll to the selected plan details
    const element = document.getElementById("selected-plan-details");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleFlavourChange = (e) => {
    const selectedId = e.target.value;
    const selectedCake = cakes.find((cake) => cake._id === selectedId);
    console.log(selectedCake);
    setPlanProducts(selectedCake || null); // Handle case where no cake is selected
  };
  const singleCake = (data) => {
    setPlanProducts(data);
    console.log(data);
  };

  const handleGoToBookingSummary = () => {
    navigate("/Theaters");
  };

  const [notification, setNotification] = useState("");
  const [selectedBenefits, setSelectedBenefits] = useState([]); // Track selected benefits
  const [errorMessage, setErrorMessage] = useState("");

  // Handle benefit item click
  const handleClick = (benefit) => {
    // Check if the benefit is already selected
    if (!selectedBenefits.includes(benefit)) {
      // Check if the user has already selected 4 benefits
      if (selectedBenefits.length < 4) {
        setSelectedBenefits([...selectedBenefits, benefit]);
        setErrorMessage(""); // Reset error message when a benefit is successfully added
      } else {
        // Set error message if user tries to select more than 4 benefits
        setErrorMessage("You can only select up to 4 benefits.");
      }
    }
  };

  const handleSubmit = () => {
    const bodyData = {
      bookingId: sessionStorage.getItem("bookingid"),
      totalPrice: totalplanprice,
      planId: plansdata._id,
      flavour: planProducts?.name,
      productId: planProducts?._id,
    };

    axios
      .post(
        "https://api.carnivalcastle.com/v1/carnivalApi/web/booking/new/updatecombo",
        bodyData
      )
      .then(
        (res) => {
          if (res.status === 200) {
            console.log(res.data);
            navigate("/ComboBooking");
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            console.log(error.response);
            toast.error(error.response.message);
          } else if (error.response && error.response.status === 406) {
            toast.error(error.response.message);
            setTimeout(() => {
              navigate("/theaters");
            }, 2000);
          }
        }
      );
  };

  const advanceAmount1 =
    totalAmountOption.amountOption === "partialpayment"
      ? displayedAdvanceAmount
      : 0;
  const totalPrice1 = parseFloat(sessionStorage.getItem("TotalPrice")) || 0;
  const remainingAmount1 = totalPrice1 - advanceAmount1;

  const [showMessage, setShowMessage] = useState(true);

  // Define an array of light colors
  const lightColors = [
    "#FFB6C1", // Light Pink
    "#FFCC99", // Peach
    "#99FF99", // Light Green
    "#ADD8E6", // Light Blue
    "#FFEB99", // Light Yellow
    "#D3B1F5", // Lavender
    "#F0E68C", // Khaki
    "#FFC0CB", // Light Coral
  ];

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
              className="shop-area pt-5 pb-5 p-relative bg-dark text-white"
              style={{ background: "white" }}
            >
              <div className="container">
                {showMessage && (
                  <div className="message-box">
                    {/* <h5 className="message-text text-center">Select 4 Birthday Items at the Same Price! 🎉</h5> */}
                  </div>
                )}
                <button
                  type="button"
                  className="btn mb-2 main-booknow"
                  onClick={handleBack}
                >
                  <i className="far fa-arrow-alt-circle-left"></i> Back
                </button>

                <div className="container mt-4">
                  <div className="row">
                    {plans.length === 0 ? (
                      <div className="col-md-12 shadow-lg p-4 text-center bg-light-grey text-white">
                        <div className="text-center">
                          <h3>
                            There are no plans available for this theater.
                            Please choose another theater.
                          </h3>
                          <button
                            type="button"
                            className="btn btn-success mb-2 ms-2 main-booknow"
                            style={{
                              color: "black",
                              border: "none",
                            }}
                            onClick={handleGoToBookingSummary}
                          >
                            Click Now
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="col-lg-8 col-md-7">
                          {/* 📱 Mobile Slider */}
                          <div className="position-relative d-lg-none">
                            {/* Left Arrow */}
                            <button
                              className="position-absolute start-0 top-50 translate-middle-y btn btn-dark"
                              style={{ zIndex: 10 }}
                              onClick={() =>
                                document.getElementById("mobileSlider").scrollBy({ left: -window.innerWidth, behavior: "smooth" })
                              }
                            >
                              &#8592;
                            </button>

                            {/* Scrollable Area */}
                            <div
                              id="mobileSlider"
                              className="d-flex overflow-auto"
                              style={{
                                scrollSnapType: "x mandatory",
                                scrollBehavior: "smooth",
                                scrollPadding: "1rem",
                                width: "100%",
                              }}
                            >
                              {plans.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex-shrink-0"
                                  style={{
                                    minWidth: "100%",
                                    scrollSnapAlign: "start",
                                    padding: "0 1rem",
                                    boxSizing: "border-box",
                                  }}
                                >
                                  <div
                                    className="card bg-dark gradient-border1"
                                    style={{
                                      color: "#fff",
                                      borderRadius: "10px",
                                      padding: "20px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleChoose(item, index)}
                                  >
                                    <h2 className="fw-bold text-gold-gradient">{item.name}</h2>
                                    <p>({item.noOfPersons}) Members</p>
                                    <ul className="pt-4 opls">
                                      {item?.benefits?.map((datas, is) => (
                                        <li
                                          className="pb-2"
                                          key={is}
                                          onClick={() => handleClick(datas)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <img
                                            draggable="false"
                                            role="img"
                                            className="emoji m-1"
                                            alt="🌟"
                                            style={{ height: "15px" }}
                                            src="https://s.w.org/images/core/emoji/15.0.3/svg/1f31f.svg"
                                          />
                                          {datas}
                                        </li>
                                      ))}
                                    </ul>
                                    <p>
                                      <del><small>₹</small> {item.price}</del>
                                    </p>
                                    <h3>
                                      <small>₹</small>
                                      {nintymin == 90 ? item.oneandhalfslotPrice : item.offerPrice}/-
                                    </h3>
                                    <button
                                      className="btn btn-success mt-3 main-booknow"
                                      style={{ boxShadow: "none", color: "black", border: "none" }}
                                      onClick={() => handleChoose(item, index)}
                                    >
                                      {showImages === index ? "Hide" : "Choose"}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Right Arrow */}
                            <button
                              className="position-absolute end-0 top-50 translate-middle-y btn btn-dark"
                              style={{ zIndex: 10 }}
                              onClick={() =>
                                document.getElementById("mobileSlider").scrollBy({ left: window.innerWidth, behavior: "smooth" })
                              }
                            >
                              &#8594;
                            </button>
                          </div>

                          {/* 💻 Desktop/Tablet Grid (Unchanged) */}
                          <div className="row d-none d-lg-flex">
                            {plans.map((item, index) => (
                              <div key={index} className="col-lg-4 col-md-6 mb-4">
                                <div
                                  className="card bg-dark h-100 gradient-border1"
                                  style={{
                                    color: "#fff",
                                    borderRadius: "10px",
                                    padding: "20px",
                                    cursor: "pointer",
                                    width: "100%",
                                    maxWidth: "400px", // Controls card width for centering
                                    margin: "0 auto",
                                  }}
                                  onClick={() => handleChoose(item, index)}
                                >
                                  <h2 className="fw-bold text-gold-gradient">{item.name}</h2>
                                  <p>({item.noOfPersons}) Members</p>
                                  <ul className="pt-4 opls">
                                    {item?.benefits?.map((datas, is) => (
                                      <li
                                        className="pb-2"
                                        key={is}
                                        onClick={() => handleClick(datas)}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <img
                                          draggable="false"
                                          role="img"
                                          className="emoji m-1"
                                          alt="🌟"
                                          style={{ height: "15px" }}
                                          src="https://s.w.org/images/core/emoji/15.0.3/svg/1f31f.svg"
                                        />
                                        {datas}
                                      </li>
                                    ))}
                                  </ul>
                                  <p>
                                    <del><small>₹</small> {item.price}</del>
                                  </p>
                                  <h3>
                                    <small>₹</small>
                                    {nintymin == 90 ? item.oneandhalfslotPrice : item.offerPrice}/-
                                  </h3>
                                  <button
                                    className="btn btn-success mt-3 main-booknow"
                                    style={{ boxShadow: "none", color: "black", border: "none" }}
                                    onClick={() => handleChoose(item, index)}
                                  >
                                    {showImages === index ? "Hide" : "Choose"}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>



                          {/* Selected Plan Details */}
                          {Object.keys(plansdata).length > 0 && (
                            <div id="selected-plan-details" className="row d-flex mt-4">
                              <div className="col-md-4 col-sm-6 mb-4 d-flex flex-column">
                                {/* Card */}
                                <div
                                  className="card flex"
                                  style={{
                                    border: "none",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                  }}
                                >
                                  <div style={{ position: "relative" }}>
                                    {planProducts.cakeType === "eggless" && (
                                      <span
                                        className="badge bg-success"
                                        style={{
                                          position: "absolute",
                                          top: "10px",
                                          left: "10px",
                                          zIndex: "1",
                                        }}
                                      >
                                        Eggless
                                      </span>
                                    )}
                                    <img
                                      src={URLS.Base + planProducts.image}
                                      className="card-img-top"
                                      alt="Combo Image"
                                      style={{
                                        height: "200px",
                                        width: "100%",
                                        objectFit: "cover",
                                        borderBottom: "1px solid #ddd",
                                      }}
                                    />
                                  </div>

                                  <div className="card-body bg-dark text-white gradient-border">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <h5
                                        className="card-title"
                                        style={{
                                          fontSize: "15px",
                                          margin: "0",
                                        }}
                                      >
                                        {planProducts.name}
                                      </h5>

                                      {planProducts.cakeType === "egg" ? (
                                        <img
                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABW0lEQVR4nN2VP0sDQRDF01gIgoWFYGGhCBaCxRWGS/LeXXKFihK/kljoF/FT+LcRLFIIFoKgaDTZPRUVEy0sjOSYO84YzWruQBzYZvYxP+bNsJvJ/JvwyXkNXGmy9dujyDcNVHzXnfwE0GS1n+L6I2izGyC47MuFQsEWwEEqAOU4c0Ed4DAVQN11LQFUfgTQjlPWwJ4GmsEhdxW51KnzXXc2sAg4MgZocuPLYQJrca0iZ6SDYyOAJld6bUwdWAz1NXJaACdmAGC/50oC26H+BpiSLTo17eDZAPAY6fP5Ccmfm3bQNAA8RBblcuOSv0zSoq1Qf2vbY2JRzQzgOGWDIS9E+mJxVPK+EUC6WP/mzVmNa69LpRHZojtjQDsUsKzJHQU0FPnU3pz4eoZx73nDnYNP9rEjhwTQSAVQzWYHpc5LKoCWZQ3IbF7T/nDOun+ZSUCAC016/Xjxt+IdjFUzfH0mcf4AAAAASUVORK5CYII="
                                          alt="Egg Cake"
                                          style={{
                                            width: "20px",
                                            marginLeft: "10px",
                                          }}
                                        />
                                      ) : planProducts.cakeType ===
                                        "eggless" ? (
                                        <img
                                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABbUlEQVR4nGNgGDZAdH6Fh9iCisfiCyv+k40XVPwTW1hxRnRBiTKGBWILyx9RZPhCFIuWYlgAk6QoFBaVWUEtOEoTC8QXVZiDzBBbUH6CJhZILqgwBluwsOIMSRaILSz3F1tYsV9sQcUXMF5Yvk98YYUPujrRReX60CC6QLQFYgsrOvBEaDOKGYsqdaBBdJkoC8QWVQYQSjESCyu84EE0v1IDEkTl14mzYEH5AcLJsnwPTL3IvFJVqPgt4ixYWP6FiHT/Aa5+boUSNIjuEemDii9E+OA9PIgWlstBLKh4SL0gWlCxG6ZeeE6pFFT8KbFB5E8wkheUecLVL6sUh/rgJVEWQIOpHY/rG5HVSi2sEIbGwRuiLQAB8UXlvmILKvaKLyj/LL6w4hMo5SAnTxgQnFnOjx7x1C3sVtXzQHxW/pkmFsisKuSExsE3mljAMDONFWrOL9pWOAsr7mKvMqlgidiC8gdiCytcKAqJQQUAHGz+5dhaYC0AAAAASUVORK5CYII="
                                          alt="Eggless Cake"
                                          style={{
                                            width: "20px",
                                            marginLeft: "10px",
                                          }}
                                        />
                                      ) : null}
                                    </div>
                                  </div>
                                  {planProducts.categoryName === "cakes" ? (
                                    <select
                                      className="form-select"
                                      aria-label="Cake size selection"
                                      value={cakesFlavour?._id || ""}
                                      name="flavour"
                                      required
                                      onChange={handleFlavourChange}
                                      style={{ marginTop: "0px" }}
                                    >
                                      <option value="">Select Flavour</option>
                                      {cakes.map((flavour, index) => (
                                        <option
                                          key={index}
                                          value={flavour._id}
                                        >
                                          {flavour.name}
                                        </option>
                                      ))}
                                    </select>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col-md-8">
                                <div className="row">
                                  {otherProducts.map((data, index) => (
                                    <div
                                      key={index}
                                      className="col-6 col-sm-4 col-md-4 mb-4 d-flex flex-column"
                                      style={{ cursor: "pointer" }}
                                    >
                                      {/* Card */}
                                      <div
                                        className="card flex-fill"
                                        style={{
                                          border: "none",
                                          boxShadow:
                                            "0 4px 8px rgba(0, 0, 0, 0.2)",
                                        }}
                                      >
                                        <div>
                                          <img
                                            src={URLS.Base + data.image}
                                            className="card-img-top"
                                            alt="Combo Image"
                                            style={{
                                              height: "120px",
                                              width: "100%",
                                              objectFit: "cover",
                                              borderBottom: "1px solid #ddd",
                                            }}
                                          />
                                        </div>

                                        <div className="card-body bg-dark text-white gradient-border">
                                          <div className="d-flex justify-content-between align-items-center">
                                            <h6
                                              className=""
                                              style={{
                                                fontSize: "12px",
                                                margin: "0",
                                              }}
                                            >
                                              {data.name}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {Object.keys(plansdata).length > 0 && (
                          <div className="col-lg-4 col-md-5">
                            <div
                              className="position-sticky"
                              style={{ top: "20px" }}
                            >
                              <div className="bg-light-grey mb-3">
                                <div className="card-body mt-3">
                                  <div className="d-flex justify-content-between align-items-center shadow-none p-3 mb-2 rounded gradient-border">
                                    <div>Total:</div>
                                    <div>
                                      ₹
                                      {totalplanprice.toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="shadow-lg">
                                <div className="card-body">
                                  <div className="alert alert-info" role="alert">
                                    {selectedBenefits.length === 0 && "You have not selected any benefits. Please select at least one."}
                                    {selectedBenefits.length === 1 && "You have selected 1 benefit. Select 3 more."}
                                    {selectedBenefits.length === 2 && "You have selected 2 benefits. Select 2 more."}
                                    {selectedBenefits.length === 3 && "You have selected 3 benefits. Select 1 more."}
                                    {selectedBenefits.length === 4 && "You have selected 4 benefits. You cannot select more."}
                                    {selectedBenefits.length > 4 && "Limit exceeded! You can only select 4 benefits."}
                                  </div>

                                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                                  <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                      <h2 className="accordion-header" id="headingOne">
                                        <button
                                          className="accordion-button"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseOne"
                                          aria-expanded={isOpen ? "true" : "false"}
                                          aria-controls="collapseOne"
                                          onClick={() => setIsOpen(!isOpen)}
                                        >
                                          Summary Details
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseOne"
                                        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          {selectedBenefits.length > 0 && (
                                            <div>
                                              <div>Selected Benefits:</div>
                                              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                                                {selectedBenefits.map((benefit, index) => (
                                                  <li key={index} style={{
                                                    backgroundColor: lightColors[index % lightColors.length],
                                                    padding: "5px",
                                                    borderRadius: "5px",
                                                    margin: "5px 0",
                                                    fontWeight: 600
                                                  }}>
                                                    {benefit}
                                                  </li>
                                                ))}
                                              </ul>
                                              <hr />
                                            </div>
                                          )}

                                          <div>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <div>Plan Price</div>
                                              <div>₹ {theaterplanstate}</div>
                                            </div>
                                            <hr />
                                            {plansdata.theatrePriceIncluded ===
                                              "No" && (
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    justifyContent:
                                                      "space-between",
                                                  }}
                                                >
                                                  <div>Theater Price</div>
                                                  <div>
                                                    ₹
                                                    {sessionStorage.getItem(
                                                      "theatrePrices"
                                                    )}
                                                  </div>
                                                </div>
                                              )}

                                            {plansdata.theatrePriceIncluded ===
                                              "No" && <hr />}

                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <div>
                                                Extra Person Price(
                                                {extrapersionschanges1})
                                              </div>
                                              <div>₹
                                                {extrapersionschanges}
                                              </div>
                                            </div>
                                            <hr />
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <div>Sub Total</div>
                                              <div>
                                                ₹  {subtotalplanprice.toFixed(2)}
                                              </div>
                                            </div>
                                            <hr />
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <div>Coupon Amount</div>
                                              <div>
                                                ₹
                                                {parseFloat(
                                                  sessionStorage.getItem(
                                                    "coupondis"
                                                  )
                                                ).toFixed(2) || 0}
                                              </div>
                                            </div>

                                            <hr />
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <div>Total Amount</div>
                                              <div>
                                                ₹   {totalplanprice.toFixed(2)}
                                              </div>
                                            </div>
                                            <hr />

                                            {totalAmountOption.amountOption ===
                                              "partialpayment" && (
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    justifyContent:
                                                      "space-between",
                                                  }}
                                                >
                                                  <div>Advance Amount</div>
                                                  <div>
                                                    ₹ {displayedAdvanceAmount} /-
                                                  </div>
                                                </div>
                                              )}

                                            <hr />
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <div>Remaining Amount</div>
                                              <div>
                                                {(parseFloat(totalplanprice) - parseFloat(displayedAdvanceAmount)).toFixed(2)}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={handleSubmit}
                                className="btn btn-success w-100 mt-2 main-booknow"
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
                        )}
                      </>
                    )}
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

export default ComboPlans;