import React, { useState } from "react";
import "./FAQ.css";
import NavBar from "../../components/NavBar/NavBar";
import NavSm from "../../components/NavSm/NavSm";
import PopUP from "../../components/PopUp/PopUP";
import faq from "../../components/faq";
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div>
        <NavBar />
        <NavSm />
        <PopUP />
        <div className="home-container">
          <div className="faq-container">
            <div className="faq-head">Frequently asked question</div>
            <div className="accordion-container">
              {faq.map((faq, index) => (
                <div key={index} className="faq-item ">
                  <div
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.q}
                    <span
                      className={`faq-icon ${
                        openIndex === index ? "open" : ""
                      }`}
                    >
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>
                  <div
                    className={`faq-item-text ${
                      openIndex === index ? "open" : ""
                    }`}
                  >
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
