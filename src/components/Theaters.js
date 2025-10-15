import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Calendar } from "primereact/calendar";
import Modal from "react-bootstrap/Modal";
import Footer from "./Footer";
import Header from "./Header";
import { URLS } from "../Url";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faPhone,
  faEnvelope,
  faCalendarAlt,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import { Carousel } from 'react-bootstrap';
import { FaBirthdayCake, FaCar, FaParking, FaPhone } from "react-icons/fa";

function Theaters() {
  const [theaters, setTheaters] = useState([]);
  const [allTheatersByLocation, setAllTheatersByLocation] = useState({}); // For "Other Locations"
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [modalPop, setModalPop] = useState(false);
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [expandedCards, setExpandedCards] = useState({});
  const toggleView1 = (cardIndex) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }));
  };
  const [date, setDate] = useState(getTodayDateString());
  const [activeshow, setActiveshow] = useState([]);
  const [activeSlot, setActiveSlot] = useState(null);
  const [nintymin, setnintymin] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [locationModalOpen, setLocationModalOpen] = useState(true);
  const [comingSoonModalOpen, setComingSoonModalOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [activeIndices, setActiveIndices] = useState({});
  const BaseUrl = "https://api.carnivalcastle.com/";
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const dd = dateObj.getDate().toString().padStart(2, "0");
    const mm = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = dateObj.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };
  const formattedDateString = formatDate(date);

  const handleLocationSelect = async (address) => {
    console.log("Book Now clicked:", address);
    setLocation(address);
    if (address._id) {
      setLocationModalOpen(false);
      await fetchTheatersByAddressId(address._id, date);
      await fetchAllTheatersGroupedByLocation(date); // Fetch all for "Other Locations"
    } else {
      setLocationModalOpen(false);
      setComingSoonModalOpen(true);
    }
  };

  const fetchTheatersByAddressId = async (addressId, selectedDate = date) => {
    setIsLoading(false);
    try {
      if (!addressId) {
        console.warn("No addressId provided. Skipping theater filtering.");
        setTheaters([]);
        return;
      }
      const formattedDate = formatDate(selectedDate);
      const res = await axios.post(
        "https://api.carnivalcastle.com/v1/carnivalApi/web/getalltheatres/forweb",
        { slotDate: formattedDate }
      );
      if (res.data && res.data.success) {
        const filteredTheaters = res.data.theatres.filter(theater => {
          const theaterAddressId = typeof theater.address === 'string'
            ? theater.address
            : theater.address?._id;
          return theaterAddressId?.toString() === addressId?.toString();
        });
        const now = new Date();
        const processedTheaters = filteredTheaters.map(theater => {
          const processedSlots = (theater.availableSlots || []).map(slot => {
            const [slotHours, slotMinutes] = slot.fromTime.split(':').map(Number);
            const [endHours, endMinutes] = slot.toTime.split(':').map(Number);
            const slotStart = new Date(selectedDate);
            slotStart.setHours(slotHours, slotMinutes, 0, 0);
            const slotEnd = new Date(selectedDate);
            slotEnd.setHours(endHours, endMinutes, 0, 0);
            const currentSelectedDate = new Date(selectedDate);
            const isToday =
              currentSelectedDate.getFullYear() === now.getFullYear() &&
              currentSelectedDate.getMonth() === now.getMonth() &&
              currentSelectedDate.getDate() === now.getDate();
            const isBooked = slot.isBooked || false;
            const isPast = isToday && now > slotEnd;
            const isAlmostOver = isToday && !isPast && (slotEnd - now <= 10 * 60 * 1000);
            const isDisabled = isBooked || isPast || isAlmostOver;
            return {
              ...slot,
              isBooked,
              isPast,
              isAlmostOver,
              isDisabled
            };
          });
          return {
            ...theater,
            availableSlots: processedSlots,
          };
        });
        setTheaters(processedTheaters);
        const initialIndices = {};
        processedTheaters.forEach((_, index) => {
          initialIndices[index] = 0;
        });
        setActiveIndices(initialIndices);
      } else {
        setTheaters([]);
      }
    } catch (error) {
      console.error("Error fetching theaters:", error);
      setTheaters([]);
      toast.error("Failed to fetch theaters. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // NEW: Fetch ALL theaters grouped by location for "Other Locations" section
  const fetchAllTheatersGroupedByLocation = async (selectedDate = date) => {
    try {
      const formattedDate = formatDate(selectedDate);
      const res = await axios.post(
        "https://api.carnivalcastle.com/v1/carnivalApi/web/getalltheatres/forweb",
        { slotDate: formattedDate }
      );
      if (res.data && res.data.success) {
        const now = new Date();
        const processedTheaters = res.data.theatres.map(theater => {
          const processedSlots = (theater.availableSlots || []).map(slot => {
            const [slotHours, slotMinutes] = slot.fromTime.split(':').map(Number);
            const [endHours, endMinutes] = slot.toTime.split(':').map(Number);
            const slotStart = new Date(selectedDate);
            slotStart.setHours(slotHours, slotMinutes, 0, 0);
            const slotEnd = new Date(selectedDate);
            slotEnd.setHours(endHours, endMinutes, 0, 0);
            const currentSelectedDate = new Date(selectedDate);
            const isToday =
              currentSelectedDate.getFullYear() === now.getFullYear() &&
              currentSelectedDate.getMonth() === now.getMonth() &&
              currentSelectedDate.getDate() === now.getDate();
            const isBooked = slot.isBooked || false;
            const isPast = isToday && now > slotEnd;
            const isAlmostOver = isToday && !isPast && (slotEnd - now <= 10 * 60 * 1000);
            const isDisabled = isBooked || isPast || isAlmostOver;
            return {
              ...slot,
              isBooked,
              isPast,
              isAlmostOver,
              isDisabled
            };
          });
          return {
            ...theater,
            availableSlots: processedSlots,
          };
        });

        // Group by address
        const grouped = {};
        processedTheaters.forEach(theater => {
          const addrId = typeof theater.address === 'string' ? theater.address : theater.address?._id;
          if (!grouped[addrId]) {
            grouped[addrId] = {
              addressObj: theater.address,
              theaters: []
            };
          }
          grouped[addrId].theaters.push(theater);
        });

        setAllTheatersByLocation(grouped);
      }
    } catch (error) {
      console.error("Error fetching all theaters for other locations:", error);
    }
  };

  const handleCarouselSelect = (selectedIndex, theaterIndex) => {
    setActiveIndices(prev => ({
      ...prev,
      [theaterIndex]: selectedIndex
    }));
  };

  const closeComingSoonModal = () => {
    setComingSoonModalOpen(false);
    navigate(-1);
  };

  const databyid = (data) => {
    axios.post(URLS.GetUnicId, {}, {}).then((res) => {
      if (res.status === 200) {
        sessionStorage.setItem("UserId", res.data.userId);
        sessionStorage.setItem("theaterId", data._id);
        sessionStorage.setItem("theatreName", data.name);
        sessionStorage.setItem("theatrePrices", data.offerPrice);
        sessionStorage.setItem("date", formattedDateString);
        window.location.href = "/BookingDetails";
      }
    });
  };

  useEffect(() => {
    setDate(getTodayDateString());
    fetchAddresses();
    const itemsToRemove = [
      "bookingid", "specialPersonName", "TotalPrice", "TotalPrice2", "addons",
      "addonsData", "adonsJSON", "userDetails", "theaterName", "theaterId",
      "subtotal", "slot", "selectedOccasion", "planType", "paymentkey",
      "orderId", "occprice", "occasionName", "occasion", "invoicePath",
      "extraPersonprice", "extraPersonperprice", "extraAddedPersonsForTheatre",
      "date", "data", "coupondis", "cakeprice", "advancePayment", "countPeople",
      "theaterPrice", "theatrePrices", "comboAdvancePayment", "maxPeople"
    ];
    itemsToRemove.forEach(item => sessionStorage.removeItem(item));
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        "https://api.carnivalcastle.com/v1/carnivalApi/admin/address/alladdress"
      );
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

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleView = () => {
    setIsExpanded(!isExpanded);
  };

  const [form, setform] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    description: "",
    eventName: "",
  });
  const [lgShow, setLgShow] = useState(false);
  const modelshow = () => {
    setLgShow(!false);
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
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    if (!selectedDate) {
      console.error("No date selected");
      return;
    }
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDateObj < today) {
      toast.error("Please select today's or a future date");
      return;
    }
    setDate(selectedDate);
    const formattedDate = formatDate(selectedDate);
    sessionStorage.setItem("date", formattedDate);
    if (location && location._id) {
      await fetchTheatersByAddressId(location._id, selectedDate);
      await fetchAllTheatersGroupedByLocation(selectedDate);
    }
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
          setLgShow(false);
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

  const [Contact, setContact] = useState([]);
  useEffect(() => {
    GetFooterData();
    sessionStorage.setItem("date", formattedDateString);
  }, []);
  const GetFooterData = () => {
    axios.post(URLS.GetFooter, {}, {}).then((res) => {
      if (res.status === 200) {
        setContact(res.data.contactus || []);
      }
    });
  };

  const cardHeaderStyle = {
    position: "relative",
    padding: "10px",
  };

  const convertTo12HourFormat = (time24) => {
    const [hoursStr, minutes] = time24.split(":");
    const hours = parseInt(hoursStr, 10);
    const hours12 = hours % 12 === 0 ? 12 : hours % 12;
    const period = hours < 12 ? "AM" : "PM";
    return `${hours12}:${minutes.padStart(2, "0")} ${period}`;
  };

  const calculateDuration = (fromTime, toTime) => {
    const [fromH, fromM] = fromTime.split(":").map(Number);
    const [toH, toM] = toTime.split(":").map(Number);
    let start = fromH * 60 + fromM;
    let end = toH * 60 + toM;
    if (end <= start) {
      end += 24 * 60;
    }
    const diffMinutes = end - start;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}:${minutes === 0 ? "00" : minutes} hr`;
  };

  const handleSlot = (e, data, index) => {
    e.preventDefault();
    if (!data.isBooked) {
      setSelectedSlot((prevState) => ({
        ...prevState,
        [index]: data,
      }));
    }
    setActiveshow(data);
    setActiveSlot(data);
    const fromTime12 = convertTo12HourFormat(data.fromTime);
    const toTime12 = convertTo12HourFormat(data.toTime);
    sessionStorage.setItem("slot", `${fromTime12} - ${toTime12}`);
    const selectedValue = (e.target.value || `${fromTime12} / ${toTime12}`).trim();
    console.log("Selected Value:", selectedValue);
    const durationInMinutes = calculateSlotDuration(data.fromTime, data.toTime);
    setnintymin(durationInMinutes || 0);
    sessionStorage.setItem("nintymin", durationInMinutes || 0);
    if (durationInMinutes === 90) {
      setModalPop(true);
    }
  };

  const calculateSlotDuration = (fromTime, toTime) => {
    const fromDate = new Date(`1970-01-01T${fromTime}:00`);
    const toDate = new Date(`1970-01-01T${toTime}:00`);
    const durationInMilliseconds = toDate - fromDate;
    return durationInMilliseconds / (1000 * 60);
  };

  const handleclose = () => {
    setModalPop(false);
  };

  const handleBasicPlan = (data, i) => {
    const price = nintymin === 90 ? data.oneandhalfslotPrice : data.offerPrice;
    sessionStorage.setItem("theaterId", data._id);
    sessionStorage.setItem("maxPeople", data.maxPeople);
    sessionStorage.setItem(
      "extraPersonprice",
      nintymin === 90
        ? data.onehalfanhourExtraPersonPrice || 0
        : data.extraPersonprice
    );
    sessionStorage.setItem("theaterName", data.name);
    sessionStorage.setItem("theatermaxSeating", data.maxSeating);
    sessionStorage.setItem("theaterPrice", price);
    sessionStorage.setItem("theatrePrices", price);
    sessionStorage.setItem("TotalPrice", price);
    sessionStorage.setItem("subtotal", price);
    sessionStorage.setItem("cartCakes", JSON.stringify([]));
    sessionStorage.setItem("selectedOccasion", JSON.stringify([]));
    sessionStorage.setItem("occprice", "0");
    sessionStorage.setItem("cakeprice", "0");
    sessionStorage.setItem("cartcakeslength", "500");
    sessionStorage.setItem("addons", "0");
    sessionStorage.setItem("coupondis", "0");
    sessionStorage.setItem("planType", "normal");
    navigate("/Basicplan");
  };

  // Helper to get address name by ID
  const getAddressNameById = (id) => {
    const addr = addresses.find(a => a._id === id);
    return addr ? `${addr.name}, ${addr.city}` : "Unknown Location";
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Best Surprise Party Places in Hyderabad | Private Theater</title>
        <meta
          name="description"
          content="Celebrate at Bing Enjoy Private Theatres in Hyderabad. Perfect for birthdays, anniversaries, & special events with custom decor, food & privacy. Book now!!"
        />
      </Helmet>
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
              style={{ height: "300px", color: "white" }}
              alt="Loading..."
            />
            <h6 style={{ color: "gold" }}>Loading...</h6>
          </div>
        </div>
      ) : (
        <div className="home-page indexsix">
          <Header />
          {locationModalOpen && (
            <div
              className="modal fade show"
              tabIndex="-1"
              style={{
                display: "block",
                backgroundColor: "#9D4DFF",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1050
              }}
              aria-modal="true"
              role="dialog"
            >
              <button
                className="btn position-absolute d-flex align-items-center justify-content-center"
                style={{
                  top: "16px",
                  left: "16px",
                  zIndex: 1060,
                  borderRadius: "8px",
                  padding: "6px 12px",
                  fontSize: "14px",
                  backgroundColor: "#C69FF4",
                  color: "#000",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                  border: "none"
                }}
                onClick={() => navigate('/')}
              >
                <i className="fas fa-arrow-left me-2"></i>
                <span className="d-none d-sm-inline fw-bold">Back</span>
              </button>
              <div className="text-center d-flex justify-content-center align-items-center mt-5">
                <div>
                  <h2 className="text-white">Choose your nearest location</h2>
                  <p className="text-white"><i>We’ve got the vibe, you bring the party.</i></p>
                </div>
              </div>
              <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div
                  className="modal-content p-3 p-md-4 lightdark-back"
                  style={{ border: "2px solid #E9DCFF", borderRadius: "12px" }}
                >
                  <h5 className="text-center mb-3 mb-md-4 fs-5 fs-md-4 text-white">Our Theatre Locations</h5>
                  <div className="row">
                    {addresses && addresses.length > 0 ? (
                      addresses.map((address, index) => (
                        <div className="col-12 col-md-4  d-flex" key={index}>
                          <div
                            className="card text-black shadow-lg bg-white d-flex flex-column w-100"
                            style={{
                              backgroundColor: "#E9DCFF",
                              borderRadius: "1rem",
                              overflow: "hidden",
                              border: "2px solid #E9DCFF",
                            }}
                          >
                            <div style={{ flexShrink: 0, position: "relative", padding: "15px" }}>
                              {address.image ? (
                                <>
                                  <img
                                    src={BaseUrl + address.image}
                                    alt={address.city}
                                    className="img-fluid"
                                    style={{
                                      width: "100%",
                                      objectFit: "cover",
                                      height: "250px",
                                      borderRadius: "15px",
                                    }}
                                  />
                                  <a
                                    href={address.addressLine2}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      position: "absolute",
                                      bottom: "20px",
                                      right: "20px",
                                      borderRadius: "50%",
                                      zIndex: 10,
                                      background: "white",
                                      padding: "5px",
                                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                    }}
                                    title="View on Google Maps"
                                  >
                                    <img
                                      src="https://bnbtplstorageaccount.blob.core.windows.net/googleicons/map (1).svg"
                                      alt="Google Maps"
                                      style={{ width: "50px", height: "50px" }}
                                    />
                                  </a>
                                </>
                              ) : (
                                <div
                                  className="d-flex align-items-center justify-content-center"
                                  style={{
                                    height: "250px",
                                    backgroundColor: "#444",
                                    fontSize: "3rem",
                                    borderRadius: "15px",
                                  }}
                                >
                                  <i className="bi bi-image text-dark"></i>
                                </div>
                              )}
                            </div>
                            <div className="card-body d-flex flex-column justify-content-between p-3" style={{ flex: 1 }}>
                              <div>
                                <h5 className="card-title fw-semibold mb-1 text-dark">
                                  <i className="fa-solid fa-map-location-dot me-2" style={{ color: "#000" }}></i>
                                  {address.name}, {address.city}
                                </h5>
                                {address.landmark && (
                                  <p className="mb-0 text-dark" style={{ fontSize: "0.9rem" }}>
                                    <i className="fa-solid fa-location-dot me-2" style={{ color: "#000" }}></i>
                                    {address.landmark}
                                  </p>
                                )}
                                <div className="mt-3 d-flex gap-2 flex-wrap text-center">
                                  <span
                                    className="badge rounded-pill  dark-text d-flex align-items-center"
                                    style={{ fontSize: "0.8rem", padding: "0.5em 1em", gap: "0.4em" }}
                                  >
                                    <FaBirthdayCake /> Cakes Available
                                  </span>
                                  <span
                                    className="badge rounded-pill  dark-text d-flex align-items-center"
                                    style={{ fontSize: "0.9rem", padding: "0.5em 1em", gap: "0.4em" }}
                                  >
                                    <FaCar /> Parking Available
                                  </span>
                                </div>
                              </div>
                              <button
                                className="btn light-back text-white w-100 mt-3"
                                onClick={() => handleLocationSelect(address)}
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center">
                        <p>No locations available at the moment.</p>
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <a
                      href="tel:+918977917555"
                      className="btn btn-lg light-back text-white d-inline-flex align-items-center gap-2"
                      style={{ width: "auto", textDecoration: "none" }}
                    >
                      <FaPhone /> Book Via Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          {comingSoonModalOpen && (
            <div
              className="modal fade show"
              tabIndex="-1"
              style={{
                display: "block",
                backgroundColor: "#E9DCFF",
              }}
              aria-modal="true"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div
                  className="modal-content p-4 lighter-back"
                  style={{
                    border: "2px solid #E9DCFF",
                    borderRadius: "12px",
                  }}
                >
                  <h5 className="text-center mb-3">Coming Soon</h5>
                  <p className="text-center" style={{ fontSize: "1rem" }}>
                    We're launching in more locations soon. Stay tuned!
                  </p>
                  <div className="text-center mt-4">
                    <button
                      className="btn btn-danger px-4"
                      onClick={closeComingSoonModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {location && (
            <>
              <main className="main-wrapper">
                <section
                  id="parallax"
                  className="slider-area breadcrumb-area d-flex align-items-center justify-content-center fix light-back"
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                        <div className="breadcrumb-wrap text-center">
                          <div className="breadcrumb-title mb-30 text-white">
                            <h1 style={{ marginTop: "20px" }}>
                              Choose your dream theatre setup in {location.name}
                            </h1>
                          </div>
                          <p className="text-light"><i>From royal vibes to romantic corners - pick your perfect match!</i></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section
                  className="shop-area pt-0 pb-5 p-relative light-back"
                  style={{ background: "#F8EBFF" }}
                >
                  <div className="container-md">
                    <div className="row mb-3">
                      <div className="col-12">
                        <div
                          className="p-3 rounded shadow-sm"
                          style={{
                            backgroundColor: "#FAF9F7",
                            border: "1px solid #E0E0E0",
                            borderRadius: "8px",
                            maxWidth: "500px",
                            margin: "0 auto",
                          }}
                        >
                          <label className="fw-bold text-dark mb-2" style={{ fontSize: "18px" }}>
                            Select Your Date
                          </label>
                          <div className="d-flex gap-2">
                            <div className="input-group">
                              <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-calendar-event"></i>
                              </span>
                              <input
                                type="date"
                                id="buttondisplay"
                                name="theaterdate"
                                className={`form-control border-start-0 ${isDisabled ? "bg-light" : ""}`}
                                style={{ borderLeft: "none" }}
                                disabled={isDisabled}
                                value={date}
                                min={getTodayDateString()}
                                onChange={handleDateChange}
                              />
                            </div>
                          </div>
                          <p className="mt-2 mb-0" style={{ fontStyle: "italic", fontSize: "14px", color: "#555" }}>
                            <i className="fa-solid fa-burger light-text"></i> Food and Beverages can be ordered at theater
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="container">
                      <div className="row">
                        {theaters && theaters.length > 0 ? (
                          theaters.map((data, i) => {
                            const isBookNowActive = selectedSlot[i] !== undefined;
                            const colors = ["danger", "success", "warning", "primary"];
                            const bgColor = colors[i % colors.length];
                            const theaterCapacities = {
                              "Iris Theatre": 20,
                              "Joy Theatre": 20,
                              "Ruby Theatre": 2,
                              "Vibe Theatres": 15,
                              "Carnival Den": 15,
                              "Amora Theatre": 6,
                            };

                            // Get capacity based on name, fallback to data.maxPeople if not found
                            const maxPeople = theaterCapacities[data.name] || data.maxPeople;

                            return (
                              <div
                                className="col-12 col-sm-6 col-md-4 mb-4 d-flex"
                                key={i}
                              >
                                <div
                                  className="card rounded-5 bg-white shadow-lg text-dark flex-fill"
                                  style={{
                                    minHeight: "820px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <div style={cardHeaderStyle}>
                                    <div
                                      className="course-img"
                                      style={{ position: "relative" }}
                                    >
                                      <div className="doc-img">
                                        <Carousel
                                          interval={3000}
                                          controls={false}
                                          activeIndex={activeIndices[i] || 0}
                                          onSelect={(selectedIndex) => handleCarouselSelect(selectedIndex, i)}
                                        >
                                          {data.image &&
                                            data.image.map((img, idx) => (
                                              <Carousel.Item key={idx}>
                                                <div style={{ position: "relative" }}>
                                                  <span
                                                    className={`badge bg-${bgColor} text-white`}
                                                    style={{
                                                      position: "absolute",
                                                      top: "10px",
                                                      right: "10px",
                                                      zIndex: 2,
                                                      fontSize: "0.75rem",
                                                    }}
                                                  >
                                                    {data.availableSlotsCount > 0
                                                      ? `${data.availableSlotsCount} slots available`
                                                      : "0 slots available"}
                                                  </span>
                                                  <span
                                                    style={{
                                                      position: "absolute",
                                                      bottom: "10px",
                                                      left: "10px",
                                                      zIndex: 2,
                                                      fontSize: "0.75rem",
                                                    }}
                                                  >
                                                    <a
                                                      href={data.link}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="btn btn-sm btn-light ms-2 fw-bold"
                                                    >
                                                      <i className="fa-brands fa-youtube text-danger fa-xl"></i>
                                                      Watch Now
                                                    </a>
                                                  </span>
                                                  <img
                                                    src={BaseUrl + img}
                                                    alt=""
                                                    className="img-fluid"
                                                    style={{
                                                      height: "250px",
                                                      borderRadius: "10px",
                                                      width: "100%",
                                                      cursor: "pointer",
                                                      objectFit: "cover",
                                                    }}
                                                  />
                                                </div>
                                              </Carousel.Item>
                                            ))}
                                          {data.video && (
                                            <Carousel.Item>
                                              <div style={{ position: "relative" }}>
                                                <span
                                                  className={`badge bg-${bgColor} text-white`}
                                                  style={{
                                                    position: "absolute",
                                                    top: "10px",
                                                    right: "10px",
                                                    zIndex: 2,
                                                    fontSize: "0.75rem",
                                                  }}
                                                >
                                                  {data.availableSlotsCount > 0
                                                    ? `${data.availableSlotsCount} slots available`
                                                    : "0 slots available"}
                                                </span>
                                                <video
                                                  src={URLS.Base + data.video}
                                                  className="img-fluid video-mobile"
                                                  style={{
                                                    height: "250px",
                                                    borderRadius: "10px",
                                                    width: "100%",
                                                    cursor: "pointer",
                                                    display: "block",
                                                    objectFit: "cover",
                                                  }}
                                                  autoPlay
                                                  loop
                                                  muted
                                                  preload="auto"
                                                />
                                              </div>
                                            </Carousel.Item>
                                          )}
                                        </Carousel>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                      <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div>
                                          <h5
                                            className="card-title m-0 dark-text"
                                            style={{ fontSize: "1.25rem", fontWeight: "700" }}
                                          >
                                            {data.name}
                                          </h5>
                                          {location && (
                                            <p className="fs-7 ">
                                              <strong>
                                                <i className="fa-solid fa-location-dot " style={{ color: "#000" }}></i>{location.name}, {location.city}
                                              </strong>
                                            </p>
                                          )}
                                        </div>
                                        <div>
                                          <p
                                            className="card-price mb-2 dark-text"
                                            style={{ fontFamily: "'Fraunces', serif" }}
                                          >
                                            <span style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                                              ₹{" "}
                                              {selectedSlot[i]
                                                ? selectedSlot[i].duration === "1:30 hr"
                                                  ? data.oneandhalfslotPrice
                                                  : selectedSlot[i].offerPrice ?? data.offerPrice
                                                : data.offerPrice}
                                              /-
                                            </span>
                                            <span style={{ fontSize: "0.9rem", fontWeight: 400, marginLeft: "0.5rem" }}>
                                              {selectedSlot[i]
                                                ? `for upto ${data.maxPeople} ${data.maxPeople > 1 ? "people" : "person"}`
                                                : `for upto ${data.maxPeople} ${data.maxPeople > 1 ? "people" : "person"}`}
                                            </span>
                                          </p>
                                        </div>

                                      </div>
                                      <div className="row align-items-center mb-2 text-center text-md-start g-2">
                                        <div className="col-6 col-sm-6">
                                          <p
                                            className="card-details mb-2 light-text"
                                            style={{
                                              fontSize: "0.85rem",
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <span
                                              className="fw-semibold px-3 py-1 rounded-pill dark-text d-inline-block"
                                              style={{ whiteSpace: "nowrap" }}
                                            >
                                              <i className="bi bi-currency-dollar me-1"></i>{" "}
                                              Extra Person: ₹
                                              {selectedSlot[i]
                                                ? selectedSlot[i].duration === "1:30 hr"
                                                  ? data.onehalfanhourExtraPersonPrice
                                                  : data.extraPersonprice
                                                : data.extraPersonprice}
                                              /-

                                            </span>
                                          </p>
                                        </div>
                                        <div className="col-6 col-sm-6">
                                          <p
                                            className="card-details mb-2 light-text"
                                            style={{
                                              fontSize: "0.85rem",
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <span
                                              className="fw-semibold px-3 py-1 rounded-pill dark-text d-inline-block"
                                              style={{ whiteSpace: "nowrap" }}
                                            >
                                              <i className="bi bi-person-fill me-1"></i> Max {maxPeople} People
                                            </span>

                                          </p>
                                        </div>
                                      </div>
                                      <p
                                        className="card-details  light-text"
                                        style={{ fontSize: "0.75rem" }}
                                      >
                                        <span className="fw-bold">
                                          <i className="bi bi-tv-fill"></i> Features
                                        </span>
                                        <div className="row mt-1">
                                          {(expandedCards[i] ? data.features : data.features.slice(0, 4)).map(
                                            (feature, index) => (
                                              <div key={index} className="col-6 mb-1 d-flex align-items-start">
                                                <i
                                                  className="bi bi-star-fill"
                                                  style={{
                                                    fontSize: "0.65rem",
                                                    color: "#40008C",
                                                    marginRight: "6px",
                                                    marginTop: "2px",
                                                  }}
                                                ></i>
                                                <span>{feature}</span>
                                              </div>
                                            )
                                          )}
                                        </div>
                                        {data.features.length > 4 && (
                                          <div
                                            onClick={() => toggleView1(i)}
                                            style={{
                                              cursor: "pointer",
                                              color: "#40008C",
                                              textDecoration: "underline",
                                              fontSize: "0.75rem",
                                              marginTop: "4px",
                                            }}
                                          >
                                            {expandedCards[i] ? "View Less" : "View More"}
                                          </div>
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="slot-selection mb-3">
                                        <p
                                          className="slot-title mb-2 dark-text"
                                          style={{ fontSize: "0.9rem", fontWeight: "600" }}
                                        >
                                          Select Time Slot
                                        </p>
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "0.6rem",
                                            overflowX: "auto",
                                            paddingBottom: "6px",
                                          }}
                                        >
                                          {data.availableSlots &&
                                            data.availableSlots.map((slot, index) => {
                                              const fromTime12 = convertTo12HourFormat(slot.fromTime);
                                              const toTime12 = convertTo12HourFormat(slot.toTime);
                                              const duration = calculateDuration(slot.fromTime, slot.toTime);
                                              const isSelected =
                                                selectedSlot[i] && selectedSlot[i]._id === slot._id;
                                              let discount = null;
                                              if (
                                                duration === "1:30 hr" &&
                                                data.offerPrice &&
                                                data.oneandhalfslotPrice
                                              ) {
                                                discount = data.offerPrice - data.oneandhalfslotPrice;
                                              }
                                              return (
                                                <div
                                                  key={index}
                                                  style={{
                                                    flex: "0 0 auto",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  <button
                                                    className="btn"
                                                    onClick={(e) => handleSlot(e, { ...slot, duration }, i)}
                                                    style={{
                                                      minWidth: "50px",
                                                      height: "60px",
                                                      padding: "0px 0px",
                                                      fontSize: "0.7rem",
                                                      fontWeight: "500",
                                                      lineHeight: "1.2",
                                                      borderRadius: "8px",
                                                      border: isSelected ? "2px solid #40008C" : "1px solid #ccc",
                                                      backgroundColor: slot.isBooked
                                                        ? "#f1f1f1"
                                                        : isSelected
                                                          ? "#40008C"
                                                          : "#fff",
                                                      color: slot.isBooked
                                                        ? "#888"
                                                        : isSelected
                                                          ? "#fff"
                                                          : "#000",
                                                      textDecoration: slot.isBooked ? "line-through" : "none",
                                                      cursor: slot.isBooked ? "not-allowed" : "pointer",
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                    }}
                                                    disabled={slot.isBooked}
                                                  >
                                                    <span>{fromTime12}</span>-
                                                    <span>{toTime12}</span>
                                                  </button>
                                                  {discount !== null && !slot.isBooked && (
                                                    <div
                                                      style={{
                                                        fontSize: "0.65rem",
                                                        color: "#28a745",
                                                        marginTop: "4px",
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      Rs {discount} less
                                                    </div>
                                                  )}
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                      {selectedSlot[i] ? (
                                        <div className="mt-3">
                                          <div
                                            style={{
                                              fontSize: "1.2rem",
                                              fontWeight: "700",
                                              color: "#000",
                                            }}
                                          >
                                            ₹
                                            {selectedSlot[i].duration === "1:30 hr"
                                              ? data.oneandhalfslotPrice
                                              : selectedSlot[i].offerPrice ?? data.offerPrice}
                                            <span style={{ fontSize: "0.85rem", fontWeight: "500" }}>
                                              {" "}
                                              for up to {data.maxPeople} people
                                            </span>
                                          </div>
                                          <div
                                            style={{
                                              fontSize: "0.8rem",
                                              color: "#666",
                                              marginTop: "2px",
                                            }}
                                          >
                                            Additional ₹
                                            {selectedSlot[i]
                                              ? selectedSlot[i].duration === "1:30 hr"
                                                ? data.onehalfanhourExtraPersonPrice
                                                : data.extraPersonprice
                                              : data.extraPersonprice}
                                            /- per person after {data.maxPeople} people

                                          </div>
                                        </div>
                                      ) : (
                                        <div
                                          className="mt-3"
                                          style={{ fontSize: "0.8rem", color: "#666" }}
                                        >
                                          Select a slot to check price
                                        </div>
                                      )}
                                      <div className="col-12 mt-3">
                                        <button
                                          disabled={!isBookNowActive}
                                          onClick={() => handleBasicPlan(data, i)}
                                          className="btn"
                                          style={{
                                            width: "100%",
                                            color: "white",
                                            border: "none",
                                            fontWeight: "600",
                                            borderRadius: "8px",
                                            padding: "10px",
                                            backgroundColor: isBookNowActive ? "#40008C" : "#A88FC7",
                                          }}
                                        >
                                          Book Now
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="col-12 text-center">
                            <p>No theaters available for the selected location and date.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* ===== NEW SECTION: Theaters in Other Locations ===== */}
                {location && Object.keys(allTheatersByLocation).length > 0 && (
                  <section className="shop-area pt-5 pb-5 p-relative light-back" style={{ background: "#FFF9F0" }}>
                    <div className="container">
                      <h3 className="text-center mb-4" style={{ color: "#fff" }}>Theaters in Other Locations</h3>
                      {Object.entries(allTheatersByLocation).map(([addrId, group]) => {
                        // Skip current location
                        if (addrId === location._id) return null;

                        const locationName = getAddressNameById(addrId);
                        return (
                          <div key={addrId} className="mb-5">
                            <h4 className="mb-3" style={{ borderBottom: "2px solid #E9DCFF", paddingBottom: "8px", color: "#fff" }}>
                              {locationName}
                            </h4>
                            <div className="row">
                              {group.theaters && group.theaters.length > 0 ? (
                                group.theaters.map((data, i) => {
                                  const isBookNowActive = selectedSlot[i] !== undefined;
                                  const colors = ["danger", "success", "warning", "primary"];
                                  const bgColor = colors[i % colors.length];
                                  const theaterCapacities = {
                                    "Iris Theatre": 20,
                                    "Joy Theatre": 20,
                                    "Ruby Theatre": 2,
                                    "Vibe Theatres": 15,
                                    "Carnival Den": 15,
                                    "Amora Theatre": 6,
                                  };

                                  // Get capacity based on name, fallback to data.maxPeople if not found
                                  const maxPeople = theaterCapacities[data.name] || data.maxPeople;

                                  return (
                                    <div
                                      className="col-12 col-sm-6 col-md-4 mb-4 d-flex"
                                      key={i}
                                    >
                                      <div
                                        className="card rounded-5 bg-white shadow-lg text-dark flex-fill"
                                        style={{
                                          minHeight: "820px",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <div style={cardHeaderStyle}>
                                          <div
                                            className="course-img"
                                            style={{ position: "relative" }}
                                          >
                                            <div className="doc-img">
                                              <Carousel
                                                interval={3000}
                                                controls={false}
                                                activeIndex={activeIndices[i] || 0}
                                                onSelect={(selectedIndex) => handleCarouselSelect(selectedIndex, i)}
                                              >
                                                {data.image &&
                                                  data.image.map((img, idx) => (
                                                    <Carousel.Item key={idx}>
                                                      <div style={{ position: "relative" }}>
                                                        <span
                                                          className={`badge bg-${bgColor} text-white`}
                                                          style={{
                                                            position: "absolute",
                                                            top: "10px",
                                                            right: "10px",
                                                            zIndex: 2,
                                                            fontSize: "0.75rem",
                                                          }}
                                                        >
                                                          {data.availableSlotsCount > 0
                                                            ? `${data.availableSlotsCount} slots available`
                                                            : "0 slots available"}
                                                        </span>
                                                        <span
                                                          style={{
                                                            position: "absolute",
                                                            bottom: "10px",
                                                            left: "10px",
                                                            zIndex: 2,
                                                            fontSize: "0.75rem",
                                                          }}
                                                        >
                                                          <a
                                                            href={data.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-sm btn-light ms-2 fw-bold"
                                                          >
                                                            <i className="fa-brands fa-youtube text-danger fa-xl"></i>
                                                            Watch Now
                                                          </a>
                                                        </span>
                                                        <img
                                                          src={BaseUrl + img}
                                                          alt=""
                                                          className="img-fluid"
                                                          style={{
                                                            height: "250px",
                                                            borderRadius: "10px",
                                                            width: "100%",
                                                            cursor: "pointer",
                                                            objectFit: "cover",
                                                          }}
                                                        />
                                                      </div>
                                                    </Carousel.Item>
                                                  ))}
                                                {data.video && (
                                                  <Carousel.Item>
                                                    <div style={{ position: "relative" }}>
                                                      <span
                                                        className={`badge bg-${bgColor} text-white`}
                                                        style={{
                                                          position: "absolute",
                                                          top: "10px",
                                                          right: "10px",
                                                          zIndex: 2,
                                                          fontSize: "0.75rem",
                                                        }}
                                                      >
                                                        {data.availableSlotsCount > 0
                                                          ? `${data.availableSlotsCount} slots available`
                                                          : "0 slots available"}
                                                      </span>
                                                      <video
                                                        src={URLS.Base + data.video}
                                                        className="img-fluid video-mobile"
                                                        style={{
                                                          height: "250px",
                                                          borderRadius: "10px",
                                                          width: "100%",
                                                          cursor: "pointer",
                                                          display: "block",
                                                          objectFit: "cover",
                                                        }}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        preload="auto"
                                                      />
                                                    </div>
                                                  </Carousel.Item>
                                                )}
                                              </Carousel>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="card-body d-flex flex-column justify-content-between">
                                          <div>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                              <div>
                                                <h5
                                                  className="card-title m-0 dark-text"
                                                  style={{ fontSize: "1.25rem", fontWeight: "700" }}
                                                >
                                                  {data.name}
                                                </h5>
                                                {location && (
                                                  <p className="fs-7 ">
                                                    <strong>
                                                      <i className="fa-solid fa-location-dot " style={{ color: "#000" }}></i>{location.name}, {location.city}
                                                    </strong>
                                                  </p>
                                                )}
                                              </div>
                                              <div>
                                                <p
                                                  className="card-price mb-2 dark-text"
                                                  style={{ fontFamily: "'Fraunces', serif" }}
                                                >
                                                  <span style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                                                    ₹{" "}
                                                    {selectedSlot[i]
                                                      ? selectedSlot[i].duration === "1:30 hr"
                                                        ? data.oneandhalfslotPrice
                                                        : selectedSlot[i].offerPrice ?? data.offerPrice
                                                      : data.offerPrice}
                                                    /-
                                                  </span>
                                                  <span style={{ fontSize: "0.9rem", fontWeight: 400, marginLeft: "0.5rem" }}>
                                                    {selectedSlot[i]
                                                      ? `for upto ${data.maxPeople} ${data.maxPeople > 1 ? "people" : "person"}`
                                                      : `for upto ${data.maxPeople} ${data.maxPeople > 1 ? "people" : "person"}`}
                                                  </span>
                                                </p>
                                              </div>

                                            </div>
                                            <div className="row align-items-center mb-2 text-center text-md-start g-2">
                                              <div className="col-6 col-sm-6">
                                                <p
                                                  className="card-details mb-2 light-text"
                                                  style={{
                                                    fontSize: "0.85rem",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                  }}
                                                >
                                                  <span
                                                    className="fw-semibold px-3 py-1 rounded-pill dark-text d-inline-block"
                                                    style={{ whiteSpace: "nowrap" }}
                                                  >
                                                    <i className="bi bi-currency-dollar me-1"></i>{" "}
                                                    Extra Person: ₹
                                                    {selectedSlot[i]
                                                      ? selectedSlot[i].duration === "1:30 hr"
                                                        ? data.onehalfanhourExtraPersonPrice
                                                        : data.extraPersonprice
                                                      : data.extraPersonprice}
                                                    /-

                                                  </span>
                                                </p>
                                              </div>
                                              <div className="col-6 col-sm-6">
                                                <p
                                                  className="card-details mb-2 light-text"
                                                  style={{
                                                    fontSize: "0.85rem",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                  }}
                                                >
                                                  <span
                                                    className="fw-semibold px-3 py-1 rounded-pill dark-text d-inline-block"
                                                    style={{ whiteSpace: "nowrap" }}
                                                  >
                                                    <i className="bi bi-person-fill me-1"></i> Max {maxPeople} People
                                                  </span>

                                                </p>
                                              </div>
                                            </div>
                                            <p
                                              className="card-details  light-text"
                                              style={{ fontSize: "0.75rem" }}
                                            >
                                              <span className="fw-bold">
                                                <i className="bi bi-tv-fill"></i> Features
                                              </span>
                                              <div className="row mt-1">
                                                {(expandedCards[i] ? data.features : data.features.slice(0, 4)).map(
                                                  (feature, index) => (
                                                    <div key={index} className="col-6 mb-1 d-flex align-items-start">
                                                      <i
                                                        className="bi bi-star-fill"
                                                        style={{
                                                          fontSize: "0.65rem",
                                                          color: "#40008C",
                                                          marginRight: "6px",
                                                          marginTop: "2px",
                                                        }}
                                                      ></i>
                                                      <span>{feature}</span>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                              {data.features.length > 4 && (
                                                <div
                                                  onClick={() => toggleView1(i)}
                                                  style={{
                                                    cursor: "pointer",
                                                    color: "#40008C",
                                                    textDecoration: "underline",
                                                    fontSize: "0.75rem",
                                                    marginTop: "4px",
                                                  }}
                                                >
                                                  {expandedCards[i] ? "View Less" : "View More"}
                                                </div>
                                              )}
                                            </p>
                                          </div>
                                          <div>
                                            <div className="slot-selection mb-3">
                                              <p
                                                className="slot-title mb-2 dark-text"
                                                style={{ fontSize: "0.9rem", fontWeight: "600" }}
                                              >
                                                Select Time Slot
                                              </p>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  gap: "0.6rem",
                                                  overflowX: "auto",
                                                  paddingBottom: "6px",
                                                }}
                                              >
                                                {data.availableSlots &&
                                                  data.availableSlots.map((slot, index) => {
                                                    const fromTime12 = convertTo12HourFormat(slot.fromTime);
                                                    const toTime12 = convertTo12HourFormat(slot.toTime);
                                                    const duration = calculateDuration(slot.fromTime, slot.toTime);
                                                    const isSelected =
                                                      selectedSlot[i] && selectedSlot[i]._id === slot._id;
                                                    let discount = null;
                                                    if (
                                                      duration === "1:30 hr" &&
                                                      data.offerPrice &&
                                                      data.oneandhalfslotPrice
                                                    ) {
                                                      discount = data.offerPrice - data.oneandhalfslotPrice;
                                                    }
                                                    return (
                                                      <div
                                                        key={index}
                                                        style={{
                                                          flex: "0 0 auto",
                                                          textAlign: "center",
                                                        }}
                                                      >
                                                        <button
                                                          className="btn"
                                                          onClick={(e) => handleSlot(e, { ...slot, duration }, i)}
                                                          style={{
                                                            minWidth: "50px",
                                                            height: "60px",
                                                            padding: "0px 0px",
                                                            fontSize: "0.7rem",
                                                            fontWeight: "500",
                                                            lineHeight: "1.2",
                                                            borderRadius: "8px",
                                                            border: isSelected ? "2px solid #40008C" : "1px solid #ccc",
                                                            backgroundColor: slot.isBooked
                                                              ? "#f1f1f1"
                                                              : isSelected
                                                                ? "#40008C"
                                                                : "#fff",
                                                            color: slot.isBooked
                                                              ? "#888"
                                                              : isSelected
                                                                ? "#fff"
                                                                : "#000",
                                                            textDecoration: slot.isBooked ? "line-through" : "none",
                                                            cursor: slot.isBooked ? "not-allowed" : "pointer",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                          }}
                                                          disabled={slot.isBooked}
                                                        >
                                                          <span>{fromTime12}</span>-
                                                          <span>{toTime12}</span>
                                                        </button>
                                                        {discount !== null && !slot.isBooked && (
                                                          <div
                                                            style={{
                                                              fontSize: "0.65rem",
                                                              color: "#28a745",
                                                              marginTop: "4px",
                                                              fontWeight: "600",
                                                            }}
                                                          >
                                                            Rs {discount} less
                                                          </div>
                                                        )}
                                                      </div>
                                                    );
                                                  })}
                                              </div>
                                            </div>
                                            {selectedSlot[i] ? (
                                              <div className="mt-3">
                                                <div
                                                  style={{
                                                    fontSize: "1.2rem",
                                                    fontWeight: "700",
                                                    color: "#000",
                                                  }}
                                                >
                                                  ₹
                                                  {selectedSlot[i].duration === "1:30 hr"
                                                    ? data.oneandhalfslotPrice
                                                    : selectedSlot[i].offerPrice ?? data.offerPrice}
                                                  <span style={{ fontSize: "0.85rem", fontWeight: "500" }}>
                                                    {" "}
                                                    for up to {data.maxPeople} people
                                                  </span>
                                                </div>
                                                <div
                                                  style={{
                                                    fontSize: "0.8rem",
                                                    color: "#666",
                                                    marginTop: "2px",
                                                  }}
                                                >
                                                  Additional ₹
                                                  {selectedSlot[i]
                                                    ? selectedSlot[i].duration === "1:30 hr"
                                                      ? data.onehalfanhourExtraPersonPrice
                                                      : data.extraPersonprice
                                                    : data.extraPersonprice}
                                                  /- per person after {data.maxPeople} people

                                                </div>
                                              </div>
                                            ) : (
                                              <div
                                                className="mt-3"
                                                style={{ fontSize: "0.8rem", color: "#666" }}
                                              >
                                                Select a slot to check price
                                              </div>
                                            )}
                                            <div className="col-12 mt-3">
                                              <button
                                                disabled={!isBookNowActive}
                                                onClick={() => handleBasicPlan(data, i)}
                                                className="btn"
                                                style={{
                                                  width: "100%",
                                                  color: "white",
                                                  border: "none",
                                                  fontWeight: "600",
                                                  borderRadius: "8px",
                                                  padding: "10px",
                                                  backgroundColor: isBookNowActive ? "#40008C" : "#A88FC7",
                                                }}
                                              >
                                                Book Now
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="col-12 text-center">
                                  <p>No theaters available for the selected location and date.</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}
                {/* ===== END NEW SECTION ===== */}

              </main>
              <section className="p-5 px-2 px-md-4 d-flex justify-content-center light-back">
                <div
                  className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 p-4 bg-white shadow-lg"
                  style={{
                    borderRadius: '12px'
                  }}
                >
                  <div>
                    <h5 className="fw-bold mb-1 text-dark">
                      Hurry! Slots get booked fast.
                    </h5>
                    <p className="fst-italic text-secondary m-0">
                      Extra charges apply if guests exceed max limit.
                    </p>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="btn text-white fw-semibold"
                      style={{
                        backgroundColor: '#a341e0',
                        padding: '10px 24px',
                        borderRadius: '12px',
                        fontSize: '16px',
                      }}
                    >
                      Book Your Experience Now
                    </a>
                  </div>
                </div>
              </section>
              <Modal
                size="md"
                show={lgShow}
                onHide={() => setLgShow(false)}
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
                                    maxLength="10"
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
              <Modal
                size="md"
                show={modalPop}
                onHide={() => setModalPop(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header
                  closeButton
                  className="lighter-back"
                >
                  <Modal.Title
                    id="example-modal-sizes-title-lg gradient-border"
                    style={{ textAlign: "center" }}
                  >
                    <span className="light-text"> Note : </span>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="lighter-back ">
                  <div className="row justify-content-md-center text-dark">
                    <div className="col-lg-12 mt-40  lighter-back">
                      <h6 className="p-4 text-center">
                        You have selected a slot with 1.5 hours duration and will
                        be charged accordingly. Proceed further if you are okay
                        with it!
                      </h6>
                      <div className="text-center">
                        <button
                          onClick={() => handleclose()}
                          type="button"
                          className="btn light-back text-light mb-4 text-center"
                        >
                          okay !
                        </button>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </>
          )}
          <ToastContainer />
          <Footer />
        </div>
      )}
    </>
  );
}
export default Theaters;