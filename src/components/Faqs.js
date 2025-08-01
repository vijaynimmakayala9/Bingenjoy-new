import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Footer from "./Footer";
import Header from "./Header";
import { URLS } from "../Url";
import axios from "axios";
import { Helmet } from "react-helmet";

function Enquiry() {
  const [Faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch FAQ data
  useEffect(() => {
    GetFaqsData();
  }, []);

  // Function to get FAQ data
  const GetFaqsData = () => {
    axios.post(URLS.AllModules, {}, {}).then((res) => {
      if (res.status === 200) {
        setFaqs(res.data.faqs);
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BingeNJoy | Couple Private Surprise Party in Hyderabad</title>
        <meta
          name="description"
          content="Celebrate at BingeNJoy Private Theatres in Hyderabad. Perfect for birthdays, anniversaries, love proposals with custom decor, food & privacy. Book now!!"
        />
      </Helmet>

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
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                    <div className="breadcrumb-wrap text-center">
                      <div className="breadcrumb-title mb-30">
                        <h1 style={{ color: "white", marginTop: "20px" }}> Faq's</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section style={{ background: "#F8EBFF" }} className="pb-3 pb-3 bg-dark">
              <div className="container">
                <div className="section-wraper row d-flex align-items-center">
                  <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8">
                      <div className="section-title text-center mb-2 pt-4">
                        <h2 className="text-gold-gradient">
                          Frequently Asked Questions
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <Accordion defaultActiveKey="0">
                        {Faqs?.map((data, i) => {
                          // Replace "Carnival Castle" with "Binge N Joy" in the question
                          const updatedQuestion = data.question?.replace(/Carnival Castle/g, "Binge N Joy");
                          
                          // Replace "Carnival Castle" and "https://carnivalcastle.com" with "Binge N Joy" and "https://bingenjoy.com" in the answer
                          let updatedAnswer = data.answer
                            ?.replace(/Carnival Castle/g, "Binge N Joy")
                            .replace(/https:\/\/carnivalcastle\.com/g, "https://bingenjoy.com");

                          // Replace old phone numbers with the new one
                          updatedAnswer = updatedAnswer
                            .replace(/9059382797/g, "8977917555")
                            .replace(/8341428342/g, "8977917555");

                          console.log("Updated Answer: ", updatedAnswer);  // Debugging line to check updated answer

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

export default Enquiry;
