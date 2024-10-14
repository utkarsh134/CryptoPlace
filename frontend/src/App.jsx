import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Footer from "./components/Footer/Footer";
import Compare from "./pages/Compare/Compare";
import SignupPage from "./pages/Signup/SignupPage";
import SigninPage from "./pages/Signin/SigninPage";
import SubscriptionPage from "./pages/Payment/SubscriptionPage";
import ContactPage from "./pages/Contact/ContactPage";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:coinId" element={<Coin />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="/user/signin" element={<SigninPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
