import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaBirthdayCake, FaHeart } from 'react-icons/fa';
import Footer from './Footer';

// Static array of coupon codes, each coupon has its unique code
const couponCodesArray = [
  'BIRT20',
  'ANNI15',
  'GROP25',
  'PRIVA10',
];

const couponData = [
  { id: 1, title: "On Birthday Celebrations", discount: "20%", expiry: "2025-05-01", icon: <FaBirthdayCake />, iconColor: '#FF6347' },
  { id: 2, title: "On Anniversary Celebrations", discount: "15%", expiry: "2025-04-15", icon: <FaHeart />, iconColor: '#FF69B4' },
  { id: 3, title: "On Group Bookings", discount: "25%", expiry: "2025-03-31", icon: <FaHeart />, iconColor: '#4682B4' },
  { id: 4, title: "On Private Theater Rentals", discount: "10%", expiry: "2025-06-01", icon: <FaHeart />, iconColor: '#8A2BE2' },
];

const GlobalStyle = createGlobalStyle`
  :root {
    --charcoal-black: #2f2f2f;
  }

  html, body {
    height: 100%;
    margin: 0;
    background-color: var(--charcoal-black);
    font-family: Arial, sans-serif;
  }
`;

const PageContainer = styled.div``;

const CouponContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-content: center;
`;

const DiscountWrapper = styled.div`
  background-color: #800080;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const CouponDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #333;
`;

const CouponTitle = styled.h3`
  font-size: 1.2rem;
  color: #800080;
  margin: 0;
`;

const CouponExpiry = styled.span`
  font-size: 0.9rem;
  color: #32CD32;
`;

const PageTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: white;
  margin-bottom: 20px;
  margin-top: 40px;
  border-bottom: 3px solid;
  border-image: linear-gradient(to right, rgb(248, 207, 40), rgb(248, 202, 51), rgb(245, 219, 116));
  border-image-slice: 1;
  padding-bottom: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);  
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

const ModalContent = styled.div`
  background: linear-gradient(145deg, #ffffff, #f2f2f2);  
  padding: 30px;
  border-radius: 15px;
  width: 450px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  transform: scale(${({ isOpen }) => (isOpen ? 1 : 0.9)});
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  color: #800080;
  font-weight: 600;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

const ModalDescription = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const CouponCode = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: #FF6347;  
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background-color: #800080;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.3s;
  
  &:hover {
    background-color: #5b0071;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const CouponCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(10, 0, 0, 0.1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 120px;
  border-top: 2px solid #800080;
  border-left: 2px solid #800080;
  border-right: 2px solid #800080;
  border-bottom: 6px solid #800080;
  clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 95% 50%, 100% 70%, 100% 100%, 0% 100%, 0% 70%, 5% 50%, 0% 30%);
  cursor: pointer; 
`;

const CouponText = styled.p`
  font-size: 1rem;
  margin: 5px 0;
  border-bottom: 2px solid #800080;
  padding-bottom: 5px;
  color: #FF6347;  
  font-weight: bold;
`;

const CouponPage = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null); // State to store the selected coupon
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleCouponClick = (coupon, index) => {
    const couponCode = couponCodesArray[index]; // Use the coupon code from the array based on index
    const couponWithCode = { ...coupon, couponCode }; // Attach the selected coupon code to the coupon

    setSelectedCoupon(couponWithCode);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedCoupon(null); // Clear the selected coupon
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <PageTitle>Coupons</PageTitle>
        <CouponContainer>
          {couponData.map((coupon, index) => {
            const couponWithCode = { ...coupon, couponCode: couponCodesArray[index] }; // Get coupon code from the array
            return (
              <CouponCard key={coupon.id} onClick={() => handleCouponClick(coupon, index)}>
                <DiscountWrapper>
                  <span style={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
                    {coupon.discount}
                  </span>
                </DiscountWrapper>
                <CouponDetails>
                  <CouponTitle>{coupon.title}</CouponTitle>
                  {/* Display static coupon code */}
                  <CouponText>{couponWithCode.couponCode}</CouponText>
                  <CouponExpiry>Expires on: {coupon.expiry}</CouponExpiry>
                </CouponDetails>
              </CouponCard>
            );
          })}
        </CouponContainer>

        {/* Modal for displaying the selected coupon */}
        <Modal isOpen={isModalOpen}>
          <ModalContent>
            <ModalTitle>{selectedCoupon?.title}</ModalTitle>
            <ModalDescription>
              <strong>Discount:</strong> {selectedCoupon?.discount}
              <br />
              <strong>Expires on:</strong> {selectedCoupon?.expiry}
              <br />
              <strong>Description:</strong> {selectedCoupon?.description || "No description available."}
            </ModalDescription>
            {/* Display static coupon code */}
            <CouponCode>{selectedCoupon?.couponCode}</CouponCode>
            <CloseButton onClick={handleCloseModal}>Close</CloseButton>
          </ModalContent>
        </Modal>

        <Footer />
      </PageContainer>
    </>
  );
};

export default CouponPage;
