import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { URLS } from "../Url";
import axios from "axios";

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
              className="slider-area breadcrumb-area d-flex align-items-center justify-content-center fix lightest-back"
              style={{ backgroundColor: "#AD3DF0" }}
            >
              <div className="container-md">
                <div className="row">
                  <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                    <div className="breadcrumb-wrap text-center">
                      <div className="breadcrumb-title mb-30 dark-text">
                        <h1 style={{ marginTop: "20px" }}>Terms & Conditions</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="shop-area pt-1 pb-5 p-relative wow fadeInUp animated lightest-back text-black"
              data-animation="fadeInUp animated"
              data-delay=".2s"
            >
              <div className="container-md">
                <div className="row align-items-center">
                  <div className="mt-5">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `
                          <h3>Terms & Conditions</h3>
                          <p>These terms and conditions outline the rules and regulations for the use of <a href="https://bingenjoy.com" style="color: #007bff; text-decoration: none;">Binge N Joy's Services</a>, located at <a href="https://bingenjoy.com" style="color: #007bff; text-decoration: none;">https://bingenjoy.com</a></p>
                          <p>By accessing this website and booking our services, we assume you accept these terms and conditions. Do not continue to use Binge N Joy if you do not agree to all of the terms and conditions stated on this page.</p>
                          <h4>1. OTT Accounts:</h4>
                          <p>We do not provide movie or OTT accounts. Please use your own accounts or downloaded content for setup.</p>
                          <h4>2. Prohibited Activities:</h4>
                          <p>Smoking, drinking, and the use of party poppers, snow sprays, cold fire, and similar items are strictly prohibited inside the theater. Outside food is also not allowed due to the sensitivity of carpets and recliners.</p>
                          <h4>3. Damage Liability:</h4>
                          <p>Any damage to the theater, including to decorative items like balloons and lights, must be reimbursed.</p>
                          <h4>4. Cleanliness:</h4>
                          <p>Guests are required to maintain cleanliness inside the theater.</p>
                          <h4>5. Identification:</h4>
                          <p>Carrying an Aadhaar Card is mandatory and will be scanned upon entry.</p>
                          <h4>6. Age Restrictions:</h4>
                          <p>Couples under 18 years of age cannot book the theater. Children aged 5 years and older are charged full price, while those under 5 years receive a half-price discount.</p>
                          <h4>7. Pets:</h4>
                          <p>Pets are not allowed inside the theater.</p>
                          <h4>8. Booking Fee and Refund Policy:</h4>
                          <p>An advance payment of ₹750 for basic booking & ₹1500 for combo package booking plus a convenience fee is required to book the slot. If you cancel at least 72 hours before your booking time, a partial refund of ₹500 will be issued. Management reserves the right to refuse admission.</p>
                        `,
                      }}
                    />
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
