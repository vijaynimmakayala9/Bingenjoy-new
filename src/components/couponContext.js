import React, { createContext, useState, useContext } from "react";

// Create Context
const CouponContext = createContext();

// Create a provider for the context
export const CouponProvider = ({ children }) => {
  const [couponCode, setCouponCode] = useState("");

  // Function to update coupon code
  const handleCouponChange = (code) => {
    setCouponCode(code);
  };

  return (
    <CouponContext.Provider value={{ couponCode, handleCouponChange }}>
      {children}
    </CouponContext.Provider>
  );
};

// Custom hook to use the coupon context
export const useCoupon = () => useContext(CouponContext);
