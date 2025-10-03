import React, { useEffect, useState } from "react";
import "./PopUp.css";
import gift from "../../assets/images/png-transparent-hand-holding-gift-box-gift-box-gift-black-friday-gift-present-box-3d-icon-thumbnail-removebg-preview.png";
import { MdOutlineClose } from "react-icons/md";

const PopUP = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if popup has already been shown
    const hasSeenPopup = localStorage.getItem("promoPopupShown");

    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("promoPopupShown", "true"); // Mark as shown
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="pop-up-overlay">
      <div className="pop-up-container">
        <div className="pop-up-img">
          <img
            src="https://plus.unsplash.com/premium_photo-1661455991722-1a8d2ad718ce?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Promo Gift"
          />
        </div>

        <div className="px-4 text-corner ">
          <div className="days">7 days deal</div>
          <div className="promo-head">Special Delivery Promo!</div>
          <p>
            Shop above <strong>₦40,000</strong> and get a
            <span className="highlight"> 50% discount</span> off your order
            delivery fee.
          </p>
          <button onClick={handleClose}>Start shopping now</button>

          <div className="close-icon" onClick={handleClose}>
            <MdOutlineClose />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUP;
