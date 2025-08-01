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
import { FaStar } from "react-icons/fa";
import { Galleria } from "primereact/galleria";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {
  faUser,
  faPhone,
  faEnvelope,
  faCalendarAlt,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../components/carnival_footer_logo-2-removebg-preview.png";

// Import images
import basicPackageImg from "./images/cake 4.jpg";
import comboPackageImg from "./images/cake 4.jpg";
import explorePackageImg from "./images/cake 4.jpg";
import birthdayImg from "./images/cake 4.jpg";
import anniversaryImg from "./images/cake 4.jpg";
import proposalImg from "./images/cake 4.jpg";
import brideToBeImg from "./images/cake 4.jpg";
import candleLightImg from "./images/cake 4.jpg";
import momToBeImg from "./images/cake 4.jpg";
import foodBeverageImg from "./images/cake 4.jpg";
import screeningImg from "./images/cake 4.jpg";
import cakesImg from "./images/cake 4.jpg";
import bouquetsImg from "./images/cake 4.jpg";

function Home() {
  const [lgShow, setLgShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { couponCode, handleCouponChange } = useCoupon();
  const navigate = useNavigate();

  const [form, setform] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    description: "",
    eventName: "",
  });

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
    },
    {
      id: 3,
      title: "Explore Package",
      price: "999",
      description: "Dedicated host and customised experience",
      features: [
        "Premium cinema room for up to 20 people",
        "5-hour screening with intermission",
        "Gourmet food platter and premium beverages",
        "Personalised welcome message",
        "Dedicated host",
        "Custom decorations"
      ],
      image: explorePackageImg
    }
  ];

  // Static data for services
  const services = [
    {
      id: 1,
      title: "Birthday",
      description: "Cake, lights, and memories - make it unforgettable",
      image: birthdayImg
    },
    {
      id: 2,
      title: "Anniversary",
      description: "Celebrate your love story in style",
      image: anniversaryImg
    },
    {
      id: 3,
      title: "Proposal",
      description: "Say it with a screen worthy moment",
      image: proposalImg
    },
    {
      id: 4,
      title: "Bride to Be",
      description: "Celebrate the beautiful journey to marriage",
      image: brideToBeImg
    },
    {
      id: 5,
      title: "Candle Light",
      description: "Romantic ambiance for special moments",
      image: candleLightImg
    },
    {
      id: 6,
      title: "Mom to Be",
      description: "Celebrate the beautiful journey to motherhood",
      image: momToBeImg
    }
  ];

  // Static data for what we offer
  const offerings = [
    {
      id: 1,
      title: "Food and Beverage's",
      description: "Choose from our selection of gourmet options",
      image: foodBeverageImg
    },
    {
      id: 2,
      title: "Screening",
      description: "Bring your own OTT accounts and relive the theatre magic!",
      image: screeningImg
    },
    {
      id: 3,
      title: "Cakes",
      description: "Choose the perfect cake for your celebration from our selection",
      image: cakesImg
    },
    {
      id: 4,
      title: "Bouquets",
      description: "Add a beautiful rose bouquet to enhance your celebration",
      image: bouquetsImg
    }
  ];

  // Static testimonials
  const testimonials = [
    {
      id: 1,
      name: "G. Harish",
      location: "Gachibowli, Hyderabad",
      review: "We had the best birthday surprise ever! The theatre was beautifully set up and everything was perfect.",
      occasion: "Daughter's 1st Birthday",
      rating: 5
    },
    {
      id: 2,
      name: "Devi Sri",
      location: "Kondapur, Hyderabad",
      review: "Amazing experience for our anniversary. The staff went above and beyond to make it special.",
      occasion: "5th Wedding Anniversary",
      rating: 5
    },
    {
      id: 3,
      name: "Aditya Varma",
      location: "Jubilee Hills, Hyderabad",
      review: "Proposed to my girlfriend here and it was magical. Highly recommend for special moments.",
      occasion: "Proposal",
      rating: 5
    }
  ];

  // Static FAQ data
  const faqs = [
    {
      id: 1,
      question: "Who is responsible for damages to the Theatre?",
      answer: "Customers are responsible for any damages caused during their booking period."
    },
    {
      id: 2,
      question: "Are customers allowed to stream any content in the theater?",
      answer: "Yes, you can stream content from your own OTT accounts."
    },
    {
      id: 3,
      question: "Is smoking, alcohol, or substance consumption allowed?",
      answer: "No, our theater maintains a strict no smoking, no alcohol policy."
    },
    {
      id: 4,
      question: "Is there a cleaning fee?",
      answer: "A standard cleaning fee is included in all bookings."
    },
    {
      id: 5,
      question: "Are customers responsible for their personal belongings?",
      answer: "Yes, please ensure you take all personal belongings with you after your booking."
    },
    {
      id: 6,
      question: "Are pets allowed inside the theater?",
      answer: "No, pets are not allowed in the theater premises."
    },
    {
      id: 7,
      question: "Can I extend my booking time on the day of the event?",
      answer: "Extensions are subject to availability and may incur additional charges."
    },
    {
      id: 8,
      question: "Will BingeNJoy provide access to OTT accounts?",
      answer: "No, customers must bring their own OTT accounts for streaming."
    }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  const formsubmit = (e) => {
    e.preventDefault();
    toast.success("Enquiry submitted successfully!");
    setform({
      name: "",
      email: "",
      mobileNumber: "",
      description: "",
      eventName: "",
    });
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

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const galleria = useRef(null);

  const itemTemplate = (item) => {
    return (
      <img
        src={item.image}
        alt={item.title}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.image}
        alt={item.title}
        style={{ display: "block", width: "100px", height: "60px", objectFit: "cover" }}
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

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleCouponClick = (code) => {
    handleCouponChange(code);
    toast.success(`Coupon ${code} applied!`);
  };

  const couponCodesArray = [
    'BIRT20',
    'ANNI15',
    'GROP25',
    'PRIVA10',
  ];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BingeNJoy | Best Private Theaters for Celebrations in Hyderabad</title>
        <meta
          name="description"
          content="Experience the magic of celebrations at BingeNJoy Private Theatres in Hyderabad. Perfect for Birthdays, Anniversaries, Bride To Be, Surprise Parties, etc"
        />
      </Helmet>

      {isLoading ? (
        <div className="text-center" style={{
          backgroundColor: "var(--charcoal-black)",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}>
          <div>
            <img src="assets/img/gipss.gif" style={{ height: "300px", color: "white" }} alt="Loading..." />
            <h6 style={{ color: "gold" }}>Loading...</h6>
          </div>
        </div>
      ) : (
        <div className="home-page indexsix bg-dark">
          <div className="main-wrapper bg-dark">
            <Header />
            
            {/* Hero Banner */}
            <section className="hero-banner" style={{
              background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "white",
              padding: "2rem"
            }}>
              <div className="container">
                <h1 className="display-4 mb-4">Celebrate big in your own private cinema!</h1>
                <p className="lead mb-5">Transform ordinary gatherings into extraordinary experiences with our luxury private cinema rooms. Perfect for birthdays, anniversaries, or just a special night out.</p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="/theaters" className="btn btn-primary btn-lg px-4">Book Now</a>
                  <a href="tel:9059382797" className="btn btn-outline-light btn-lg px-4">Call Us</a>
                </div>
              </div>
            </section>

            {/* Packages Section */}
            <section className="py-5 bg-dark">
              <div className="container">
                <div className="text-center mb-5">
                  <h2 className="text-gold-gradient">Our Packages</h2>
                  <p className="text-white">Choose Wisely</p>
                </div>
                
                <div className="row">
                  {packages.map((pkg) => (
                    <div className="col-md-4 mb-4" key={pkg.id}>
                      <div className="card h-100 border-0 bg-light-grey">
                        <img src={pkg.image} className="card-img-top" alt={pkg.title} style={{ height: "200px", objectFit: "cover" }} />
                        <div className="card-body">
                          <h3 className="card-title text-gold-gradient">{pkg.title}</h3>
                          <h4 className="text-white">Starting at ₹{pkg.price}</h4>
                          <p className="card-text text-white">{pkg.description}</p>
                          <ul className="text-white">
                            {pkg.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="card-footer bg-transparent border-top-0">
                          <button className="btn main-booknow w-100">Explore Package</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Our Services Section */}
            <section className="py-5 bg-light-grey">
              <div className="container">
                <div className="text-center mb-5">
                  <h2 className="text-gold-gradient">Our Services</h2>
                </div>
                
                <div className="row">
                  {services.map((service) => (
                    <div className="col-md-4 col-sm-6 mb-4" key={service.id}>
                      <div className="card h-100 border-0 bg-dark">
                        <img src={service.image} className="card-img-top" alt={service.title} style={{ height: "200px", objectFit: "cover" }} />
                        <div className="card-body text-center">
                          <h3 className="card-title text-gold-gradient">{service.title}</h3>
                          <p className="card-text text-white">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* What We Offer Section */}
            <section className="py-5 bg-dark">
              <div className="container">
                <div className="text-center mb-5">
                  <h2 className="text-gold-gradient">What We Offer</h2>
                </div>
                
                <div className="row">
                  {offerings.map((item) => (
                    <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
                      <div className="card h-100 border-0 bg-light-grey">
                        <img src={item.image} className="card-img-top" alt={item.title} style={{ height: "150px", objectFit: "cover" }} />
                        <div className="card-body text-center">
                          <h4 className="card-title text-gold-gradient">{item.title}</h4>
                          <p className="card-text text-white">{item.description}</p>
                          <a href="#" className="btn btn-sm btn-outline-light">View More</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-5 bg-light-grey">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                         alt="Why Choose Us" 
                         className="img-fluid rounded" />
                  </div>
                  <div className="col-lg-6">
                    <h2 className="text-gold-gradient mb-4">Why Choose Us?</h2>
                    <h4 className="text-white mb-4">Best Private Theaters in Hyderabad for Celebrations</h4>
                    <ul className="list-unstyled text-white">
                      <li className="mb-3">+ Exclusive Birthday Experience</li>
                      <li className="mb-3">+ Customized Decoration Addons</li>
                      <li className="mb-3">+ Continental Food and Beverage Packages</li>
                      <li className="mb-3">+ Comfortable Recliner Seating and State-of-the-Art Sound</li>
                      <li className="mb-3">+ Photography and Fog Entry for a Grand Celebration</li>
                    </ul>
                    <a href="/theaters" className="btn main-booknow mt-3">Book Now</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-5 bg-dark">
              <div className="container">
                <div className="text-center mb-5">
                  <h2 className="text-gold-gradient">What Our Customers Say</h2>
                  <p className="text-white">Real stories. Real celebrations. Real magic at BingeNJoy.</p>
                </div>
                
                <Slider {...settings2}>
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="px-2">
                      <div className="card h-100 border-0 bg-light-grey p-3">
                        <div className="d-flex align-items-center mb-3">
                          <div className="rounded-circle bg-secondary me-3" style={{ width: "50px", height: "50px" }}></div>
                          <div>
                            <h5 className="mb-0 text-white">{testimonial.name}</h5>
                            <small className="text-muted">{testimonial.location}</small>
                          </div>
                        </div>
                        <div className="mb-3">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} color={i < testimonial.rating ? "#FFD700" : "#ddd"} />
                          ))}
                        </div>
                        <p className="text-white mb-3">"{testimonial.review}"</p>
                        <small className="text-muted">Occasion: {testimonial.occasion}</small>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </section>

            {/* Gallery Section */}
            <section className="py-5 bg-light-grey">
              <div className="container">
                <div className="text-center mb-5">
                  <h2 className="text-gold-gradient">Gallery</h2>
                  <p className="text-white">See how our guests made memories at BingeNJoy</p>
                </div>
                
                <div className="row">
                  {[...Array(6)].map((_, i) => (
                    <div className="col-md-4 col-sm-6 mb-4" key={i}>
                      <div className="gallery-item" style={{ height: "250px", overflow: "hidden" }}>
                        <img 
                          src={`https://source.unsplash.com/random/600x400/?cinema,${i}`} 
                          alt={`Gallery ${i + 1}`} 
                          className="img-fluid w-100 h-100" 
                          style={{ objectFit: "cover" }} />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-4">
                  <a href="/gallery" className="btn btn-outline-light">View More</a>
                </div>
              </div>
            </section>

            {/* Coupons Section */}
            <section className="py-5 bg-dark">
              <div className="container">
                <div className="text-center mb-5">
                  <h2 className="text-gold-gradient">Available Coupons</h2>
                </div>
                
                <div className="row justify-content-center">
                  {couponCodesArray.map((code, index) => (
                    <div className="col-md-3 col-sm-6 mb-3" key={index}>
                      <div 
                        className="card bg-light-grey text-center p-3 cursor-pointer"
                        onClick={() => handleCouponClick(code)}
                        style={{ transition: "all 0.3s" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      >
                        <h4 className="text-gold-gradient mb-0">{code}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-5 bg-light-grey">
              <div className="container">
                <div className="text-center mb-5">
                  <h2 className="text-gold-gradient">Frequently Asked Questions</h2>
                </div>
                
                <Accordion defaultActiveKey="0">
                  {faqs.map((faq, index) => (
                    <Accordion.Item eventKey={index.toString()} key={faq.id} className="mb-3">
                      <Accordion.Header>
                        <strong>{faq.question}</strong>
                      </Accordion.Header>
                      <Accordion.Body className="bg-white">
                        {faq.answer}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </section>

            {/* Contact Section */}
            <section className="py-5 bg-dark">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <h2 className="text-gold-gradient mb-4">Reach Out to Us</h2>
                    <p className="text-white mb-4">
                      Tell us about your special day, and we'll help you create unforgettable memories.
                    </p>
                    
                    <form onSubmit={formsubmit}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your full name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Phone Number"
                          name="mobileNumber"
                          value={form.mobileNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Event Date"
                          name="eventDate"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <select className="form-control" name="eventType" onChange={handleChange}>
                          <option value="">Select Event Type</option>
                          <option value="Birthday">Birthday</option>
                          <option value="Anniversary">Anniversary</option>
                          <option value="Proposal">Proposal</option>
                          <option value="Bride-to-Be">Bride-to-Be</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Additional Details"
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn main-booknow">Submit</button>
                    </form>
                  </div>
                  <div className="col-lg-6">
                    <div className="h-100 bg-light-grey p-4 rounded">
                      <h3 className="text-gold-gradient mb-4">Contact Info</h3>
                      <p className="text-white">
                        <strong>Address:</strong> BingeNJoy Private Theatres, 4th floor, Garden Plot No.16, behind Kondapur, Hyderabad, Telangana, 500084
                      </p>
                      <p className="text-white">
                        <strong>Phone:</strong> +91 9059382797
                      </p>
                      <p className="text-white">
                        <strong>Email:</strong> carnivalcastle02@gmail.com
                      </p>
                      <div className="mt-4">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.266589447618!2d78.3498!3d17.4446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzQwLjYiTiA3OMKwMjAnNTkuMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                          width="100%"
                          height="300"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Footer />
            <ToastContainer />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;