import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import { useCoupon } from "./couponContext";
import Slider from "react-slick";
import { URLS } from "../Url";
import Footer from "./Footer";
import Header from "./Header";
import Typer from "./Typer";
import axios from "axios";
import roses from "./images/roses.jpg";
import cake4 from "./images/cake 4.jpg";
import { FaStar } from "react-icons/fa";
import { Galleria } from "primereact/galleria";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import beverages from "./images/foodbeverages.jpg";
import screening from "./images/screening.jpg";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {
  faUser,
  faPhone,
  faEnvelope,
  faCalendarAlt,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./images/Bingenjoylogopng.png";
import load from "./images/Bingenjoylogopng.png";

/*images */
import basicPackageImg from "./images/cake 4.jpg";
import comboPackageImg from "./images/cake 4.jpg";

function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const { couponCode, handleCouponChange } = useCoupon(); // Access context
  const navigate = useNavigate();



  const [form, setform] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    description: "",
    eventName: "",
  });

  useEffect(() => {
    GetHomePage();
    GetAllGalleryDate();
  }, []);

  const [Faqs, setFaqs] = useState([]);
  const [Sliders, setSliders] = useState([]);
  console.log(Sliders);
  const [Howtojoin, setHowtojoin] = useState([]);
  const [LatestInfo, setLatestInfo] = useState([]);
  const [LatestInfos, setLatestInfos] = useState([]);
  console.log(LatestInfos);
  const [Highlights, setHighlights] = useState([]);
  // const [Testimonial, setTestimonial] = useState([]);
  const [Howtojoinpoints, setHowtojoinpoints] = useState([]);
  const [HighlightsPoints, setHighlightsPoints] = useState([]);

  const [Offers, setOffers] = useState([]);
  const [services, setservices] = useState([]);

  const [Contact, setContact] = useState([]);


  const GetHomePage = () => {
    axios.post(URLS.AllModules, {}, {}).then((res) => {
      if (res.status === 200) {
        setFaqs(res?.data?.faqs);
        setContact(res?.data?.contactus[0]);
        setSliders(res?.data?.homesliders);
        // setTestimonial(res?.data?.testimonials);
        setHowtojoin(res?.data?.howtojoin[0]);
        setHighlights(res?.data?.highlight[0]);
        setLatestInfo(res?.data?.latestinfo[0]);
        setLatestInfos(res?.data?.latestinfo[0]?.count);
        setHighlightsPoints(res?.data?.highlight[0]?.features);
        setHowtojoinpoints(res?.data?.howtojoin[0]?.benefits);
        setPopUp(res?.data?.popup[0]);
        setOffers(res?.data?.offer);
        setservices(res?.data?.occasions);
        setLgShow(res?.data?.popup[0]?.popupBoolean);
        setIsLoading(false);
      }
    });
    sessionStorage.clear();
  };

  const formsubmit = (e) => {
    e.preventDefault();
    EnquiryNow();
  };

  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  const EnquiryNow = () => {
    const dataArray = {
      name: form.name,
      email: form.email,
      mobileNumber: form.mobileNumber,
      description: form.description,
      eventName: form.eventName,
    };




    axios.post(URLS.AddEnquiry, dataArray).then(
      (res) => {
        if (res.status === 200) {
          toast(res.data.message);
          setform({
            name: "",
            email: "",
            mobileNumber: "",
            description: "",
            eventName: "",
          });
        }
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message);
        }
      }
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const settings4 = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  const settings2 = {
    dots: false,
    infinite: true,
    arrows: true,
    autoplay: false,
    speed: 1000,
    // slidesToShow: 4,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings3 = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [images, setImages] = useState([]);

  const GetAllGalleryDate = () => {
    axios.post(URLS.GetAllGallery, {}, {}).then((res) => {
      if (res.status === 200) {
        setImages(res?.data?.gallerys?.slice(0, 3));
      }
    });
  };

  // Static array of coupon codes, each coupon has its unique code
  const couponCodesArray = [
    'BIRT20',
    'ANNI15',
    'GROP25',
    'PRIVA10',
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const galleria = useRef(null);

  const itemTemplate = (item) => {
    return (
      <img
        src={URLS.Base + item.image}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={URLS.Base + item.image}
        alt={item.alt}
        style={{ display: "block" }}
      />
    );
  };

  const [timeLeft, setTimeLeft] = useState(39639);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  const [Theaters, setTheaters] = useState([]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    GetTheatersData();
  }, []);

  const GetTheatersData = () => {
    axios.post(URLS.GetAllTheaters, {}, {}).then((res) => {
      if (res.status === 200) {
        setTheaters(res.data.theatres);
      }
    });
  };

  const today = new Date();

  const [date, setDate] = useState(today);

  const dateString = date;

  const dateObject = new Date(dateString);

  const dd = dateObject.getDate().toString().padStart(2, "0");
  const mm = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = dateObject.getFullYear();

  const formattedDateString = `${yyyy}-${mm}-${dd}`;

  const databyid = (data) => {
    sessionStorage.clear();
    axios.post(URLS.GetUnicId, {}, {}).then((res) => {
      if (res.status === 200) {
        sessionStorage.setItem("UserId", res.data.userId);
        sessionStorage.setItem("Theaterid", data._id);
        sessionStorage.setItem("theatreName", data.name);
        sessionStorage.setItem("theatrePrice", data.offerPrice);
        sessionStorage.setItem("date", formattedDateString);
        window.location.href = "/BookingDetails";
      }
    });
  };

  const navigateTheater = useNavigate();
  const handleTheater = () => {
    navigateTheater("./theaters");
  };

  const handleCouponClick = (code) => {
    handleCouponChange(code); // Update the coupon code in global state
  };



  const [PopUp1, setPopUp1] = useState([]);

  useEffect(() => {
    GetFooterData();
  }, []);

  const GetFooterData = () => {
    axios.post(URLS.GetFooter, {}, {}).then((res) => {
      if (res.status === 200) {
        setContact(res.data.contactus);
        setPopUp1(res.data.popup[0]);
      }
    });
  };

  // Static data for packages
  const packages = [
    {
      id: 1,
      title: "Basic Package",
      price: "699",
      description: "Perfect for intimate celebrations",
      features: [
        "Private cinema room for up to 8 people",
        "3-hour screening of your choice",
        "Complimentary popcorn and soft drinks"
      ],
      image: basicPackageImg
    },
    {
      id: 2,
      title: "Combo Package",
      price: "799",
      description: "Get more magic for less",
      features: [
        "Premium cinema room for up to 15 people",
        "4-hour screening with intermission",
        "Gourmet food platter and premium beverages",
        "Personalised welcome message"
      ],
      image: comboPackageImg
    }
  ];


  const Testimonial = [
    {
      name: "Priyanka Devasath",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5,
      description: "We had a very good experience at Bingen & Joy private theatres. Budget friendly, food taste was really awesome. Staff was very good and approached very well. Thank you Bingen & Joy.",
    },
    {
      name: "Santosh Santosh",
      image: "https://randomuser.me/api/portraits/men/25.jpg",
      rating: 5,
      description: "Really amazing event! Haven't seen such ambience in any part of Hyderabad. Really worth what we paid. The ambience is truly amazing.",
    },
    {
      name: "Shubham Khirade",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
      rating: 5,
      description: "It was an amazing experience here! Worth every single penny! You guys must visit. They will organize everything! Best place in Hyderabad to surprise your loved ones!",
    },
    {
      name: "Priyanka Chodisetti",
      image: "https://randomuser.me/api/portraits/women/47.jpg",
      rating: 4,
      description: "Nice place to celebrate any occasion.",
    },
    {
      name: "Khadar RGM Basha",
      image: "https://randomuser.me/api/portraits/men/53.jpg",
      rating: 5,
      description: "Celebrated my nephew’s birthday here. It was wonderful — a top-rated place for birthday parties.",
    },
  ];



  const [lgvis, setLgVis] = useState(false);

  const modelShow = () => {
    setLgVis(!false);
  };

  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const response = await axios.post(URLS.GetAllOccation, {});
        if (response.status === 200) {
          setOccasions(response.data?.occasions || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOccasions();
  }, []);



 const [lgShow, setLgShow] = useState(false);
const [PopUp, setPopUp] = useState({});

useEffect(() => {
  // First check if popup should be shown at all
  const hasSeenPopup = localStorage.getItem('hasSeenPopup');
  
  // Only proceed if popup hasn't been seen before
  if (!hasSeenPopup) {
    axios.get(URLS.GetPopUp).then(res => {
      if (res.data?.success && res.data.data?.image) {
        setPopUp(res.data.data);
        setLgShow(true);
        localStorage.setItem('hasSeenPopup', 'true'); // Mark as seen
      }
    }).catch(error => {
      console.error("Error loading popup:", error);
    });
  }
}, []); // Empty dependency array = runs only once on mount

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          BingeNJoy | Best Private Theaters for Celebrations in Hyderabad
        </title>
        <meta
          name="description"
          content="Experience the magic of celebrations at BingeNJoy Private Theatres in Hyderabad. Perfect for Birthdays, Anniversaries, Bride To Be, Surprise Parties, etc"
        />
      </Helmet>

      {isLoading == true ? (
        <>
          <div
            className="text-center"
            style={{
              // background:
              //   "linear-gradient(329deg, rgba(191, 63, 249, 1) 0%, rgba(113, 51, 210, 1) 100%)",
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
                src={load}
                style={{ height: "300px", color: "white" }}
              ></img>
              <h6 style={{ color: "gold" }}>Loading...</h6>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="home-page indexsix bg-dark">
            <div className="main-wrapper bg-dark">
              <>
                <Header />
                <div className="scrollbar">
                  <Slider {...settings}>
                    {Sliders?.map((data, i) => (
                      <div key={i}>
                        {PopUp1.modalEnabled && (
                          <div className="bg-danger text-center py-2">
                            <marquee className="text-white fw-bold">
                              LAST MINUTE OFFER: {PopUp1.title}
                            </marquee>
                          </div>
                        )}

                        <section
                          className="banner-section d-flex align-items-center position-relative"
                          style={{
                            background: `url(${URLS.Base + data.image}) no-repeat center center/cover`,
                            minHeight: "100vh",
                            color: "#fff",
                          }}
                        >
                          {/* Dark Overlay */}
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              zIndex: 1,
                            }}
                          ></div>

                          {/* Content */}
                          <div className="container position-relative" style={{ zIndex: 2 }}>
                            <div className="row justify-content-center text-center text-md-start">
                              <div className="col-lg-10">
                                <h1 className="display-4 fw-bold text-shadow mb-3">
                                  <Typer text="Surprise your loved one only at Binge N Joy Private Theaters" typingSpeed={100} />
                                </h1>

                                <p className="lead mb-4">{data.description}</p>

                                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-sm-start">
                                  {/* Navigate to /theaters */}
                                  <a
                                    href="/theaters"
                                    className="btn btn-lg px-4 fw-bold"
                                    style={{ backgroundColor: "#9D4DFF", color: "#fff" }}
                                  >
                                    Book Now
                                  </a>

                                  {/* Call via phone */}
                                  <a
                                    href="tel:8977917555"
                                    className="btn btn-lg px-4 fw-bold"
                                    style={{ backgroundColor: "#9D4DFF", color: "#fff" }}
                                  >
                                    Book via Call
                                  </a>
                                </div>

                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    ))}
                  </Slider>
                </div>


                {/* Timings Section */}
                <section className="py-4 bg-light">
                  {Offers.length > 0 && (
                    <div className="container-md">
                      <Slider {...settings4}>
                        {Offers.map((data, i) => {
                          // Replace "Carnival Castle" with "Binge N Joy" in both title and description
                          const updatedTitle = data.title?.replace(/Carnival Castle/g, "Binge N Joy");
                          const updatedDescription = data.description?.replace(/Carnival Castle/g, "Binge N Joy");

                          return (
                            <div className="px-2" key={i}>
                              <div
                                className="row g-0 rounded-4 shadow-sm overflow-hidden"
                                style={{ backgroundColor: "#E9DCFF", border: "solid 3px purple" }}
                              >
                                {/* Text Column */}
                                <div className="col-md-8 col-12 p-4">
                                  <h5 className="fw-bold mb-2" style={{ color: "#681DC0" }}>
                                    {updatedTitle}
                                  </h5>
                                  <p className="mb-0 text-dark">{updatedDescription}</p>
                                </div>

                                {/* Timer Column */}
                                <div className="col-md-4 col-12 d-flex align-items-center justify-content-center p-4">
                                  <div className="d-flex justify-content-center gap-3 text-center">
                                    <div className="time-part">
                                      <div className="fs-4 fw-bold">{hours}</div>
                                      <div className="small text-muted">Hrs</div>
                                    </div>
                                    <div className="fs-4 fw-bold">:</div>
                                    <div className="time-part">
                                      <div className="fs-4 fw-bold">{minutes}</div>
                                      <div className="small text-muted">Mins</div>
                                    </div>
                                    <div className="fs-4 fw-bold">:</div>
                                    <div className="time-part">
                                      <div className="fs-4 fw-bold">{seconds}</div>
                                      <div className="small text-muted">Sec</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  )}
                </section>


                <Modal
                  size="md"
                  show={lgvis}
                  onHide={() => setLgVis(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header
                    closeButton
                    className="bg-light-grey gradient-border"
                  >
                    <Modal.Title
                      id="example-modal-sizes-title-lg gradient-border"
                      style={{ textAlign: "center" }}
                      className="text-gold-gradient"
                    >
                      REQUEST CALLBACK
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="bg-dark gradient-border">
                    <div className="row justify-content-md-center">
                      <div className="col-lg-12 mt-40 gradient-border">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="booking-form align-items-center justify-content-center">
                              {/* <form
                            className="mt-4 mb-3"
                            onSubmit={(e) => {
                              formsubmit(e);
                            }}
                          >
                            <>
                              <div className="mb-4">
                                <input
                                  required
                                  type="text"
                                  name="name"
                                  placeholder="Enter Full Name"
                                  value={form.name}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  className="form-control "
                                />
                              </div>
                              <div className="mb-4">
                                <input
                                  required
                                  placeholder="Enter Mobile Number"
                                  type="text"
                                  name="mobileNumber"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  maxlength="10"
                                  minLength="10"
                                  pattern="[0-9]{10}"
                                  value={form.mobileNumber}
                                  onKeyPress={(e) => {
                             
                                    const charCode = e.which
                                      ? e.which
                                      : e.keyCode;
                                    if (charCode < 48 || charCode > 57) {
                                      e.preventDefault();
                                    }
                                  }}
                                  className="form-control "
                                />
                              </div>
                              <div className="mb-4">
                                <input
                                  required
                                  type="email"
                                  name="email"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  placeholder="Enter Email"
                                  value={form.email}
                                  className="form-control"
                                />
                              </div>
                              <div className="mb-4">
                                <input
                                  required
                                  type="text"
                                  name="description"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  placeholder="Enter Description"
                                  value={form.description}
                                  className="form-control"
                                />
                              </div>
                              <button
                                type="submit"
                                className="btn course-btn mb-3 text-white"
                                style={{ float: "right" }}
                              >
                                Submit
                              </button>
                            </>
                          </form> */}
                              <form
                                className="mt-4 mb-3"
                                onSubmit={(e) => {
                                  formsubmit(e);
                                }}
                              >
                                <>
                                  <div className="section-title text-center">
                                    <h2 className="title">Enquiry Now</h2>
                                    <hr className="gradient-border"></hr>
                                  </div>
                                  <div className="mb-3 input-group">
                                    <span className="input-group-text">
                                      <FontAwesomeIcon icon={faUser} />
                                    </span>
                                    <input
                                      required
                                      type="text"
                                      name="name"
                                      placeholder="Enter Full Name*"
                                      value={form.name}
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      className="form-control "
                                    />
                                  </div>

                                  <div className="mb-3 input-group">
                                    <span className="input-group-text">
                                      <FontAwesomeIcon icon={faPhone} />
                                    </span>
                                    <input
                                      required
                                      placeholder="Enter Mobile Number*"
                                      type="text"
                                      name="mobileNumber"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      maxlength="10"
                                      minLength="10"
                                      pattern="[0-9]{10}"
                                      value={form.mobileNumber}
                                      onKeyPress={(e) => {
                                        const charCode = e.which
                                          ? e.which
                                          : e.keyCode;
                                        if (charCode < 48 || charCode > 57) {
                                          e.preventDefault();
                                        }
                                      }}
                                      className="form-control "
                                    />
                                  </div>

                                  <div className="mb-3 input-group">
                                    <span className="input-group-text">
                                      <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    <input
                                      required
                                      type="email"
                                      name="email"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      placeholder="Enter Email*"
                                      value={form.email}
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="mb-3 input-group">
                                    <span className="input-group-text">
                                      <FontAwesomeIcon icon={faCalendarAlt} />
                                    </span>
                                    <input
                                      required
                                      type="text"
                                      name="description"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      placeholder="Enter Description*"
                                      value={form.description}
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="mb-3 input-group">
                                    <span className="input-group-text">
                                      <FontAwesomeIcon icon={faCalendarAlt} />
                                    </span>
                                    <input
                                      required
                                      type="text"
                                      name="eventName"
                                      placeholder="Enter Event Name*"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      value={form.eventName}
                                      className="form-control"
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn main-booknow mb-3 float-end"
                                  >
                                    Submit
                                  </button>
                                </>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>

                {/* Birthdays, annverydays, etc  */}
                {/* <section className="pt-2 pb-5">
                  <div className="container-md">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                      </div>
                      <div className="col-lg-12">
                        <div>
                          <div>
                            <div
                              style={{
                                backgroundImage: `url(${backgroundImageUrl})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                height: "80px",
                                width: "100%",
                              }}
                            >
                              <div className="row m-4">
                                {LatestInfos?.map((data, i) => {
                                  return (
                                    <>
                                      <div
                                        className="col"
                                        key={i}
                                        style={{ textAlign: "center" }}
                                      >
                                        <div className="pt-2">
                                          <h6
                                            style={{
                                              color: "black",
                                              fontSize: "12px",
                                            }}
                                          >
                                            {data?.title}
                                          </h6>
                                          <b style={{ color: "black" }}>
                                            {data?.count}
                                          </b>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section> */}

                <section className="pt-2 bg-light">
                  <div className="container-md">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div className="row">
                          {LatestInfos?.map((data, i) => {
                            return (
                              <div
                                className="col-lg-3 col-md-6 col-sm-12 text-center mb-1"
                                key={i}
                              >
                                <div className="card   p-3 box-dark shadow-sm" style={{ backgroundColor: "#E9DCFF", border: "solid 3px purple" }}>
                                  <div className="card-body">
                                    <h4 className="" style={{ color: "#681DC0" }}>
                                      {data?.title}
                                    </h4>
                                    <b className="text-dark">{data?.count}</b>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>






                <section className="pb-4 pt-1 bg-light">
                  <div className="container-md">
                    <div className="section-wraper row d-flex align-items-center">
                      <div className="col-md-6 section-header mb-0">
                        <h2 className="" style={{ color: "#681DC0" }}>Our Theaters</h2>
                      </div>
                      <div className="col-md-6 text-end">
                        <a
                          href="/Theaters"
                          className="fw-bold"
                          style={{ marginRight: "25px", color: "#681DC0" }}
                        >
                          View all
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <Slider {...settings2}>
                        {Theaters?.map((data, i) => (
                          <div className="col-md-4" key={i}>
                            <div className="item">
                              <div className="profile-widget m-1">
                                <div className="doc-img">
                                  <a
                                    href="/Theaters"
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                  >
                                    {/* when there is no video dispalying the same image in the the */}
                                    {data.video ? (
                                      <video
                                        src={URLS.Base + data.video}
                                        className="img-fluid video-mobile"
                                        id="theaters"
                                        style={{
                                          height: "250px", // Same height as image
                                          borderRadius: "10px",
                                          width: "100%", // Same width as image
                                          cursor: "pointer",
                                          display: "block",
                                          objectFit: "cover",
                                        }}
                                        autoPlay
                                        loop
                                        muted
                                      />
                                    ) : (
                                      <img
                                        // src={URLS.Base + data.image[0]}
                                        src={URLS.Base + data.image}
                                        alt=""
                                        className="img-fluid video-theatres"
                                        id="theaters"
                                        style={{
                                          height: "250px", // Same height as video
                                          borderRadius: "5px",
                                          width: "100%", // Same width as video
                                          cursor: "pointer",
                                        }}
                                      />
                                    )}
                                    {data.video ? (
                                      <img
                                        // src={URLS.Base + data.image[0]}
                                        src={URLS.Base + data.image}
                                        alt=""
                                        className="img-fluid theatres"
                                        id="theaters"
                                        style={{
                                          height: "250px", // Same height as video
                                          borderRadius: "10px",
                                          width: "100%", // Same width as video
                                          cursor: "pointer",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        // src={URLS.Base + data.image[0]}
                                        src={URLS.Base + data.image}
                                        alt=""
                                        className="img-fluid  vdeoimage"
                                        id="theaters"
                                        style={{
                                          height: "280px", // Same height as video
                                          borderRadius: "10px",
                                          width: "100%", // Same width as video
                                          cursor: "pointer",
                                          objectFit: "cover",
                                        }}
                                      />
                                    )}
                                  </a>
                                </div>
                                <div className="row row-sm text-center">
                                  <div className="col-12 rounded p-2 me-2 d-flex justify-content-between align-items-center" style={{ background: "#CCACF5" }}>
                                    <h5
                                      className="title text-dark"
                                      style={{ marginLeft: "20px" }}
                                    >
                                      {data.name}
                                    </h5>
                                    <button
                                      className="btn text-light theaters-btn"
                                      style={{
                                        boxShadow: "none",
                                        marginRight: "20px",
                                        backgroundColor: "#510FA0"
                                      }}
                                      onClick={handleTheater}
                                    >
                                      Book Now
                                    </button>
                                  </div>

                                  {/* Uncomment if you want to show offer price
              <div className="col-12 mt-2">
                <h5 className="title" style={{ color: "#A020F0" }}>
                  ₹ {data.offerPrice}/-
                </h5>
              </div>
              */}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </section>

                <section className="services-section py-5 text-dark" style={{ backgroundColor: "#E9DCFF" }}>
                  <div className="container">
                    <h2 className="text-center mb-5" style={{ color: "#681DC0" }}>Our Services</h2>

                    {/* Large Card Wrapper */}
                    <div className="card text-dark p-4 rounded-4 shadow-lg border-0" style={{ backgroundColor: "#fff" }}>
                      <div className="row g-4">
                        {/* Service Card 1 */}
                        <div className="col-12 col-sm-6 col-lg-3">
                          <div
                            className="card h-100 text-center text-dark border-0 rounded-4 shadow-lg p-3"
                            style={{ background: "linear-gradient(to bottom left, #C69FF4, #FFFAFB)" }}
                          >
                            <div className="card-body d-flex flex-column align-items-center">
                              <img
                                src={beverages}
                                alt="Food & Beverages"
                                className="rounded-circle mb-3"
                                style={{
                                  height: "100px",
                                  width: "100px",
                                  objectFit: "cover",
                                  border: "2px solid #E9BE5F"
                                }}
                              />
                              <h5 className="card-title" style={{ color: "#510FA0" }}>Food & Beverages</h5>
                              <p className="card-text">Choose the perfect food combo for your celebration.</p>
                              <a href="/Food" className="mt-auto" style={{ color: "#510FA0" }}>
                                View more <i className="fas fa-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Service Card 2 */}
                        <div className="col-12 col-sm-6 col-lg-3">
                          <div
                            className="card h-100 text-center text-dark border-0 rounded-4 shadow-lg p-3"
                            style={{ background: "linear-gradient(to bottom left, #C69FF4, #FFFAFB)" }}
                          >
                            <div className="card-body d-flex flex-column align-items-center">
                              <img
                                src={screening}
                                alt="Screening"
                                className="rounded-circle mb-3"
                                style={{
                                  height: "100px",
                                  width: "100px",
                                  objectFit: "cover",
                                  border: "2px solid #E9BE5F"
                                }}
                              />
                              <h5 className="card-title" style={{ color: "#510FA0" }}>Screening</h5>
                              <p className="card-text">Bring your OTT accounts and relive the theatre magic!</p>
                            </div>
                          </div>
                        </div>

                        {/* Service Card 3 */}
                        <div className="col-12 col-sm-6 col-lg-3">
                          <div
                            className="card h-100 text-center text-dark border-0 rounded-4 shadow-lg p-3"
                            style={{ background: "linear-gradient(to bottom left, #C69FF4, #FFFAFB)" }}
                          >
                            <div className="card-body d-flex flex-column align-items-center">
                              <img
                                src={cake4}
                                alt="Cakes"
                                className="rounded-circle mb-3"
                                style={{
                                  height: "100px",
                                  width: "100px",
                                  objectFit: "cover",
                                  border: "2px solid #E9BE5F"
                                }}
                              />
                              <h5 className="card-title" style={{ color: "#510FA0" }}>Cakes</h5>
                              <p className="card-text">Choose the perfect cake for your celebration from our selection.</p>
                              <a href="/cakes" className=" mt-auto" style={{ color: "#510FA0" }}>
                                View more <i className="fas fa-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Service Card 4 */}
                        <div className="col-12 col-sm-6 col-lg-3">
                          <div
                            className="card h-100 text-center text-dark border-0 rounded-4 shadow-lg p-3"
                            style={{ background: "linear-gradient(to bottom left, #C69FF4, #FFFAFB)" }}
                          >
                            <div className="card-body d-flex flex-column align-items-center">
                              <img
                                src={roses}
                                alt="Bouquets"
                                className="rounded-circle mb-3"
                                style={{
                                  height: "100px",
                                  width: "100px",
                                  objectFit: "cover",
                                  border: "2px solid #E9BE5F"
                                }}
                              />
                              <h5 className="card-title" style={{ color: "#510FA0" }}>Bouquets</h5>
                              <p className="card-text">Add a beautiful rose bouquet to enhance your celebration.</p>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </section>


                <section className="occasions-section py-5 text-dark" style={{ backgroundColor: "#fff" }}>
                  <div className="container">
                    <h2 className="text-center mb-5" style={{ color: "#681DC0" }}>Our Occasions</h2>

                    {/* Modify occasions data before rendering */}
                    {(() => {
                      const modifiedOccasions = occasions.map(occasion => {
                        // Custom descriptions for each occasion
                        let description = "";
                        switch (occasion.name) {
                          case "Anniversary":
                            description = "Celebrate your love and commitment in a private, luxurious theatre at Binge N Joy. Enjoy a personalized ambiance, delicious food, and exceptional picture quality.";
                            break;
                          case "Bride To Be":
                            description = "Celebrate your upcoming wedding with a special private screening. Enjoy a memorable day filled with personalized decor, scrumptious food, and a luxurious theatre experience.";
                            break;
                          case "Groom To Be":
                            description = "Make the groom’s last night as a bachelor memorable with a private screening and special services. Enjoy delicious food, exceptional sound, and an intimate theatre experience.";
                            break;
                          case "Dad To Be":
                            description = "Celebrate the soon-to-be father in a private, luxurious setting with custom decor and exceptional service. Enjoy great food, a perfect movie, and a memorable experience.";
                            break;
                          case "Mom To Be":
                            description = "Celebrate the expecting mother in a private theatre with amazing decor and personalized services. Enjoy a relaxing, unforgettable experience with great food and movies.";
                            break;
                          case "Love Proposal":
                            description = "Plan the perfect surprise proposal at Binge N Joy Private Theatres. With a magical atmosphere, your proposal will be an unforgettable moment, complete with beautiful decor and food.";
                            break;
                          case "Marriage Proposal":
                            description = "Propose in the most romantic and unforgettable way at Binge N Joy. Enjoy a private theatre with personalized decor, delicious food, and everything you need for the perfect proposal.";
                            break;
                          case "Farewell":
                            description = "Bid farewell in style at Binge N Joy Private Theatres. Celebrate the memories with a private screening, delicious food, and the perfect ambiance for your farewell.";
                            break;
                          case "Bon voyage":
                            description = "Send off a loved one with a special farewell event at Binge N Joy Private Theatres. Enjoy a private screening with gourmet food and personalized decor for the perfect bon voyage.";
                            break;
                          default:
                            description = "Binge N Joy Private Theatres is the perfect place to celebrate any special occasion. Enjoy an intimate and luxurious setting with exceptional picture and sound quality, delicious food, and attentive staff.";
                            break;
                        }

                        return {
                          ...occasion,
                          description: description,
                          name: occasion.name === "Carnival Castle" ? "Binge N Joy" : occasion.name,
                        };
                      });

                      return (
                        <div className="card text-white p-4 rounded-4 shadow-lg border-0" style={{ backgroundColor: "#E9DCFF" }}>
                          <div className="row g-4">
                            {modifiedOccasions.map((occasion, index) => (
                              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                <div className="card h-100 text-center bg-light rounded-4 shadow-sm p-3" style={{ border: "solid 3px #681DC0" }}>
                                  <div className="card-body d-flex flex-column align-items-center">
                                    <img
                                      src={URLS.Base + occasion.image}
                                      alt={occasion.name}
                                      className="rounded-circle mb-3"
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                        objectFit: "cover",
                                        border: "2px solid #E9BE5F",
                                      }}
                                    />
                                    <h5 className="card-title" style={{ color: "#681DC0" }}>
                                      {occasion.name}
                                    </h5>
                                    <p className="card-text fw-semibold mb-1 text-warning">₹{occasion.price}</p>
                                    <p className="card-text small">{occasion.description}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Proceed Button */}
                          <div className="text-center mt-5">
                            <button
                              className="btn px-5 py-2 rounded-pill fw-bold"
                              style={{ backgroundColor: "#681DC0", color: "#fff" }}
                              onClick={() => navigate('/theatres')} // Make sure you have this function defined
                            >
                              Proceed <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </section>


                {/* WHY US Section */}
                <section className="py-5 text-dark" style={{ backgroundColor: "#E9DCFF" }}>
                  <div className="container-md">
                    <div className="row align-items-center g-4">

                      {/* Left Image (keep from backend) */}
                      <div className="col-lg-6">
                        <img
                          src={URLS?.Base + Highlights?.image}
                          alt="highlight"
                          className="img-fluid rounded-4 shadow"
                        />
                      </div>

                      {/* Right Static Content */}
                      <div className="col-lg-6">
                        <div className="ps-lg-4">
                          <h2 className="mb-3" style={{ color: "#681DC0" }}>
                            🎉 Why Choose BingeNJoy Private Theatre?
                          </h2>
                          <h4 className="fw-semibold mb-3">
                            At BingeNJoy, we believe every celebration deserves a cinematic experience — intimate, exclusive and unforgettable. Here’s why our private theatre stands out:
                          </h4>

                          <div className="d-flex align-items-start mb-2">
                            <i className="fas fa-check-circle me-2 text-warning mt-1"></i>
                            <p className="mb-0">
                              🎂 <strong>Perfect for Every Occasion:</strong> Be it a birthday bash, bride-to-be celebration, mom-to-be gathering, or a surprise date night, BingeNJoy provides themed decorations, cakes, entry fog effects, and even photography to make your day extra special.
                            </p>
                          </div>

                          <div className="d-flex align-items-start mb-2">
                            <i className="fas fa-check-circle me-2 text-warning mt-1"></i>
                            <p className="mb-0">
                              🌟 <strong>Luxurious Ambience:</strong> Step into a space thoughtfully designed with decor, plush recliners, and premium sound systems. It’s not just watching a movie — it’s celebrating in style.
                            </p>
                          </div>

                          <div className="d-flex align-items-start mb-2">
                            <i className="fas fa-check-circle me-2 text-warning mt-1"></i>
                            <p className="mb-0">
                              💸 <strong>Budget-Friendly Luxury:</strong> We believe unforgettable experiences shouldn't break the bank. Our transparent pricing, combo offers, and membership rewards ensure premium experiences at affordable rates.
                            </p>
                          </div>

                          <div className="d-flex align-items-start mb-2">
                            <i className="fas fa-check-circle me-2 text-warning mt-1"></i>
                            <p className="mb-0">
                              📍 <strong>Prime Location in the City:</strong> Located in the heart of Hyderabad, BingeNJoy is easily accessible for students, working professionals, and families looking for a unique yet cozy place to celebrate.
                            </p>
                          </div>

                          <div className="d-flex align-items-start mb-2">
                            <i className="fas fa-check-circle me-2 text-warning mt-1"></i>
                            <p className="mb-0">
                              🛎️ <strong>End-to-End Convenience:</strong> From easy online booking to WhatsApp support, custom décor add-ons, and continental food & drinks, we take care of every detail so you can sit back and enjoy the magic.
                            </p>
                          </div>

                          <div className="mt-4">
                            <button
                              onClick={() => window.location.href = "/theaters"}
                              className="btn"
                              style={{ backgroundColor: "#681DC0", color: "#fff" }}
                            >
                              <i className="fas fa-ticket-alt me-2" />
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </section>



                {/* Gallery */}
                <section className="pb-3 pb-3 " style={{ backgroundColor: "#fff" }} >
                  <div className="container-md">
                    <div className="section-wraper row d-flex align-items-center">
                      <div className="col-md-6 section-header mb-0 mt-3 mb-3">
                        <h2 className="" style={{ color: "#681DC0" }}>Gallery</h2>
                      </div>
                      <div className="col-md-6 text-end">
                        <a href="/gallery" className="fw-bold" style={{ color: "#681DC0" }}>
                          View all
                        </a>
                      </div>
                      <div className="row justify-content-center">
                        {/* <div>
                          <div className="row mb-4">
                            {images?.map((image, index) => {
                              return (
                                <div
                                  className="col-md-4 col-12 mt-3 mb-4"
                                  key={index}
                                >
                                  <div className="image-container">
                                    <img
                                      src={URLS?.Base + image?.image}
                                      alt={image.alt}
                                    />
                                    <i
                                      className="fa fa-search-plus zoom-icon"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div> */}

                        <div className="container-md">
                          <div>
                            <Galleria
                              ref={galleria}
                              value={images}
                              numVisible={7}
                              style={{ maxWidth: "850px" }}
                              activeIndex={activeIndex}
                              onItemChange={(e) => setActiveIndex(e.index)}
                              circular
                              fullScreen
                              showItemNavigators
                              showThumbnails={false}
                              item={itemTemplate}
                              thumbnail={thumbnailTemplate}
                            />
                            <div>
                              <div className="row mb-4">
                                {images.map((image, index) => {
                                  return (
                                    <div
                                      className="col-lg-4 col-md-4 mt-3 mb-4"
                                      key={index}
                                    >
                                      <div
                                        className="zoom-container"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          setActiveIndex(index);
                                          galleria.current.show();
                                        }}
                                      >
                                        <img
                                          src={URLS.Base + image.image}
                                          alt={image.alt}
                                          style={{
                                            width: "100%",
                                            height: "300px",
                                            border: "1px solid #F5E7B6",
                                          }}
                                        />
                                        {/* Zoom Icon */}
                                        <span className="zoom-icon">
                                          <i className="fas fa-search-plus"></i>
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-12 text-end">
                        <a
                          href="https://www.instagram.com/carnival_castle_hyderabad/"
                          target="_blank"
                          className="bright-all-links fw-bold"
                        >
                          Our Instagram <i className="fab fa-instagram" />
                        </a>
                      </div> */}
                    </div>
                  </div>
                </section>



                <section className="py-5" style={{ backgroundColor: "#E9DCFF", color: "#681DC0" }}>
                  <div className="container">
                    <div className="row justify-content-between align-items-center rounded-4 p-4 shadow" style={{ backgroundColor: "#FCCC00" }}>
                      {/* Text Column */}
                      <div className="col-12 col-md-8 mb-3 mb-md-0">
                        <h4 className="fw-bold text-purple mb-2">Follow Our Journey on Instagram</h4>
                        <p className="text-dark m-0">Get inspired by our latest creations and behind-the-scenes moments.</p>
                      </div>

                      {/* Button Column */}
                      <div className="col-12 col-md-4 text-md-end">
                        <a
                          href="https://www.instagram.com/bingenjoy.hyd?utm_source=qr&igsh=MTI5bG13aHh4bjdzNg=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill text-decoration-none fw-semibold"
                          style={{
                            background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                            color: "#fff",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                          }}
                        >
                          <i className="fab fa-instagram"></i> binge_N_joy_hyderabad
                        </a>
                      </div>
                    </div>
                  </div>
                </section>



                {/* FAQS */}
                <section className="pb-3 pb-3 bg-light">
                  <div className="container">
                    <div className="section-wraper row d-flex align-items-center">
                      <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-8">
                          <div className="section-title text-center mb-5 pt-3">
                            <h2 className="" style={{ color: "#681DC0" }}>
                              Frequently Asked Questions
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-8">
                          <Accordion defaultActiveKey="0">
                            {Faqs?.map((data, i) => {
                              // Replace "Carnival Castle" with "Binge N Joy" in the question and answer
                              let updatedQuestion = data.question?.replace(/Carnival Castle/g, "Binge N Joy");
                              let updatedAnswer = data.answer
                                ?.replace(/Carnival Castle/g, "Binge N Joy")
                                .replace(/https:\/\/carnivalcastle\.com/g, "https://bingenjoy.com")
                                .replace(/9059382797/g, "8977917555")
                                .replace(/8341428342/g, "8977917555");

                              return (
                                <Accordion.Item
                                  className="mt-3"
                                  eventKey={i.toString()}
                                  key={i}
                                  style={{ background: "white" }}
                                >
                                  <Accordion.Header>
                                    <b>
                                      {i + 1}. {updatedQuestion}
                                    </b>
                                  </Accordion.Header>
                                  <Accordion.Body>{updatedAnswer}</Accordion.Body>
                                </Accordion.Item>
                              );
                            })}
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>


                {/* ENQUIRY */}
                <section className="pt-5 pb-5 p-relative" style={{ backgroundColor: "#E9DCFF" }}>
                  <div className="p-3">
                    <div className="row justify-content-md-center">
                      <div className="pl-30">
                        <div className="row justify-content-center">
                          <div className="col-xl-6 col-lg-8"></div>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-3">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5504603517853!2d78.363276!3d17.4589078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93c845555555%3A0x5a36652c3fe58487!2sBingenjoy%20-%20Private%20Theaters!5e0!3m2!1sen!2sin!4v1710247202871!5m2!1sen!2sin"
                          width="100%"
                          height={480}
                          style={{ borderRadius: "20px" }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                      <div className="col-lg-6 mt-3">
                        <div>
                          <div className="row">
                            <div className="col-lg-6 rounded border border-2" style={{ backgroundColor: "#fff" }}>
                              <div className="contactsops" style={{ backgroundColor: "#fff" }}>
                                <img
                                  src={logo}
                                  alt="logo"
                                  style={{ height: "85px" }}
                                />
                                <p style={{ color: "black" }}>
                                  Planning a memorable celebration at Binge N Joy Private Theatre? We are ready to make your vision a reality! Whether it's a birthday, anniversary, bride to be, mom to be, groom to be, baby shower, private movie screening, special surprises or corporate event, we offer tailored packages to make each occasion special. To enquire, simply contact us to discuss your specific needs, from theme decor, food options to seating arrangements and custom add-ons.
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="booking-form align-items-center justify-content-center">
                                <form
                                  className="mt-4 mb-3"
                                  onSubmit={(e) => {
                                    formsubmit(e);
                                  }}
                                >
                                  <>
                                    <div className="section-title text-center mb-5">
                                      <h2 className="" style={{ color: "#681DC0" }}>Enquiry Now</h2>
                                      <hr className="text-purple"></hr>
                                    </div>
                                    <div className="mb-3 input-group">
                                      <span className="input-group-text">
                                        <FontAwesomeIcon icon={faUser} />
                                      </span>
                                      <input
                                        required
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter Full Name*"
                                      />
                                    </div>

                                    <div className="mb-3 input-group">
                                      <span className="input-group-text">
                                        <FontAwesomeIcon icon={faPhone} />
                                      </span>
                                      <input
                                        required
                                        type="text"
                                        name="mobileNumber"
                                        onChange={handleChange}
                                        maxLength="10"
                                        minLength="10"
                                        pattern="[0-9]{10}"
                                        value={form.mobileNumber}
                                        placeholder="Enter Mobile Number*"
                                        className="form-control"
                                      />
                                    </div>

                                    <div className="mb-3 input-group">
                                      <span className="input-group-text">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                      </span>
                                      <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email*"
                                        onChange={handleChange}
                                        value={form.email}
                                        className="form-control"
                                      />
                                    </div>

                                    <div className="mb-3 input-group">
                                      <span className="input-group-text">
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                      </span>
                                      <input
                                        required
                                        type="text"
                                        name="eventName"
                                        placeholder="Enter Event Name*"
                                        onChange={handleChange}
                                        value={form.eventName}
                                        className="form-control"
                                      />
                                    </div>

                                    <div className="mb-3 input-group">
                                      <span className="input-group-text">
                                        <FontAwesomeIcon icon={faClipboard} />
                                      </span>
                                      <input
                                        type="text"
                                        name="description"
                                        required
                                        onChange={handleChange}
                                        value={form.description}
                                        placeholder="Enter Description*"
                                        className="form-control"
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      className="btn mb-3 float-end"
                                      style={{ backgroundColor: "#681DC0", color: "white" }}
                                    >
                                      Submit
                                    </button>
                                  </>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>


              // Your modal component
              <Modal
  size="md"
  show={lgShow}
  onHide={() => setLgShow(false)}
  aria-labelledby="example-modal-sizes-title-lg"
  centered
>
  <div style={{ position: "relative", width: "100%" }}>
    <img
      src={URLS.Base + PopUp.image}
      alt="Promotional popup"
      style={{ width: "100%", objectFit: "cover" }}
    />
    <button
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "rgba(0, 0, 0, 0.5)",
        border: "none",
        color: "white",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={() => setLgShow(false)}
    >
      &times;
    </button>
  </div>
</Modal>
                <ToastContainer />
                <Footer />
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
