import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { URLS } from "../Url";
import axios from "axios";
import { Helmet } from "react-helmet";

function About() {
  const [About, setAbout] = useState([]);
  const [AboutFeatures, setAboutFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetAboutdata();
    GetAboutFeaturesdata();
  }, []);

  const GetAboutdata = () => {
    axios.post(URLS.GetAbout, {}, {}).then((res) => {
      if (res.status === 200) {
        setAbout(res.data.aboutus);
        setIsLoading(false);
      }
    });
  };

  const GetAboutFeaturesdata = () => {
    axios.post(URLS.GetAboutFeatures, {}, {}).then((res) => {
      if (res.status === 200) {
        setAboutFeatures(res.data.features);
      }
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Best Private Theater in Hyderabad | BingeNJoy</title>
        <meta
          name="description"
          content="Experience the magic of private theatre for your celebrations. Create unforgettable moments with exclusive screenings and personalized service just for you"
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
              alt="Loading"
              style={{ height: "300px", color: "white" }}
            />
            <h6 style={{ color: "gold" }}>Loading...</h6>
          </div>
        </div>
      ) : (
        <>
          <div className="home-page indexsix">
            <main className="main-wrapper">
              <Header />

              {/* Top Banner */}
              <section
                id="parallax"
                className="slider-area breadcrumb-area d-flex align-items-center justify-content-center fix lightest-back"
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                      <div className="breadcrumb-wrap text-center">
                        <div className="breadcrumb-title mb-30 dark-text">
                          <h1 style={{ marginTop: "20px" }}>
                            About Us
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section className="pt-4 pb-4 p-relative lightest-back">
                <div className="container-md">
                  <div className="row align-items-center">
                    {/* Left Side Image */}
                    <div className="col-lg-6">
                      <div>
                        <img
                          src={URLS.Base + About.image}
                          alt="About BingeNJoy"
                          style={{
                            borderRadius: "20px",
                            height: "400px",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>

                    {/* Right Side Static Content */}
                    <div className="col-lg-6">
                      <div>
                        <h3 className="light-text">
                          <b>About BingeNJoy</b>
                        </h3>
                      </div>
                      <p className="text-dark pt-3">
                        At <strong>BingeNJoy</strong>, we believe that every celebration deserves a personal touch. Our elegantly designed private theatres in Hyderabad offer the perfect blend of comfort and style, featuring plush recliner seating, continental food and beverages, and a curated selection of regular and custom cakes.
                        <br /><br />
                        Enjoy a premium cinema experience with Ultra HD to 4K projections and Dolby 5.1 to 7.1 Atmos surround sound. We go beyond just movie screenings — with professional photography, fog entry for dramatic arrivals, and seamless event management to make every moment special.
                        <br /><br />
                        Ideal for short films, surprise events, anniversaries, birthdays, bride-to-be or mom-to-be celebrations, and intimate gatherings — BingeNJoy ensures every guest feels like a VIP.
                        <br /><br />
                        Our commitment to service, creativity, and affordability has made us a favourite among families, couples, and friend circles in Hyderabad and beyond.
                        <br /><br />
                        Let <strong>BingeNJoy Private Theatres</strong> be the destination where your memories come alive. Celebrate with us and turn ordinary moments into unforgettable cinematic celebrations!
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="blog-wrapper lightest-back" style={{ background: "#F8EBFF" }}>
                <div className="container-md">
                  <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8">
                      <div className="section-title text-center mb-5 pt-3">
                        <h2 className="dark-text">Our Features</h2>
                      </div>
                    </div>
                  </div>

                  <div className="row blog-grid-row">
                    {AboutFeatures.map((data, i) => (
                      <div className="col-md-6 col-lg-4 col-sm-12" key={i}>
                        <div className="content-wrapper">
                          <div className="blog-image">
                            <a href="/locations">
                            </a>
                          </div>
                          <div className="blog-content">
                            <a href="javascript:void(0);" className="post-date">
                              <span className="btn lioght-back text-white">
                                <a href="/locations">
                                  <b className="title-name">{data.name}</b>
                                </a>
                              </span>
                            </a>
                            <p className="mb-3 text-dark fw-bold">{data.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <Footer />
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default About;
