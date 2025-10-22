import React from "react";
import { Routes, Route } from "react-router-dom";

// Import components
import Home from "./components/Home";
import Terms from "./components/Terms";
import Faqs from "./components/Faqs";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Enquiry from "./components/Enquiry";
import Reviews from "./components/Reviews";
import Checkout from "./components/Checkout";
import Theaters from "./components/Theaters";
import "react-toastify/dist/ReactToastify.css";
import RefundPolicy from "./components/RefundPolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import BookingDetails from "./components/BookingDetails";
import Cakes from "./components/Cakes";
import Basicplan from "./components/Basicplan";
import Occassions from "./components/Occassions";
import CakesComponent from "./components/CakesComponent";
import AddOns from "./components/AddOns";
import BookingSummary from "./components/BookingSummary";
import OurServices from './components/OurServices';
import OccationPage from './components/OccationPage';
// ComboForm
import ComboForm from "./components/ComboForm";
import ComboPlans from "./components/ComboPlans";
import ComboOccassions from "./components/ComboOccassions";
import ComboBooking from "./components/ComboBooking";
// ThankYou Page
import ThankYou from "./components/ThankYou";
import PaymentFail from "./components/PaymentFail";
import PaymentProcessing from "./components/PaymentProcessing";
import Food from "./components/Food";
import CouponPage from "./components/Coupon";

// Import CouponContext
import { CouponProvider } from "./components/couponContext";
import ScrollToTop from "./pages/ScrollToTop";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <CouponProvider> {/* Wrap the entire application to provide context */}
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourservices" element={<OurServices/>} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/booknow" element={<Theaters />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/RefundPolicy" element={<RefundPolicy />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/BookingDetails" element={<BookingDetails />} />
        <Route path="/Faqs" element={<Faqs />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/addons" element={<Cakes />} />
        <Route path="/Basicplan" element={<Basicplan />} />
        <Route path="/Occassions" element={<Occassions />} />
        <Route path="/CakesComponent" element={<CakesComponent />} />
        <Route path="/AddOnscomponent" element={<AddOns />} />
        <Route path="/BookingSummary" element={<BookingSummary />} />
        <Route path="/occationpage" element={<OccationPage/>} />
        {/* Combo Plans */}
        <Route path="/ComboForm" element={<ComboForm />} />
        <Route path="/ComboOccassions" element={<ComboOccassions />} />
        <Route path="/ComboPlans" element={<ComboPlans />} />
        <Route path="/ComboBooking" element={<ComboBooking />} />
        <Route path="/Food" element={<Food />} />

        {/* ThankYou Page */}
        <Route path="/payment-success" element={<ThankYou />} />
        
        {/* payment processing */}
        <Route path="/payment-processing" element={<PaymentProcessing />} />

        {/* Payment Fail */}
        <Route path="/payment-fail" element={<PaymentFail />} />
        <Route path="/coupons" element={<CouponPage />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
      </Routes>
    </CouponProvider>
  );
}

export default App;
