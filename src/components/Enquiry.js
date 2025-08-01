import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";
import { URLS } from "../Url";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faCalendarAlt,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import logo from "./images/Bingenjoylogopng.png";

function Enquiry() {
  const [form, setform] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    description: "",
    eventName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [Contact, setContact] = useState([]);

  useEffect(() => {
    GetFooterData();
  }, []);

  const GetFooterData = () => {
    axios.post(URLS.GetFooter, {}, {}).then((res) => {
      if (res.status === 200) {
        setContact(res.data.contactus);
        setIsLoading(false);
      }
    });
  };

  const formsubmit = (e) => {
    e.preventDefault();
    EnquiryNow();
  };

  const handleChange = (e) => {
    let updated = { ...form };
    updated[e.target.name] = e.target.value;
    setform(updated);
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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Private Theater in Hyderabad | BingeNJoy</title>
        <meta
          name="description"
          content="Experience perfect venue for Birthday surprises, Anniversary surprises, Bride to Be celebrations, Mom To Be, Baby Shower etc with Ultra HD and Dolby Atmos Sound"
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
          <img
            src="assets/img/gipss.gif"
            alt="Loading"
            style={{ height: "300px" }}
          />
          <h6 style={{ color: "gold" }}>Loading...</h6>
        </div>
      ) : (
        <div className="home-page indexsix">
          <Header />
          <main className="main-wrapper">
            {/* Enquiry Section with Map + Form */}
          <section
  className="pt-5 pb-5 p-relative"
  style={{ backgroundColor: "#E9DCFF", marginTop: "80px" }} // Top spacing
>
  <div className="container p-3">
    <div className="row justify-content-md-center">
      {/* Left: Map */}
      <div className="col-lg-6 mt-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5504603517853!2d78.363276!3d17.4589078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93c845555555%3A0x5a36652c3fe58487!2sBingenjoy%20-%20Private%20Theaters!5e0!3m2!1sen!2sin!4v1710247202871!5m2!1sen!2sin"
          width="100%"
          height="480"
          style={{ borderRadius: "20px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Right: Info and Form */}
      <div className="col-lg-6 mt-4">
        <div className="row g-3 align-items-stretch">
          {/* Info Box */}
          <div
            className="col-lg-6 rounded border border-2"
            style={{ backgroundColor: "#fff", padding: "20px" }}
          >
            <div className="contactsops">
              <img src={logo} alt="logo" style={{ height: "85px" }} />
              <p style={{ color: "black", marginTop: "10px" }}>
                Planning a memorable celebration at BingeNJoy Private Theatre?
                We are ready to make your vision a reality! Whether it's a birthday,
                anniversary, bride to be, mom to be, groom to be, baby shower,
                private movie screening, special surprises or corporate event —
                we offer tailored packages to make each occasion special.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-6">
            <div className="booking-form p-3 bg-white rounded border border-2 h-100">
              <form onSubmit={formsubmit}>
                <div className="section-title text-center mb-4">
                  <h2 style={{ color: "#681DC0" }}>Enquiry Now</h2>
                  <hr className="text-purple" />
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
                    maxLength="10"
                    minLength="10"
                    pattern="[0-9]{10}"
                    value={form.mobileNumber}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Mobile Number*"
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
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Email*"
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
                    value={form.eventName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Event Name*"
                  />
                </div>

                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faClipboard} />
                  </span>
                  <input
                    required
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Description*"
                  />
                </div>

                <button
                  type="submit"
                  className="btn float-end"
                  style={{
                    backgroundColor: "#681DC0",
                    color: "white",
                    width: "100%",
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

          </main>
          <ToastContainer />
          <Footer />
        </div>
      )}
    </>
  );
}

export default Enquiry;
