import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";

// Import images
import privateScreeningImg from "./images/screening.jpg";
import foodBeveragesImg from "./images/foodbeverages1.jpg";
import bouquetsGiftsImg from "./images/roses1.png";
import photoshootImg from "./images/photoshoot.jpg";
import decorationImg from "./images/decor.jpg";
import cakeImg from "./images/cake 4.jpg";
import fogEntryImg from "./images/cake 41.jpg";

function OurServices() {
  const [isLoading, setIsLoading] = useState(false);

  // Services data (based on uploaded image content)
  const services = [
    {
      id: 1,
      title: "Private movie screening",
      description:
        "Enjoy the luxury of your own private movie screening at Carnival Castle. Whether it’s a cozy date night, a family gathering, or a fun time with friends, our private theatre offers a big-screen experience like no other. With 4K visuals, surround sound, and comfortable seating, you can stream your favorite movies or shows using your own OTT accounts in a completely private and personalized setup.",
      image: privateScreeningImg,
    },
    {
      id: 2,
      title: "Decoration",
      description:
        "At Carnival Castle, we believe every celebration should feel magical. Our decorations are thoughtfully designed to match your occasion — whether it’s a birthday, anniversary, or a surprise proposal. From elegant backdrops and vibrant balloons to personalized signage and floral accents, we transform your private theatre into a beautifully styled space that’s perfect for both the moment and the memories.",
      image: decorationImg,
    },
    {
      id: 3,
      title: "Snacks and beverages",
      description:
        "No celebration is complete without delicious treats! At Carnival Castle, we offer a variety of snacks and beverages to keep your guests refreshed and satisfied. From classic popcorn and nachos to soft drinks and customizable party platters, we’ve got your craving covered. You can also bring your own food or work with us to create a menu that fits your celebration perfectly.",
      image: foodBeveragesImg,
    },
    {
      id: 4,
      title: "Cakes",
      description:
        "Make your special moments even sweeter with our delightful cake options at Carnival Castle. Whether it’s a birthday, anniversary, or any milestone worth celebrating, we offer customized cakes that not only look stunning but taste amazing too. You’re also welcome to bring your own cake, or we can help arrange one that fits your theme and preferences perfectly. Let the celebration begin with the perfect slice!",
      image: cakeImg,
    },
    {
      id: 5,
      title: "Bouquet and other gifts",
      description:
        "Add a touch of love and surprise to your celebration with beautifully curated bouquets and thoughtful gifts at Carnival Castle. Whether it’s a romantic gesture or heartfelt thank-you, we help you create meaningful moments with fresh flowers, personalized hampers, and special add-ons. You can also bring your own gifts and we’ll ensure they’re presented in the most memorable way.",
      image: bouquetsGiftsImg,
    },
    {
      id: 6,
      title: "Fog Entry",
      badge: "Best Seller",
      description:
        "Make a grand entrance with our most-loved feature — the Fog Entry at Carnival Castle. Perfect for proposals, birthday reveals, or couple entries, this dramatic effect fills the space with dreamy fog and spotlight, turning your arrival into a cinematic moment. It’s the perfect mix of magic and drama that guests love and remember. No wonder it’s our best seller!",
      image: fogEntryImg,
    },
    {
      id: 7,
      title: "Photoshoot",
      badge: "Best Seller",
      description:
        "Capture every beautiful moment with our professional photoshoot setup at Carnival Castle. From candid smiles to picture-perfect poses, our team ensures you have stunning memories to look back on. With themed backdrops, creative props, and expert lighting, your celebration turns into a vibrant photoshoot experience. Whether it’s a solo shoot, a couple session, or group portraits — we’ve got you covered!",
      image: photoshootImg,
    },
  ];

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
          <h6 style={{ color: "gold" }}>Loading...</h6>
        </div>
      ) : (
        <div className="home-page indexsix bg-dark">
          <div className="main-wrapper bg-dark">
            <Header />

            <section
              id="parallax"
              className="slider-area breadcrumb-area d-flex align-items-center justify-content-center fix bg-dark border-gradient border-gradient-gold only-bottom-border"
              style={{ backgroundColor: "#AD3DF0" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                    <div className="breadcrumb-wrap text-center">
                      <div className="breadcrumb-title mb-30">
                        <h1 style={{ color: "white", marginTop: "20px" }}>
                          Our Services
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Services Section */}
            <section className="py-5 bg-dark">
              <div className="container">
                <div className="text-center mb-5">
                  <h2 className="text-gold-gradient">Our Services</h2>
                  <p className="text-white">
                    Discover what makes Carnival Castle special
                  </p>
                </div>

                {services.map((service, index) => (
                  <div
                    className="row align-items-center mb-5"
                    key={service.id}
                  >
                    {/* Alternate image/text order */}
                    {index % 2 === 0 ? (
                      <>
                        <div className="col-md-6 mb-3">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="img-fluid rounded shadow"
                            style={{ height: "300px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="p-4 rounded"
                            style={{
                              backgroundColor: "#FFD43B",
                              color: "#222",
                              position: "relative",
                            }}
                          >
                            <h3>
                              {service.title}{" "}
                              {service.badge && (
                                <span className="badge bg-danger ms-2">
                                  {service.badge}
                                </span>
                              )}
                            </h3>
                            <p>{service.description}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-md-6 order-md-2 mb-3">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="img-fluid rounded shadow"
                            style={{ height: "300px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="col-md-6 order-md-1">
                          <div className="p-4 rounded"
                            style={{
                              backgroundColor: "#FFD43B",
                              color: "#222",
                              position: "relative",
                            }}
                          >
                            <h3>
                              {service.title}{" "}
                              {service.badge && (
                                <span className="badge bg-danger ms-2">
                                  {service.badge}
                                </span>
                              )}
                            </h3>
                            <p>{service.description}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
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

export default OurServices;
