// src/components/TheaterDetails.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const TheaterDetails = () => {

    const navigate = useNavigate();
    return (
        <Container fluid className="py-5">
            {/* Section 1 */}
            <Row className="align-items-center justify-content-center py-5  text-center gradient135">
                {/* Image first on mobile */}
                <Col
                    xs={12}
                    md={5}
                    className="d-flex justify-content-center align-items-center mt-4 mt-md-0 order-1 order-md-2"
                >
                    <img
                        src="https://api.carnivalcastle.com/uploads/addressImages/image-1761459835980.jpg"
                        alt="Private Theater"
                        className="img-fluid rounded shadow"
                    />
                </Col>

                {/* Text second on mobile */}
                <Col
                    xs={12}
                    md={7}
                    className="d-flex flex-column justify-content-center align-items-center px-4 order-2 order-md-1"
                >
                    <h3 style={{ fontSize: "1.8rem", lineHeight: "1.8" }}>
                        Experience the magic of <br />
                        <span className="text-primary fw-bold">Dolby Atmos</span> surround sound <br />
                        combined with stunning <br />
                        <span className="text-primary fw-bold">4K Ultra HD visuals</span>
                    </h3>
                    <p className="text-muted" style={{ fontSize: "1.2rem" }}>
                        Exclusive Private Theaters in <br />
                        <span className="text-primary fw-bold">Hyderabad</span>
                    </p>

                    <Button
                        variant="primary"
                        style={{
                            backgroundColor: "#7d2ae8",
                            border: "none",
                            padding: "12px 30px",
                            borderRadius: "30px",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                        }}
                        onClick={()=>navigate('/theaters')}
                    >
                        BOOK NOW
                    </Button>
                </Col>
            </Row>

            {/* Section 2 */}
            <Row className="align-items-center justify-content-center bg-light py-5 px-3 text-center gradient135">
                {/* Image first on mobile */}
                <Col
                    xs={12}
                    md={5}
                    className="d-flex justify-content-center align-items-center mb-4 mb-md-0 order-1"
                >
                    <img
                        src="https://api.carnivalcastle.com/uploads/addressImages/image-1761460385852.jpeg"
                        alt="Celebration"
                        className="img-fluid rounded shadow"
                    />
                </Col>

                {/* Text second on mobile */}
                <Col
                    xs={12}
                    md={7}
                    className="d-flex flex-column justify-content-center align-items-center px-4 order-2"
                >
                    <h3 style={{ fontSize: "1.8rem", lineHeight: "1.8" }}>
                        Enjoy unforgettable moments with <br />
                        <span className="text-primary fw-bold">immersive big-screen fun</span>
                        <br />
                        and share the experience <br />
                        with your <span className="text-primary fw-bold">family & friends</span>
                    </h3>

                    <a
                        href="/about"
                        className="text-primary fw-bold"
                        style={{ fontSize: "1.2rem" }}
                    >
                        Learn more &gt;
                    </a>
                </Col>
            </Row>
        </Container>
    );
};

export default TheaterDetails;
