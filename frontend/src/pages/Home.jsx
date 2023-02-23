import React from "react";

import HeroSection from "../components/ui/HeroSection";

import LiveAuction from "../components/ui/Live-auction/LiveAuction";
import SellerSection from "../components/ui/Seller-section/SellerSection";

import Trending from "../components/ui/Trending-section/Trending";

import StepSection from "../components/ui/Step-section/StepSection";
import "../styles/home.css"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
const Home = () => {
  return (
    <>
     <Header />
      <div className="background-first">
        <HeroSection />
      </div>
      <LiveAuction />
    <Footer/>
    </>
  );
};

export default Home;
