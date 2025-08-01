import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/Bingenjoylogopng.png"; // Update path if needed

function Footer() {
  return (
    <div>
      <footer className="footer footersix">
        <div className="footer-top">
          <div className="container-md">
            <div className="row">
              {/* Left Column: About + Social */}
              <div className="col-lg-5 col-md-6">
                <div className="footer-widget footer-about">
                  <h2 className="footer-title">
                    <img
                      src={logo}
                      alt="Binge N Joy Logo"
                      style={{ height: "100px" }}
                    />
                  </h2>
                  <div className="footer-about-content">
                    <p>
                      At Binge N Joy, we craft memorable theater events in
                      elegant venues, tailored just for you. Find your venue,
                      plan your event, and enjoy your special day.
                    </p>
                    <div className="social-icon">
                      <ul>
                        <li>
                          <a
                            href="https://www.facebook.com/share/1JUXC89fLe/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://youtube.com/@bingenjoy"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-youtube" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/bingenjoy.hyd?utm_source=qr&igsh=MTI5bG13aHh4bjdzNg=="
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-instagram" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://wa.me/8977917555"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-whatsapp" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column: Quick Links */}
              <div className="col-lg-2 col-md-6">
                <div className="footer-widget footer-menu">
                  <h2 className="footer-title">Quick Links</h2>
                  <ul>
                    <li><NavLink to="/" style={{ color: "white" }}><i className="fas fa-angle-double-right" /> Home</NavLink></li>
                    <li><NavLink to="/about" style={{ color: "white" }}><i className="fas fa-angle-double-right" /> About</NavLink></li>
                    <li><NavLink to="/theaters" style={{ color: "white" }}><i className="fas fa-angle-double-right" /> Theaters</NavLink></li>
                    <li><NavLink to="/cakes" style={{ color: "white" }}><i className="fas fa-angle-double-right" /> Cake's</NavLink></li>
                    <li><NavLink to="/enquiry" style={{ color: "white" }}><i className="fas fa-angle-double-right" /> Enquiry</NavLink></li>
                    <li><NavLink to="/Faqs" style={{ color: "white" }}><i className="fas fa-angle-double-right" /> Faq's</NavLink></li>
                    <li><NavLink to="/Reviews" style={{ color: "white" }}><i className="fas fa-angle-double-right" /> Testimonial</NavLink></li>
                    <li><NavLink to="/gallery" style={{ color: "white" }}><i className="fas fa-angle-double-right" /> Gallery</NavLink></li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Address */}
              <div className="col-lg-5 col-md-6">
                <div className="footer-widget footer-contact">
                  <h2 className="footer-title">Address</h2>
                  <div className="footer-contact-info">
                    <div className="footer-address">
                      <span><i className="fas fa-map-marker-alt" /></span>
                      <p>
                         Asian Sun City, B-402, Beside Sarath City Capital Mall
                      (AMB Mall), Kondapur, Hyderabad, 500084 <br />
                      <strong>Located in:</strong> Asian Sun City <br />
                      <strong>Hours:</strong> Closes 12:30 am ⋅ Opens 9 am Sun
                    </p>
                    </div>
                    <p>
                      <i className="fas fa-phone-alt" />
                      <a href="tel:+919059382797" className="text-white">
                        +91 8977917555 (Whatsapp only)
                      </a>
                    </p>
                    <p className="mb-0">
                      <i className="fas fa-envelope" />
                      <a
                        href="mailto:Bingenjoy.hyd@gmail.com"
                        className="text-white footer-mail"
                      >
                        Bingenjoy.hyd@gmail.com
                      </a>
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href="https://bingenjoy.com"
                        className="text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        bingenjoy.com
                      </a>
                    </p>
                    <p>
                      <strong>Plus Code:</strong> F957+H8 Hyderabad, Telangana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container-md">
            <div className="copyright">
              <div className="row">
                <div className="col-md-7 col-lg-6">
                  <ul className="policy-menu text-start">
                    <li><NavLink to="/Terms" style={{ color: "white" }}>Terms and Conditions</NavLink></li>
                    <li><NavLink to="/PrivacyPolicy" style={{ color: "white" }}>Privacy Policy</NavLink></li>
                    <li><NavLink to="/RefundPolicy" style={{ color: "white" }}>Refund Policy</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-5 col-lg-6">
                  <ul className="policy-menu">
                    <li>
                      <p className="mb-0">
                        © 2025. <strong>Binge N Joy</strong>. All Rights Reserved.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
