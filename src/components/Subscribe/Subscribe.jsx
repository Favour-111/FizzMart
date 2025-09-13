import React from "react";
import "./Subscribe.css";
import AboutSection from "../AboutSection/AboutSection";
const Subscribe = () => {
  return (
    <div>
      <AboutSection />
      <div className="subscribe-body">
        <div className="subscribe-overlay">
          <div className="overlay-left">
            <div className="over-lay-sub-head">
              discount for your first order
            </div>
            <div className="overlay-head">
              Get top deals, latest trends, and more.
            </div>
            <div className="overlay-content">
              Join our email subscription now to get updates on promotions and
              coupons.
            </div>
            <div className="overlay-input-container">
              <input type="text" placeholder="Email Address" />
              <button>Sign Up</button>
            </div>
          </div>
          <div className="overlay-right">
            <img
              src="https://wallpapers.com/images/hd/assorted-cold-drinks-collection-3mgji2i0uycrhzni.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
