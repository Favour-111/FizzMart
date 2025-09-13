import React from "react";
import "./Contact.css";
import NavBar from "../../components/NavBar/NavBar";
import NavSm from "../../components/NavSm/NavSm";
import Footer from "../../components/Footer/Footer";
import BackToTop from "../../components/BackToTop/BackToTop";
const Contact = () => {
  return (
    <div>
      <NavBar />
      <NavSm />
      <div className="contact-container">
        <div>
          <div className="Contact-header">
            get in <span> touch</span>
          </div>
          <div className="contact-content">
            please select a topic below relates to your inquiry. if you don't
            find out what you need fill out our contact form
          </div>
        </div>
        <div className="contact-info">
          <div className="contact-info-itm shadow-sm">
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/mail--v1.png"
              alt="mail--v1"
            />
            <div className="contact-info-head">Mail & website</div>
            <div className="d-flex align-items-center gap-1 contact-content-item">
              <div>
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/material/24/mail.png"
                  alt="mail"
                />
              </div>
              <div>peterminelove@gmail.com</div>
            </div>
            <div className="d-flex align-items-center gap-1 contact-content-item">
              <div>
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/ios-glyphs/30/domain.png"
                  alt="domain"
                />
              </div>
              <div>www.FizzMart.com</div>
            </div>
          </div>
          <div className="contact-info-itm shadow-sm">
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/cute-clipart/64/phone.png"
              alt="phone"
            />
            <div className="contact-info-head mt-2">Contact Information</div>

            <div className="d-flex align-items-center gap-1 contact-content-item">
              <div>
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/ios-glyphs/30/phone.png"
                  alt="phone"
                />
              </div>
              <div>+8023911608</div>
            </div>
          </div>
          <div className="contact-info-itm shadow-sm">
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/marker.png"
              alt="marker"
            />
            <div className="contact-info-head mt-2">Address</div>
            <div className="d-flex gap-1 contact-content-item">
              <div>
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/material-sharp/50/marker.png"
                  alt="marker"
                />
              </div>
              <div>
                no 35 joel ogunaike
                <br /> ikeja lagos state
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-send">
        <div className="row w-100">
          <div className="col-md-6 col-sm-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127560.0824593296!2d-77.36562252411417!3d40.04734536415947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c0fb959e00409f%3A0x2cd27b07f83f6d8d!2sNew%20Jersey%2C%20USA!5e0!3m2!1sen!2sng!4v1737116352455!5m2!1sen!2sng"
              width="100%"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="contact-form">
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Email Address" />
              <input type="text" placeholder="Phone" />
              <textarea name="" placeholder="message" id=""></textarea>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Contact;
