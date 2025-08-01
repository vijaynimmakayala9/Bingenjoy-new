import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

function Gallery() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false); // Set loading state to false since no dynamic content is being loaded
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className="text-center"
          style={{
            backgroundColor: 'var(--charcoal-black)',
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img src="assets/img/gipss.gif" style={{ height: "300px", color: "white" }} />
            <h6 style={{ color: "gold" }}>Loading...</h6>
          </div>
        </div>
      ) : (
        <div className="home-page indexsix">
          <Header />
          <main className="main-wrapper">
            <section
              id="parallax"
              className="slider-area breadcrumb-area d-flex align-items-center justify-content-center fix bg-dark border-gradient border-gradient-gold only-bottom-border"
              style={{ backgroundColor: "#AD3DF0" }}
            >
              <div className="container-md">
                <div className="row">
                  <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                    <div className="breadcrumb-wrap text-center">
                      <div className="breadcrumb-title mb-30">
                        <h1 style={{ color: "white", marginTop: "20px" }}>Privacy Policy</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="shop-area pt-1 pb-5 p-relative wow fadeInUp animated bg-dark text-white"
              data-animation="fadeInUp animated"
              data-delay=".2s"
              style={{ background: "#F8EBFF" }}
            >
              <div className="container-md">
                <div className="row align-items-center">
                  <div className="mt-5">
                    {/* Static Privacy Policy Content */}
                    <h3>Privacy Policy</h3>
                    <p>
                      Thank you for choosing our services! Your privacy is a priority for us, and this Privacy Policy outlines how we handle the information we collect from you. Should you have any questions about this policy, feel free to reach out to us at{" "}
                      <a href="tel:+918977917555" style={{ color: "blue", textDecoration: "none" }}>
                        +91 8977917555
                      </a> (WhatsApp only).
                    </p>

                    <h4>Scope of This Policy</h4>
                    <p>
                      This policy only applies to our online activities and is valid for visitors to our website regarding the information shared and/or collected here. This does not apply to information collected offline or through other channels.
                    </p>

                    <h4>Consent</h4>
                    <p>By using our website, you agree to the terms outlined in this Privacy Policy.</p>

                    <h4>Information We Collect</h4>
                    <p>
                      We will clearly inform you when we require your personal information and the purpose for which it is collected.
                    </p>

                    <h4>Direct Contact</h4>
                    <p>
                      If you contact us directly, we may collect information like your name, email address, phone number, and any other details you may choose to provide.
                    </p>

                    <h4>Account Registration</h4>
                    <p>
                      When you register for an account, we may ask for details such as your name, company name, address, email address, and telephone number.
                    </p>

                    <h4>Use of Your Information</h4>
                    <p>We use your information to:</p>
                    <ul>
                      <li>Operate and maintain our website</li>
                      <li>Improve and personalize the website</li>
                      <li>Analyze how our website is used</li>
                      <li>Develop new products and services</li>
                      <li>Communicate with you for customer service, updates, and marketing</li>
                      <li>Prevent fraud</li>
                    </ul>

                    <h4>Log Files</h4>
                    <p>
                      We use log files like most websites. These logs help us collect information such as your IP address, browser type, Internet Service Provider (ISP), time stamps, and navigation data. None of this data identifies you personally.
                    </p>

                    <h4>Advertising Partners</h4>
                    <p>
                      Our advertisers may use cookies and web beacons to personalize ads and analyze their effectiveness. You can find their privacy policies linked on our website.
                    </p>

                    <h4>Third Party Privacy Policies</h4>
                    <p>
                      Our privacy policy does not apply to third-party websites. We encourage you to review the privacy policies of these third-party sites to understand their procedures for collecting and using personal information.
                    </p>

                    <h4>Cookie Management</h4>
                    <p>
                      You can manage cookies through your browser settings. For more detailed information, please review the help settings in your browser.
                    </p>

                    <h4>Your Privacy Rights</h4>
                    <p>
                      <strong>CCPA (California Consumers):</strong> You have the right to request information about the collection, deletion, and sale of your personal data. <br />
                      <strong>GDPR (General Data Protection Regulation):</strong> You have rights including data access, correction, deletion, processing restriction, objection, and portability.
                    </p>

                    <h4>Children’s Privacy</h4>
                    <p>
                      We do not knowingly collect personally identifiable information from children under 13. If you believe your child has provided such information on our website, please contact us immediately.
                    </p>

                    <h4>Changes to This Privacy Policy</h4>
                    <p>
                      We may update our Privacy Policy periodically. We recommend you review this page from time to time. All changes will be posted on this page and are effective immediately.
                    </p>

                    <h4>Contact Us</h4>
                    <p>
                      For any questions or suggestions regarding our Privacy Policy, please contact us at{" "}
                      <a href="tel:+918977917555" style={{ color: "blue", textDecoration: "none" }}>
                        +91 8977917555
                      </a> (WhatsApp only).
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Gallery;
