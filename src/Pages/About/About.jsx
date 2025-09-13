import React from "react";
import "./About.css";
import NavBar from "../../components/NavBar/NavBar";
import NavSm from "../../components/NavSm/NavSm";
import store from "../../assets/images/store.png";
import basket from "../../assets/images/shopping-basket.png";
import Order from "../../assets/images/online-order.png";
import Footer from "../../components/Footer/Footer";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const About = () => {
  const why = [
    " Wide Variety – Everything you need in one store",
    "Best Prices – Deals you won’t find anywhere else",
    "Fast Delivery – Straight to your doorstep",
    "Trusted Quality – Only the best products for our customers",
  ];
  const aboutSections = [
    {
      image: basket,
      heading: "Grow my business with Freshcart",
      text: "Partner with us and showcase your products to thousands of customers who shop daily.",
      buttonText: "Grow My Business",
    },
    {
      image: store,
      heading: "Advertise my brand on Freshcart",
      text: "Boost your visibility with our platform and connect with customers who love quality brands.",
      buttonText: "Advertise Now",
    },
    {
      image: Order,
      heading: "Learn more about Freshcart",
      text: "Discover how Freshcart makes shopping easier, faster, and more affordable for everyone.",
      buttonText: "Learn More",
    },
  ];

  return (
    <div>
      <NavBar />
      <NavSm />
      <div className="home-container">
        <div className="about">
          <div className="about-flex">
            <div className="about-text">
              <div className="about-head">
                Welcome to FizzMart Your One-Stop Online Store
              </div>
              <div className="about-content">
                We started with a simple mission: to make shopping easy,
                affordable, and enjoyable for everyone. Over the years, we’ve
                grown into a trusted online store where quality meets
                convenience. Whether you’re stocking up your home bar, grabbing
                groceries, or shopping for special occasions, we’ve got you
                covered.
              </div>
            </div>
            <div className="about-img">
              <img
                src="https://media.istockphoto.com/id/1221101939/photo/delivery-concept-asian-man-hand-accepting-a-delivery-boxes-from-professional-deliveryman-at.jpg?s=612x612&w=0&k=20&c=jvZ_phbXmzOrCCZiGn8ZQO99a5skBJlclbujI5jGam8="
                alt=""
              />
            </div>
          </div>
          <div className="about-fizzmart">
            <div className="ready-text">Ready To Get Started?</div>
            <div className="about-contents-item">
              {aboutSections.map((item) => {
                return (
                  <div className="about-item">
                    <div className="about-item-img">
                      <img loading="lazy" src={item.image} alt="" />
                    </div>
                    <div className="about-item-head">{item.heading}</div>
                    <div className="about-item-content">{item.text}</div>
                    <button className="about-item-button">
                      {item.buttonText}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="why-container">
            <div className="why-text">Why choose us?</div>
            <div className="why">
              <div className="why-container-items">
                {why.map((item) => {
                  return (
                    <div className="why-item">
                      <IoMdCheckmarkCircleOutline
                        size={18}
                        className="mb-1 me-2 text-success"
                      />{" "}
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
