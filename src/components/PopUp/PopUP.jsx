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
          <img src={gift} alt="Promo Gift" />
        </div>
        <div className="promo-head">🎁 Special Delivery Promo!</div>
        <p>
          Shop above <strong>₦40,000</strong> and get a
          <span className="highlight"> 50% discount</span> off your order
          delivery fee.
        </p>
        <button onClick={handleClose}>Got it</button>
        <div className="pop-up-close" onClick={handleClose}>
          Close
        </div>
        <div className="close-icon" onClick={handleClose}>
          <MdOutlineClose />
        </div>
      </div>
    </div>
  );
};

export default PopUP;
