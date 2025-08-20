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
              className="slider-area breadcrumb-area d-flex align-items-center justify-content-center fix lightest-back"
              style={{ backgroundColor: "#AD3DF0" }}
            >
              <div className="container-md">
                <div className="row">
                  <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                    <div className="breadcrumb-wrap text-center">
                      <div className="breadcrumb-title mb-30 dark-text">
                        <h1 style={{ marginTop: "20px" }}>Refund Policy</h1>
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
              style={{ background: "#F8EBFF" }}
            >
              <div className="container-md">
                <div className="row align-items-center">
                  <div className="mt-5">
                    {/* Static Refund Policy Content */}
                    <h3>Refund Policy</h3>
                    <p>
                      Thank you for choosing our services! "At <strong>Binge N Joy</strong>, we are committed to ensuring a seamless and enjoyable experience for our customers. Please review our refund policy outlined below."
                    </p>

                    <h4>Booking Confirmation and Advance Payment:</h4>
                    <p>
                      To secure your booking, we require an upfront payment of ₹700, along with a nominal convenience fee of ₹50. The balance amount will be settled at the time of check-out.
                    </p>

                    <h4>Cancellation Policy:</h4>
                    <p>
                      <strong>Free Cancellation with a Nominal Fee:</strong> You can cancel your booking up to 3 days before the scheduled event. In such cases, a nominal fee of ₹500 will be refunded to the source account. No refund will be given if the booking is canceled within 3 days of the event.
                    </p>
                    <p>
                      <strong>No-Show Policy:</strong> In the case of a no-show, the advance payment is non-refundable.
                    </p>

                    <h4>Processing of Refunds:</h4>
                    <p>
                      All refunds will be processed within 3 days of the cancellation or alteration request. Refunds will be credited back to the original mode of payment unless otherwise specified.
                    </p>

                    <h4>Refunds for Service Alterations:</h4>
                    <p>
                      If there is a need to alter the service (e.g., change of slot, reduction in number of add-ons, etc.), please inform us at least 2 days in advance. Applicable refunds for any downgrades in services will be processed accordingly.
                    </p>
                    <p>
                      Alterations requested within 7 days of the event may not be eligible for refunds due to the preparations involved.
                    </p>

                    <h4>Exceptions and Special Circumstances:</h4>
                    <p>
                      In exceptional circumstances, such as unforeseen natural events or emergencies, we will consider refund requests on a case-by-case basis. We reserve the right to offer partial or full refunds or credit for future services in special circumstances.
                    </p>

                    <h4>Questions or Concerns:</h4>
                    <p>
                      If you have any questions or need further clarification regarding our refund policy, please don't hesitate to contact us at{" "}
                      <a href="tel:+918341428342" style={{ color: "blue", textDecoration: "none" }}>
                        +91 8977917555
                      </a>. We are here to assist you and ensure a hassle-free experience.
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
