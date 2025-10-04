import React, { useState } from "react";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Contact.css";

const Contact = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="contact-container">
      {/* Contact Icon Button */}
      <div className="contact-icn shadow" onClick={() => setOpened(!opened)}>
        {opened ? (
          <MdOutlineClose size={18} />
        ) : (
          <RiCustomerService2Line size={18} />
        )}
      </div>

      {/* Social Media Icons (Animated on Open) */}
      <div className={`social-icons ${opened ? "open" : ""}`}>
        <div className="face-book">
          <FaFacebookF size={20} />
        </div>
        <div className="twitter">
          <FaXTwitter size={20} />
        </div>
        <div className="instagram">
          <FaInstagram size={20} />
        </div>
        <div className="tik-tok">
          <FaTiktok size={20} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
