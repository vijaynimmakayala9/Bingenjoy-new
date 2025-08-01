import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './Footer';
// import axios from 'axios'; // Uncomment when using API

const mockOccasions = [
  {
    _id: "1",
    name: "Birthday Bash",
    description: "Make birthdays unforgettable with BingeNJoy's themed decorations, custom cakes, and joyful ambiance. Whether it's a kid's superhero party or an elegant adult gathering, we provide entertainment, personalized décor, and catering that suits every taste. Let us turn your milestone into a magical experience filled with laughter, fun, and lifelong memories.",
    image: "https://img.freepik.com/free-vector/happy-birthday-golden-silver-balloons-with-confetti_1017-29992.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
  },
  {
    _id: "2",
    name: "Anniversary Night",
    description: "Celebrate the love that grows stronger each year with a romantic evening at BingeNJoy. From candlelit dinners to luxurious seating, live music, and customized floral arrangements, we create an atmosphere that's both intimate and memorable. Add a touch of elegance to your anniversary and relive your love story in style.",
    image: "https://img.freepik.com/free-vector/couple-romantic-dinner-outdoors-illustration_1262-16276.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
  },
  {
    _id: "3",
    name: "Graduation Party",
    description: "Honor your academic achievements with a high-spirited graduation party. Whether you're throwing a bash for a school graduate or a college convocation celebration, we offer music, DJ, dance floors, and gourmet food that make the event unforgettable. Invite friends, family, and mentors to share in your moment of success with style.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYjyDZWPeWnT3az8d9GyRyJblRrELAThJrSg&s",
  },
  {
    _id: "4",
    name: "Baby Shower",
    description: "Welcome the newest family member with a dreamy baby shower at BingeNJoy. We offer pastel-themed décor, adorable props, customized cakes, and special activities for guests. Whether it’s a gender reveal or a classic celebration, our team crafts every detail to match your vision and provide a cozy, love-filled experience.",
    image: "https://img.freepik.com/free-photo/female-friends-celebrating-baby-shower_23-2149126762.jpg",
  },
  {
    _id: "5",
    name: "Engagement Ceremony",
    description: "Celebrate your promise of forever with a dazzling engagement ceremony. From grand floral setups and luxurious banquet seating to romantic lighting and gourmet cuisine, our venue transforms into a fairy-tale space. Capture every moment as you exchange rings and begin your journey toward a lifetime of love and happiness.",
    image: "https://img.freepik.com/free-photo/couple-holding-hands-engagement-ring_23-2149310370.jpg",
  },
  {
    _id: "6",
    name: "Corporate Gala",
    description: "Impress clients and reward employees with a high-end corporate gala. We offer premium audiovisual setups for presentations, elegant seating, and fine dining services to ensure a sophisticated experience. Ideal for product launches, annual meets, or award nights, BingeNJoy brings professionalism with a touch of luxury.",
    image: "https://img.freepik.com/free-photo/business-conference-team-meeting-hall_53876-105038.jpg",
  },
  {
    _id: "7",
    name: "Kids Theme Party",
    description: "Make your child's imagination come alive with our themed parties. Whether it's a princess castle, superhero hideout, or jungle safari, we provide vibrant decorations, costumes, fun games, and delicious treats. Our team ensures every child is entertained and every parent is stress-free while creating the perfect party atmosphere.",
    image: "https://img.freepik.com/free-photo/happy-kids-birthday-party-celebration_53876-104926.jpg",
  },
  {
    _id: "8",
    name: "Retirement Celebration",
    description: "Celebrate years of dedication and success with a heartwarming retirement party. At BingeNJoy, we create a respectful yet joyous ambiance with elegant décor, heartfelt speeches, and curated menus. Invite colleagues, friends, and family to honor the retiree’s accomplishments and embark on a new chapter in style.",
    image: "https://img.freepik.com/free-photo/senior-man-getting-congratulations-colleagues-retirement_23-2149122903.jpg",
  }
];



const OccasionsPage = () => {
    const [occasions, setOccasions] = useState([]);
    const [loading, setLoading] = useState(false);

    // const API_URL = 'https://your-api-domain.com/v1/carnivalApi/web/getoccassions';

    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            setOccasions(mockOccasions);
            setLoading(false);
        }, 500);

        // Uncomment to use real API
        /*
        axios.get(API_URL)
          .then((res) => {
            if (res.data && Array.isArray(res.data.data)) {
              setOccasions(res.data.data);
            }
          })
          .catch((err) => {
            console.error("Error fetching occasions:", err);
          })
          .finally(() => {
            setLoading(false);
          });
        */
    }, []);

    return (
        <>
            <Header />
            <div className="bg-light py-4 text-center">
                <h2 className="display-5 fw-bold">Our Services</h2>
            </div>

            <div className="container py-5">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    occasions.map((occasion, index) => (
                        <div key={occasion._id} className="row align-items-center mb-5">
                            <div className={`col-md-6 ${index % 2 !== 0 ? 'order-md-2' : ''}`}>
                                <h3 className="fw-bold">{occasion.name}</h3>
                                <p className="text-muted">{occasion.description}</p>
                            </div>
                            <div className={`col-md-6 ${index % 2 !== 0 ? 'order-md-1' : ''}`}>
                                <img
                                    src={occasion.image}
                                    alt={occasion.name}
                                    className="img-fluid rounded shadow-sm"
                                    style={{ width: '100%', maxHeight: '350px', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </>
    );
};

export default OccasionsPage;
