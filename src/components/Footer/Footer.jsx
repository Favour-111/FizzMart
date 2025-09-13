import React from "react";
import "./Footer.css";
import { Link } from "react-router";
import category from "../categories";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
const Footer = () => {
  return (
    <div>
      <div className="Footer">
        <div className="Footer-background">
          <div className="footer-item">
            <div className="footer-item-header">Categories</div>
            <ul className="footer-list">
              {category.map((item) => {
                return (
                  <li>
                    <Link to={`/category-${item.name}`} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-item">
            <div className="footer-item-header">Get to know us</div>
            <ul className="footer-list">
              <li>
                <Link className="footer-link" to="/About-page">
                  Company
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/ABout-page">
                  Our Value
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/contact-us">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/About-us">
                  About
                </Link>
              </li>
              {/* <li>
                <Link className="footer-link">Help center</Link>
              </li> */}
            </ul>
          </div>
          <div className="footer-item">
            <div className="footer-item-header">For Consumers</div>
            <ul className="footer-list">
              <li>
                <Link className="footer-link">Payments</Link>
              </li>
              <li>
                <Link className="footer-link">Shipping</Link>
              </li>
              <li>
                <Link className="footer-link">Product Returns</Link>
              </li>
              <li>
                <Link className="footer-link">FAQ</Link>
              </li>
              <li>
                <Link className="footer-link">Shop Checkout</Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <div className="footer-item-header">Become a Shopper</div>
            <ul className="footer-list">
              <li>
                <Link className="footer-link">Shopper Opportunities</Link>
              </li>
              <li>
                <Link className="footer-link">Become a Shopper</Link>
              </li>
              <li>
                <Link className="footer-link">Earnings</Link>
              </li>
              <li>
                <Link className="footer-link">Ideas & Guides</Link>
              </li>
              <li>
                <Link className="footer-link">New Retailers</Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <div className="footer-item-header">Freshcart programs</div>
            <ul className="footer-list">
              <li>
                <Link className="footer-link">Freshcart programs</Link>
              </li>
              <li>
                <Link className="footer-link">Gift Cards</Link>
              </li>
              <li>
                <Link className="footer-link">Promos & Coupons</Link>
              </li>
              <li>
                <Link className="footer-link">Freshcart Ads</Link>
              </li>
              <li>
                <Link className="footer-link">Careers</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-card-details">
          <div className="texts">Payent Methods</div>
          <div className="d-flex align-items-center gap-2">
            <div>
              <img
                src="https://pngimg.com/d/mastercard_PNG7.png"
                width="30px"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://static.vecteezy.com/system/resources/previews/020/975/576/non_2x/visa-logo-visa-icon-transparent-free-png.png"
                alt=""
                width="30px"
              />
            </div>
            <div>
              <img
                src="https://vectorseek.com/wp-content/uploads/2023/10/Opay-New-2023-Logo-Vector.svg--300x99.png"
                alt=""
                width="30px"
              />
            </div>
            <div>
              <img
                src="https://download.logo.wine/logo/PayPal/PayPal-Logo.wine.png"
                alt=""
                width="70px"
              />
            </div>
          </div>
        </div>
        <div className="footer-social-container">
          <div className="copyright">
            © 2022 - 2025 FizzMart eCommerce Template. All rights reserved.
            Powered by
            <br />
            <Link className="portfolio-link">Horbah's tech</Link>
          </div>
          <div className="social-item-container">
            <div className="social-text">Follow us on</div>
            <div className="social-item">
              <FaInstagram />
            </div>
            <div className="social-item">
              <IoLogoTwitter />
            </div>
            <div className="social-item">
              <FaFacebook />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
