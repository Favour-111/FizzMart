import React from "react";
import "./AboutSection.css";
import { LuClock4 } from "react-icons/lu";
import { GoGift } from "react-icons/go";
import { TfiPackage } from "react-icons/tfi";
import { FiRefreshCcw } from "react-icons/fi";
const AboutSection = () => {
  return (
    <div>
      <div className="AboutSection-container">
        <div className="AboutSection-Item">
          <div className="AboutSection-icon">
            <LuClock4 />
          </div>
          <div className="AboutSection-Head">24 hours grocery now</div>
          <div className="AboutSection-Section">
            Get your order delivered to your doorstep at the earliest from
            FreshCart pickup stores near you.
          </div>
        </div>
        <div className="AboutSection-Item">
          <div className="AboutSection-icon">
            <GoGift />
          </div>
          <div className="AboutSection-Head">Best Prices & Offers</div>
          <div className="AboutSection-Section">
            Cheaper prices than your local supermarket, great cashback offers to
            top it off. Get best pricess & offers.
          </div>
        </div>
        <div className="AboutSection-Item">
          <div className="AboutSection-icon">
            <TfiPackage />
          </div>
          <div className="AboutSection-Head">Wide Assortment</div>
          <div className="AboutSection-Section">
            Choose from 5000+ products across food stuffs, Kitchen Items,
            Drinks, Wine and Spirit & other categories.
          </div>
        </div>
        <div className="AboutSection-Item">
          <div className="AboutSection-icon">
            <FiRefreshCcw />
          </div>
          <div className="AboutSection-Head">Easy Returns</div>
          <div className="AboutSection-Section">
            Not satisfied with a product? Return it at the doorstep & get a
            refund within hours.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
