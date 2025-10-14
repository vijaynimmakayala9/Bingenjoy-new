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

import { Carousel, Card, Container, Row, Col, Button } from "react-bootstrap";
import TheaterDetails from "../pages/TheaterDetails";

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
      title: "Basic Plan",
      price: "2149",
      subtitle: "Simple theatre slot, no setup",
      detailedFeatures: {
        "Theatre Hall": true,
        "Decoration": true,
        "Fog Entry (1 Pot)": false,
        "Candle Path": false,
        "HBD LED": false,
        "Name with LED (6)": false,
        "AGE Number LED": false,
        "HBD with Rose petals": false,
        "Photo Clipping (10)": false,
        "Birthday Sash": false,
        "Birthday Crown, Spects": false,
        "Rose Bouquet (12 Roses)": false,
        "Customisation cake (1 kg)": false,
        "Photography (30 Mins)": false,
        "Cold fire entry (6 pieces)": false,
        "Videography(Edited 1 Min Reel)": false,
        "Hall fog (4 Pots)": false,
      },
      badgeText: "Saved ₹0",
      buttonText: "Proceed →",
    },
    {
      id: 2,
      title: "Standard Plan",
      subtitle: "Includes cake, lights & decor.",
      detailedFeatures: {
        "Theatre + Decoration": true,
        "Fog Entry (1 Pot)": true,
        "Candle Path": true,
        "HBD LED": true,
        "Name with LED (6)": true,
        "AGE Number LED": true,
        "HBD with Rose Petals": true,
        "Photo Clipping (10)": true,
        "Birthday Sash": true,
        "Birthday Crown, Spects": true,
        "Rose": true,
        "Regular Cake - 1/2 kg": true,
        "Photography (15 Mins)": true,
        "Cold fire entry (6 pieces)": false,
        "Videography(Edited 1 Min Reel)": false,
        "Hall fog (4 Pots)": false,
      },
      badgeText: "Save ₹200",
      buttonText: "Proceed →",
    },
    {
      id: 3,
      title: "Special Plan",
      subtitle: "Our grandest experience, full royal vibes.",
      detailedFeatures: {
        "Theatre + Decoration": true,
        "Fog Entry (1 Pot)": true,
        "Candle Path": true,
        "HBD LED": true,
        "Name with LED (6)": true,
        "AGE Number LED": true,
        "HBD with Rose petals": true,
        "Photo Clipping (10)": true,
        "Birthday Sash": true,
        "Birthday Crown, Spects": true,
        "Rose Bouquet (6 Roses)": true,
        "Customisation cake (1 kg)": true,
        "Photography (30 Mins)": true,
        "Cold fire entry (4 pieces)": true,
        "Videography(Edited 1 Min Reel)": false,
        "Hall fog (4 Pots)": false,
      },
      badgeText: "Save ₹400",
      buttonText: "Proceed →",
    },
    {
      id: 4,
      title: "Premium Plan",
      subtitle: "More guests, more upgrades, more glam.",
      detailedFeatures: {
        "Theatre + Decoration": true,
        "Fog Entry (1 Pot)": true,
        "Candle Path": true,
        "HBD LED": true,
        "Name with LED (6)": true,
        "AGE Number LED": true,
        "HBD with Rose petals": true,
        "Photo Clipping (10)": true,
        "Birthday Sash": true,
        "Birthday Crown, Spects": true,
        "Rose Bouquet (12 Roses)": true,
        "Customisation cake (1 kg)": true,
        "Photography (30 Mins)": true,
        "Cold fire entry (6 pieces)": true,
        "Videography(Edited 1 Min Reel)": true,
        "Hall fog (4 Pots)": true,
      },
      badgeText: "Save ₹300",
      buttonText: "Proceed →",
    },
  ];




  const Reviews = [
    {
      name: 'G. Harish',
      location: 'Gachibowli, Hyderabad',
      rating: 5,
      description: 'We had the best birthday surprise ever! The theatre was beautifully set up and everything was perfect.',
      occasion: "Daughter’s 1st Birthday",
      avatar: 'https://i.ibb.co/4Vb94bc/harish-avatar.png',
      image: 'https://api.carnivalcastle.com/uploads/galleryImg/1728132803817-DSC07593.jpg',
    },
    {
      name: 'Ravi Kumar',
      location: 'Jubilee Hills, Hyderabad',
      rating: 4,
      description: 'Wonderful experience. Everything was well arranged and exceeded expectations!',
      occasion: 'Wedding Anniversary',
      avatar: 'https://i.ibb.co/4Vb94bc/harish-avatar.png',
      image: 'https://api.carnivalcastle.com/uploads/galleryImg/1728132797148-DSC07601.jpg',
    },
    {
      name: 'Sneha Sharma',
      location: 'Kondapur, Hyderabad',
      rating: 5,
      description: 'It felt so personal and beautiful. Loved the decorations and ambience.',
      occasion: 'Valentine’s Day',
      avatar: 'https://i.ibb.co/4Vb94bc/harish-avatar.png',
      image: 'https://api.carnivalcastle.com/uploads/galleryImg/1728132803817-DSC07593.jpg',
    },
    {
      name: 'Rahul Verma',
      location: 'Banjara Hills, Hyderabad',
      rating: 5,
      description: 'Our celebration turned out to be magical, thanks to the amazing setup and staff!',
      occasion: 'Baby Shower',
      avatar: 'https://i.ibb.co/4Vb94bc/harish-avatar.png',
      image: 'https://api.carnivalcastle.com/uploads/galleryImg/1728132797148-DSC07601.jpg',
    },
    {
      name: 'Aarti Nair',
      location: 'Madhapur, Hyderabad',
      rating: 4,
      description: 'Highly recommend this place! The ambiance was perfect for our celebration.',
      occasion: 'Engagement',
      avatar: 'https://i.ibb.co/4Vb94bc/harish-avatar.png',
      image: 'https://api.carnivalcastle.com/uploads/galleryImg/1728132803817-DSC07593.jpg',
    },
    {
      name: 'Vikram Singh',
      location: 'Hi-Tech City, Hyderabad',
      rating: 5,
      description: 'Superb arrangements. The staff was very friendly and everything went smoothly.',
      occasion: 'Retirement Party',
      avatar: 'https://i.ibb.co/4Vb94bc/harish-avatar.png',
      image: 'https://api.carnivalcastle.com/uploads/galleryImg/1728132797148-DSC07601.jpg',
    },
  ];

  const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const isMobile = window.innerWidth < 768;
  // const slides = chunkArray(Reviews, isMobile ? 1 : 3);



  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoRotate = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % whyUsSlides.length);
    }, 6000);
  };

  const stopAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, []);

  const handleSelect = (selectedIndex) => {
    stopAutoRotate();
    setIndex(selectedIndex);
    startAutoRotate(); // restart timer on manual select
  };
  const whyUsSlides = [
    {
      image: URLS?.Base + Highlights?.image, // Replace with dynamic images
      title: "Why Choose BingeNJoy Private Theatre?",
      subtitle:
        "At BingeNJoy, we believe every celebration deserves a cinematic experience — intimate, exclusive and unforgettable. Here’s why our private theatre stands out:",
      points: [
        "Perfect for Every Occasion: Themed decorations, cakes, fog effects & photography.",
        "Luxurious Ambience: Recliners, premium sound, elegant decor.",
        "Budget-Friendly Luxury: Combo offers & rewards for every budget.",
        "Prime Location in Hyderabad: Easily accessible, cozy, and convenient.",
        "End-to-End Convenience: WhatsApp support, décor add-ons & great food."
      ]
    },
    {
      image: "https://api.carnivalcastle.com/uploads/galleryImg/1728132797148-DSC07601.jpg", // Replace with another image
      title: "Celebrate Cinematically!",
      subtitle:
        "Experience celebrations like never before in our private theatres — where entertainment meets exclusivity.",
      points: [
        "Customizable Packages: Tailor your party exactly how you like it.",
        "Gourmet Snacks & Beverages: From popcorn to premium platters.",
        "Full HD Projector & Sound: A real theatre vibe, privately yours.",
        "Cozy for Everyone: Perfect for couples, families, and friends.",
        "Hassle-Free Booking: Fast, flexible & fully digital!"
      ]
    },
    {
      image: "https://api.carnivalcastle.com/uploads/galleryImg/1728132803817-DSC07593.jpg", // Replace with another image
      title: "Make Every Moment Magical",
      subtitle:
        "From surprise proposals to baby showers — bring your vision to life in an immersive, themed theatre setting.",
      points: [
        "Baby Showers, Anniversaries & More: Celebrate every milestone.",
        "Themed Decor & Props: Transform the space into your dream setting.",
        "Memorable Photo Zones: Instagram-worthy backdrops included.",
        "Night or Day Slots: Flexible celebration timings.",
        "Personalized Assistance: Our team helps plan every detail."
      ]
    }
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.post(
          "https://api.carnivalcastle.com/v1/carnivalApi/admin/testimonial/getalltestimoni"
        );

        if (res.data?.success && Array.isArray(res.data.testimoni)) {
          // ✅ Only include testimonials that are active and have a valid videoId
          const videoTestimonials = res.data.testimoni.filter(
            (t) =>
              t.status === "active" &&
              t.videoId &&
              t.videoId.trim() !== ""
          );

          setTestimonials(videoTestimonials);

          // ✅ Set first video testimonial as default selected
          if (videoTestimonials.length > 0) {
            setSelected(videoTestimonials[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.post(
          "https://api.carnivalcastle.com/v1/carnivalApi/admin/testimonial/getalltestimoni"
        );

        if (res.data?.success && Array.isArray(res.data.testimoni)) {
          // ✅ Filter only active + with videoId
          const filtered = res.data.testimoni.filter(
            (t) => t.status === "active" && t.videoId
          );

          // ✅ Map API fields to front-end fields
          const formatted = filtered.map((t) => ({
            name: t.name,
            location: t.role || "Customer",
            rating: Number(t.rating) || 5,
            description: t.description || "",
            image: `https://api.carnivalcastle.com/${t.image}`,
            avatar: `https://api.carnivalcastle.com/${t.image}`, // using same image as avatar
            occasion: t.type === "Yes" ? "Special Celebration" : "",
          }));

          // ✅ Group into slides of 3 per slide
          const grouped = [];
          for (let i = 0; i < formatted.length; i += 3) {
            grouped.push(formatted.slice(i, i + 3));
          }

          setSlides(grouped);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);


  const BaseUrl = "https://api.carnivalcastle.com/v1/carnivalApi/";
  const ImageBase = "https://api.carnivalcastle.com/";

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${BaseUrl}admin/address/alladdress`);
        if (res.data && res.data.success) {
          setAddresses(res.data.data || []);
        } else {
          setAddresses([]);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setAddresses([]);
      }
    };
    fetchAddresses();
  }, []);

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
    if (lgShow) {
      window.scrollTo(0, 0);
    }
  }, [lgShow]);


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
          <div className="home-page indexsix">
            <div className="main-wrapper">
              <>
                <Header />

                <div className="scrollbar">
                  <Slider {...settings}>

                    {Sliders?.map((data, i) => (
                      <div key={i}>
                        <div className="mt-0">
                          {PopUp1.modalEnabled && (
                            <div style={{ backgroundColor: "#fa462af2" }} className="text-center py-2">
                              <marquee className="text-white fw-bold">
                                LAST MINUTE OFFER: {PopUp1.title}
                              </marquee>
                            </div>
                          )}
                        </div>
                        <section className="banner-section d-flex align-items-center position-relative text-white">
                          <div className="overlay"></div>
                          <div className="container position-relative" style={{ zIndex: 2 }}>
                            <div className="row justify-content-center text-center text-md-start">
                              <div className="col-lg-10">
                                {/* <h1 className="display-4 fw-bold text-shadow mb-3">
                                  <Typer
                                    text="Surprise your loved one only at Binge N Joy Private Theaters"
                                    typingSpeed={100}
                                  />
                                </h1>
                                <p className="lead mb-4">{data.description}</p>

                                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-sm-start">
                                  <a href="/theaters" className="btn btn-lg px-4 fw-bold btn-purple">
                                    Book Now
                                  </a>
                                  <a href="tel:8977917555" className="btn btn-lg px-4 fw-bold btn-purple">
                                    Book via Call
                                  </a>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </section>


                        {/* Floating Cards Section */}
                        <div
                          className="container position-relative mb-5"
                          style={{ marginTop: "-80px", zIndex: 3 }}
                        >
                          <div className="row g-4 justify-content-center">
                            {/* Movie Night */}
                            <div className="col-md-4">
                              <div className="card shadow border-0 h-100 p-3 card123">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fas fa-film text-purple me-2 fs-4"></i>
                                  <h5 className="mb-0 text-purple">Movie Night</h5>
                                </div>
                                <p className="text-muted small mt-2">
                                  Enjoy a private cinema experience with Dolby Atmos sound and
                                  4K visuals. Perfect for couples, friends, or family movie marathons.
                                </p>
                              </div>
                            </div>

                            {/* Corporate Events */}
                            <div className="col-md-4">
                              <div className="card shadow border-0 h-100 p-3 card123">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fas fa-briefcase text-purple me-2 fs-4"></i>
                                  <h5 className="mb-0 text-purple">Corporate Events</h5>
                                </div>
                                <p className="text-muted small mt-2">
                                  Host business meetings, product launches, or team gatherings
                                  in a unique private theatre setting that leaves a lasting impression.
                                </p>
                              </div>
                            </div>

                            {/* Special Celebrations */}
                            <div className="col-md-4">
                              <div className="card shadow border-0 h-100 p-3 card123">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fas fa-star text-purple me-2 fs-4"></i>
                                  <h5 className="mb-0 text-purple">Special Celebrations</h5>
                                </div>
                                <p className="text-muted small mt-2">
                                  From anniversaries to surprise parties, make your special moments
                                  unforgettable with a luxurious private theatre experience.
                                </p>
                              </div>
                            </div>

                            {/* Hover CSS */}
                            <style>{`
                                    .card123 {
                                      border-radius: 12px;
                                      transition: all 0.3s ease;
                                      cursor: pointer;
                                    }

                                    .card123:hover {
                                      transform: translateY(-10px) scale(1.03);
                                      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
                                      background: linear-gradient(135deg, #7b2cbf, #9d4dff);
                                      color: #fff;
                                    }

                                    .card123:hover h5,
                                    .card123:hover p,
                                    .card123:hover i {
                                      color: #fff !important;
                                    }

                                    .card123 i {
                                      transition: transform 0.3s ease, color 0.3s ease;
                                    }

                                    .card123:hover i {
                                      transform: rotate(10deg) scale(1.2);
                                    }
                                  `}</style>
                          </div>
                        </div>



                      </div>
                    ))}
                  </Slider>
                </div>

                <section className="py-5 bg-white">
                  <div className="container-fluid text-center py-5 gradientright">
                    <h2 className="fw-bold mb-4 dark-text">Our Branches</h2>

                    <div className="d-flex flex-wrap justify-content-center gap-3">
                      {addresses.map((addr, idx) => (
                        <a
                          key={idx}
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${addr.addressLine1}, ${addr.addressLine2}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="branch-badge text-decoration-none fw-semibold d-inline-flex align-items-center"
                        >
                          <i className="bi bi-geo-alt-fill me-2"></i>
                          {addr.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  <style jsx>{`
    .branch-badge {
      background-color: #f3e8ff;
      color: #5b179b;
      padding: 0.6rem 1.2rem;
      border-radius: 50rem;
      box-shadow: 0 3px 6px rgba(91, 23, 155, 0.2);
      transition: all 0.3s ease;
    }
    .branch-badge:hover {
      background-color: #5b179b;
      color: #fff;
      box-shadow: 0 4px 10px rgba(91, 23, 155, 0.35);
      transform: translateY(-2px);
    }
    .branch-badge i {
      font-size: 1rem;
    }
  `}</style>
                </section>


                {/* <section className="pt-5 bg-white" >
                  <div className="container-fluid text-center pt-2 gradientright">
                    <h2 className="fw-bold mb-5 dark-text">Our Branches</h2>

                    <div className="row justify-content-center">
                      {addresses.map((addr, idx) => (
                        <div className="col-md-6 col-lg-5 mb-4" key={idx}>
                          <div
                            className="p-4 shadow-lg h-100"
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "2rem",
                              transition: "0.3s",
                            }}
                          >
                            <h4 className="fw-bold text-center mb-3" style={{ color: "#5b179b" }}>
                              {addr.name}
                            </h4>
                            <p
                              className="text-muted mb-3 text-center"
                              style={{ fontStyle: "italic", fontSize: "0.95rem" }}
                            >
                              {addr.addressLine1}, {addr.addressLine2}
                            </p>

                            <div className="text-center">
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                  `${addr.addressLine1}, ${addr.addressLine2}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none fw-semibold"
                                style={{ color: "#6d28d9" }}
                              >
                                <i className="bi bi-geo-alt-fill me-2 light-text fs-xl"></i>See on map
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                
                  <style jsx>{`
        .text-purple {
          color: #5b179b;
        }
      `}</style>
                </section> */}

                <TheaterDetails />

                {/*
                <section className="py-5 bg-light">
                  <div className="container">
                    <div className="text-center mb-5">
                      <h2 className="display-5 fw-bold dark-text">Our Packages</h2>
                      <p className="fs-5 light-text">
                        <i>Choose Wisely</i>
                      </p>
                    </div>

                   
                    <div className="row g-4 justify-content-center d-none d-md-flex">
                      {packages.map((pkg) => (
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10" key={pkg.id}>
                          <div className="card border-0 shadow rounded-4 h-100 text-center gradient45 position-relative">
                            <div className="card-body d-flex flex-column p-4">
                              
                              <div className="mb-3">
                                <h4 className="fw-bold mb-1">{pkg.title}</h4>
                                <p
                                  className="text-muted mb-0"
                                  style={{ fontStyle: "italic", fontSize: "14px" }}
                                >
                                  {pkg.subtitle}
                                </p>
                              </div>

                           
                              <ul className="list-unstyled text-start flex-grow-1 mb-1 px-2">
                                {Object.keys(pkg.detailedFeatures).map((feature, index) => (
                                  <li key={index} className="d-flex align-items-center mb-2">
                                    <span
                                      className={`me-2 fw-bold ${pkg.detailedFeatures[feature] ? "text-success" : "text-danger"
                                        }`}
                                    >
                                      {pkg.detailedFeatures[feature] ? "✅" : "❌"}
                                    </span>
                                    <span className="text-dark">{feature}</span>
                                  </li>
                                ))}
                              </ul>

                       
                              {pkg?.price ? (
                                <p className="fw-semibold mb-4 mt-auto">
                                  Starts from ₹{pkg.price}
                                </p>
                              ) : null}

                         
                              <button
                                className="btn text-white w-100"
                                style={{ backgroundColor: "#a259ff", borderRadius: "10px" }}
                                onClick={() => navigateTheater("/theaters")}
                              >
                                {pkg.buttonText}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                 
                    <div
                      id="packagesCarousel"
                      className="carousel slide d-block d-md-none"
                      data-bs-ride="carousel"
                      data-bs-interval="3000"
                      data-bs-wrap="true"
                      data-bs-pause="false"
                    >
                    
                      <div className="carousel-indicators">
                        {packages.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target="#packagesCarousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                          ></button>
                        ))}
                      </div>

                  
                      <div className="carousel-inner">
                        {packages.map((pkg, index) => (
                          <div
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                            key={pkg.id}
                          >
                            <div className="d-flex justify-content-center">
                              <div className="col-10">
                                <div className="card border-0 shadow rounded-4 text-center gradient45">
                                  <div className="card-body d-flex flex-column p-4">
                                   
                                    <div className="mb-3">
                                      <h4 className="fw-bold mb-1">{pkg.title}</h4>
                                      <p
                                        className="text-muted mb-0"
                                        style={{ fontStyle: "italic", fontSize: "14px" }}
                                      >
                                        {pkg.subtitle}
                                      </p>
                                    </div>

                                 
                                    <ul className="list-unstyled text-start flex-grow-1 mb-1 px-2">
                                      {Object.keys(pkg.detailedFeatures).map((feature, idx) => (
                                        <li key={idx} className="d-flex align-items-center mb-2">
                                          <span
                                            className={`me-2 fw-bold ${pkg.detailedFeatures[feature] ? "text-success" : "text-danger"
                                              }`}
                                          >
                                            {pkg.detailedFeatures[feature] ? "✅" : "❌"}
                                          </span>
                                          <span className="text-dark">{feature}</span>
                                        </li>
                                      ))}
                                    </ul>

                                   
                                    {pkg?.price ? (
                                      <p className="fw-semibold mb-4 mt-auto">
                                        Starts from ₹{pkg.price}
                                      </p>
                                    ) : null}

                                   
                                    <button
                                      className="btn text-white w-100"
                                      style={{ backgroundColor: "#a259ff", borderRadius: "10px" }}
                                      onClick={() => navigateTheater("/theaters")}
                                    >
                                      {pkg.buttonText}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                     
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#packagesCarousel"
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#packagesCarousel"
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </section>
                */}



                <section className="occasions-section py-5 text-dark" style={{ backgroundColor: "#fff" }}>
                  <div className="container">
                    <h2 className="text-center mb-5 light-text">
                      What Can You Celebrate at Binge N Joy?
                    </h2>

                    {(() => {
                      const modifiedOccasions = occasions.map((occasion) => {
                        let description = "";
                        switch (occasion.name) {
                          case "Anniversary":
                            description =
                              "Celebrate your love and commitment in a private, luxurious theatre at Binge N Joy. Enjoy a personalized ambiance, delicious food, and exceptional picture quality.";
                            break;
                          case "Bride To Be":
                            description =
                              "Celebrate your upcoming wedding with a special private screening. Enjoy a memorable day filled with personalized decor, scrumptious food, and a luxurious theatre experience.";
                            break;
                          case "Groom To Be":
                            description =
                              "Make the groom’s last night as a bachelor memorable with a private screening and special services. Enjoy delicious food, exceptional sound, and an intimate theatre experience.";
                            break;
                          case "Dad To Be":
                            description =
                              "Celebrate the soon-to-be father in a private, luxurious setting with custom decor and exceptional service. Enjoy great food, a perfect movie, and a memorable experience.";
                            break;
                          case "Mom To Be":
                            description =
                              "Celebrate the expecting mother in a private theatre with amazing decor and personalized services. Enjoy a relaxing, unforgettable experience with great food and movies.";
                            break;
                          case "Love Proposal":
                            description =
                              "Plan the perfect surprise proposal at Binge N Joy Private Theatres. With a magical atmosphere, your proposal will be an unforgettable moment, complete with beautiful decor and food.";
                            break;
                          case "Marriage Proposal":
                            description =
                              "Propose in the most romantic and unforgettable way at Binge N Joy. Enjoy a private theatre with personalized decor, delicious food, and everything you need for the perfect proposal.";
                            break;
                          case "Farewell":
                            description =
                              "Bid farewell in style at Binge N Joy Private Theatres. Celebrate the memories with a private screening, delicious food, and the perfect ambiance for your farewell.";
                            break;
                          case "Bon voyage":
                            description =
                              "Send off a loved one with a special farewell event at Binge N Joy Private Theatres. Enjoy a private screening with gourmet food and personalized decor for the perfect bon voyage.";
                            break;
                          default:
                            description =
                              "Binge N Joy Private Theatres is the perfect place to celebrate any special occasion. Enjoy an intimate and luxurious setting with exceptional picture and sound quality, delicious food, and attentive staff.";
                            break;
                        }

                        return {
                          ...occasion,
                          description: description,
                          name: occasion.name === "Carnival Castle" ? "Binge N Joy" : occasion.name,
                        };
                      });

                      // Detect device width
                      const screenWidth = window.innerWidth;
                      let groupSize = 3;
                      if (screenWidth < 768) groupSize = 1;
                      else if (screenWidth < 992) groupSize = 2;

                      // Group data for carousel slides
                      const chunkArray = (arr, size) =>
                        arr.reduce(
                          (acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc),
                          []
                        );

                      const slides = chunkArray(modifiedOccasions, groupSize);

                      return (
                        <div
                          id="occasionCarousel"
                          className="carousel slide"
                          data-bs-ride="carousel"
                          data-bs-interval="5000"
                          data-bs-pause="hover"
                        >
                          <div className="carousel-inner">
                            {slides.map((group, slideIndex) => (
                              <div className={`carousel-item ${slideIndex === 0 ? "active" : ""}`} key={slideIndex}>
                                <div className="row g-4 justify-content-center">
                                  {group.map((occasion, index) => (
                                    <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center" key={index}>
                                      <div className="card h-100 text-center bg-light rounded-4 gradient45 p-3 w-100">
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
                                          <p className="card-text small">{occasion.description}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Carousel Controls */}
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#occasionCarousel"
                            data-bs-slide="prev"
                          >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#occasionCarousel"
                            data-bs-slide="next"
                          >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button>

                          {/* Proceed Button */}
                          <div className="text-center mt-5">
                            <button
                              className="btn px-5 py-2 rounded-3 fw-bold dark-back text-light"
                              style={{ width: "80%", maxWidth: "500px" }}
                              onClick={() => navigate('/theaters')}
                            >
                              Proceed <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </section>

                <section className="services-section py-4 bg-white text-dark">
                  <div className="container">
                    <h2 className="text-center mb-4 fw-bold dark-text">Experience Our Services</h2>

                    <div className="row g-3 justify-content-center">
                      {/* Common card style */}
                      {[
                        { img: beverages, title: "Food & Beverages", text: "Choose the perfect food combo for your celebration.", link: "/Food" },
                        { img: screening, title: "Screening", text: "Bring your OTT accounts and relive the theatre magic!" },
                        { img: cake4, title: "Cakes", text: "Choose the perfect cake for your celebration from our selection.", link: "/cakes" },
                        { img: roses, title: "Bouquets", text: "Add a beautiful rose bouquet to enhance your celebration." }
                      ].map((service, idx) => (
                        <div key={idx} className="col-6 col-md-3">
                          <div className="service-card text-center rounded-4 shadow-sm p-3 h-100">
                            <img
                              src={service.img}
                              alt={service.title}
                              className="rounded-circle mb-2"
                              style={{
                                height: "80px",
                                width: "80px",
                                objectFit: "cover",
                                border: "2px solid #E9BE5F",
                              }}
                            />
                            <h6 className="fw-semibold mb-1 light-text">{service.title}</h6>
                            <p className="text-muted small mb-2" style={{ minHeight: "40px" }}>
                              {service.text}
                            </p>
                            {service.link && (
                              <a href={service.link} className="text-decoration-none small fw-semibold text-purple">
                                View more <i className="fas fa-arrow-right"></i>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inline styles */}
                  <style jsx>{`
    .service-card {
     background: linear-gradient(45deg, #FFFAFB, #C69FF4)!important;
      transition: all 0.3s ease;
    }
    .service-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(91, 23, 155, 0.2);
    }
    .text-purple {
      color: #5b179b;
    }
    @media (max-width: 576px) {
      .service-card img {
        height: 65px;
        width: 65px;
      }
      .service-card p {
        font-size: 0.75rem;
      }
    }
  `}</style>
                </section>



                {/* WHY US Section */}
                <section className="py-5 lighter-back">
                  <Container>
                    <div className="position-relative">
                      <Carousel
                        activeIndex={index}
                        onSelect={handleSelect}
                        controls={false}
                        indicators={false}
                        fade={false}
                        pause={false} // allows auto + manual without stopping on hover
                        touch={true}
                      >
                        {whyUsSlides.map((slide, idx) => (
                          <Carousel.Item key={idx}>
                            <Row className="align-items-center g-4 flex-column flex-md-row text-center text-md-start">
                              {/* Left - Image */}
                              <Col md={6}>
                                <img
                                  src={slide.image}
                                  alt="Highlight"
                                  className="img-fluid rounded-4 shadow w-100"
                                  style={{ maxHeight: "420px", objectFit: "cover" }}
                                />
                              </Col>

                              {/* Right - Text */}
                              <Col md={6}>
                                <div className="ps-md-4 mt-4 mt-md-0">
                                  <h2 className="mb-3" style={{ color: "#681DC0" }}>{slide.title}</h2>
                                  <h6 className="fw-semibold mb-4">{slide.subtitle}</h6>
                                  <ul className="list-unstyled">
                                    {slide.points.map((point, i) => (
                                      <li
                                        key={i}
                                        className="mb-2 d-flex align-items-start justify-content-center justify-content-md-start"
                                      >
                                        <i className="fas fa-check-circle text-warning me-2 mt-1"></i>
                                        <span className="text-dark">{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <div className="mt-4 text-end">
                                    <Button
                                      onClick={() => window.location.href = "/theaters"}
                                      className="rounded-3 px-4 py-2 fw-semibold dark-back"
                                    >
                                      <i className="fas fa-ticket-alt me-2" />
                                      Book Now
                                    </Button>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Carousel.Item>
                        ))}
                      </Carousel>

                      {/* Bottom Indicators */}
                      <div className="d-flex justify-content-center mt-4">
                        {whyUsSlides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelect(i)}
                            className={`carousel-indicator mx-1 rounded-circle ${index === i ? 'bg-warning' : 'bg-secondary'}`}
                            style={{
                              width: "12px",
                              height: "12px",
                              border: "none",
                              transition: "0.3s",
                            }}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </Container>

                  <style jsx>{`
        .carousel-indicator {
          opacity: 0.6;
          cursor: pointer;
        }
        .carousel-indicator.bg-primary {
          opacity: 1;
        }
      `}</style>
                </section>


                <section className="py-5 bg-white position-relative">
                  <Container>
                    <h2 className="text-center fw-bold mb-3 dark-text">
                      What Our Customers Say
                    </h2>
                    <p className="text-center mb-5 fs-5 light-text">
                      Real stories. Real celebrations. Real magic at Binge N Joy.
                    </p>

                    {(() => {


                      // Dynamically group slides based on screen width
                      const screenWidth = window.innerWidth;
                      let groupSize = 3;
                      if (screenWidth < 768) groupSize = 1;
                      else if (screenWidth < 992) groupSize = 2;

                      const chunkArray = (arr, size) =>
                        arr.reduce(
                          (acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc),
                          []
                        );

                      const slides = chunkArray(testimonials, groupSize);

                      return (
                        <Carousel controls interval={5000} pause="hover" fade={false} wrap>
                          {slides.map((group, idx) => (
                            <Carousel.Item key={idx}>
                              <Row className="g-4 justify-content-center">
                                {group.map((review, index) => (
                                  <Col lg={4} md={6} sm={12} key={index}>
                                    <div
                                      className="review-card position-relative rounded-4 overflow-hidden shadow mb-4"
                                      style={{ height: "400px" }}
                                    >
                                      <img
                                        src={review.image}
                                        alt="Review background"
                                        className="w-100 h-100 object-fit-cover"
                                        style={{ filter: "brightness(70%)" }}
                                      />

                                      {/* Bottom overlay card */}
                                      <div
                                        className="position-absolute bottom-0 start-50 translate-middle-x p-4 rounded-top-4"
                                        style={{
                                          height: "auto",
                                          minHeight: "45%",
                                          width: "90%",
                                          backgroundColor: "rgba(233, 220, 255, 0.95)",
                                          backdropFilter: "blur(4px)",
                                        }}
                                      >
                                        <div className="d-flex align-items-center mb-3">
                                          <img
                                            src={review.avatar}
                                            alt="avatar"
                                            className="rounded-circle me-3 border-2 border-light"
                                            width="60"
                                            height="60"
                                          />
                                          <div>
                                            <h6 className="mb-0 fw-bold text-dark">
                                              {review.name}
                                            </h6>
                                            <small className="text-dark">
                                              {review.location}
                                            </small>
                                          </div>
                                        </div>

                                        <div className="text-warning mb-2 fs-5">
                                          {"★".repeat(review.rating)}
                                          {"☆".repeat(5 - review.rating)}
                                        </div>

                                        <p className="mb-2 text-dark" style={{ fontSize: "0.9rem" }}>
                                          {review.description}
                                        </p>

                                        {review.occasion && (
                                          <p
                                            className="mb-0 text-dark"
                                            style={{ fontSize: "0.85rem" }}
                                          >
                                            <strong>Occasion:</strong> {review.occasion}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </Col>
                                ))}
                              </Row>
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      );
                    })()}

                    <style jsx>{`
      .carousel-indicators {
        display: none !important;
      }
    `}</style>
                  </Container>
                </section>




                {/* Gallery */}
                <section className="pb-3 lighter-back">
                  <div className="container-md">
                    <div className="section-wraper row d-flex align-items-center">
                      <div className="col-md-12 section-header mb-0 mt-3">
                        <h2 className="text-center fw-bold mb-3 dark-text">Gallery</h2>
                        <p className="text-center mb-5 fs-5 light-text">See how our guests made memories at Binge N Joy.</p>
                      </div>

                      <div className="row justify-content-center">
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
                              <div className="row mb-2">
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

                      {/* View All Button - Centered at Bottom */}
                      <div className="col-md-12 text-center mt-3 mb-4">
                        <a
                          href="/gallery"
                          className="btn btn-primary fw-bold dark-back"
                        >
                          View Gallery<i className="bi bi-arrow-right ms-2"></i>

                        </a>
                      </div>
                    </div>
                  </div>
                </section>



                <section className="py-5 bg-white">
                  <div className="container">
                    <div className="row justify-content-between align-items-center rounded-4 p-4 shadow lighter-back">
                      {/* Text Column */}
                      <div className="col-12 col-md-8 mb-3 mb-md-0">
                        <h4 className="fw-bold dark-text mb-2">Follow Our Journey on Instagram</h4>
                        <p className="text-muted m-0">Get inspired by our latest creations and behind-the-scenes moments.</p>
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


                {testimonials.length > 0 && (
                  <section
                    className="py-5 position-relative text-dark"
                    style={{ backgroundColor: "#E6D8F5" }}
                  >
                    <Container fluid="lg">
                      <Row className="align-items-center">
                        {/* LEFT SECTION */}
                        <Col xs={12} lg={3} className="text-center text-lg-start mb-4 mb-lg-0">
                          <h2 className="fw-bold mt-3 dark-text">Testimonials</h2>
                          <p className="light-text fs-6">
                            Real stories. Real celebrations. Real magic at Binge N Joy.
                          </p>
                        </Col>

                        {/* RIGHT SECTION */}
                        <Col xs={12} lg={9}>
                          <div className="d-flex flex-wrap flex-lg-nowrap align-items-start justify-content-center gap-3">
                            {/* Side Thumbnails */}
                            {testimonials
                              .filter((item) => selected && item.videoId !== selected.videoId)
                              .map((user, idx) => (
                                <div
                                  key={idx}
                                  className="side-card d-flex align-items-center justify-content-center rounded shadow"
                                  style={{
                                    width: "70px",
                                    height: "200px",
                                    backgroundImage: `url(https://api.carnivalcastle.com/${user.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    cursor: "pointer",
                                    position: "relative",
                                  }}
                                  onClick={() => setSelected(user)}
                                >
                                  <h6 className="vertical-text text-white fw-bold m-0">
                                    {user.name}
                                  </h6>
                                  <div className="overlay"></div>
                                </div>
                              ))}

                            {/* Main Video */}
                            {selected && (
                              <div
                                className="main-video-card position-relative rounded shadow overflow-hidden"
                                style={{
                                  width: "100%",
                                  maxWidth: "400px",
                                  height: "300px",
                                  backgroundColor: "#000",
                                }}
                              >
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={`https://www.youtube.com/embed/${selected.videoId}?autoplay=1&mute=1`}
                                  title={selected.name}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>

                                {/* Label */}
                                <div className="position-absolute bottom-0 start-0 end-0 p-2 p-md-3">
                                  <div className="bg-white d-inline-block px-2 px-md-3 py-1 py-md-2 rounded-4 w-100 shadow-sm">
                                    <strong className="dark-text">{selected.name}</strong>
                                    <br />
                                    <small className="text-dark">{selected.role}</small>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Container>

                    {/* Styles */}
                    <style jsx>{`
      .side-card {
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease;
      }

      .side-card:hover {
        transform: scale(1.05);
      }

      .vertical-text {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg);
        font-size: 0.85rem;
        z-index: 2;
        text-align: center;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 1;
      }

      .main-video-card iframe {
        border: none;
      }

      @media (max-width: 992px) {
        .side-card {
          width: 60px;
          height: 150px;
        }

        .main-video-card {
          height: 250px;
        }
      }

      @media (max-width: 576px) {
        .side-card {
          width: 50px;
          height: 120px;
        }

        .main-video-card {
          height: 200px;
        }
      }
    `}</style>
                  </section>
                )}





                {/* FAQS */}
                <section className="pb-3 pb-3 bg-light">
                  <div className="container">
                    <div className="section-wraper row d-flex align-items-center">
                      <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-8">
                          <div className="section-title text-center mb-5 pt-3">
                            <h2 className="dark-text">
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
                      {/* Book Now Button */}
                      <div className="col-md-12 text-center mt-3 mb-4">
                        <a
                          href="/theaters"
                          className="btn btn-primary fw-bold dark-back"
                        >
                          Book Now

                        </a>
                      </div>
                    </div>
                  </div>
                </section>





                {/* ENQUIRY */}
                {/* <section className="pt-5 pb-5 p-relative" style={{ backgroundColor: "#E9DCFF" }}>
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
                </section> */}


                {/*  Your modal component */}
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
