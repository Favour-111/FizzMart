import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import { LiaOpencart } from "react-icons/lia";
import { LuShoppingBag } from "react-icons/lu";
import { RiUserLine } from "react-icons/ri";
import { GoArrowUpRight, GoHeart, GoSearch } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { PiSquaresFour } from "react-icons/pi";
import { MdKeyboardArrowDown, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiHeart, FiUser } from "react-icons/fi";
import category from "../categories";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router";
import product from "../Product";
import { TfiPackage } from "react-icons/tfi";
import { IoIosHeartEmpty } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { BsBell } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
const NavBar = () => {
  const navigate = useNavigate();
  const {
    getTotalCart,
    product,
    getTotalList,
    notifications,
    categories,
    categoryLoader,
  } = useContext(ShopContext);
  const [mainDrop, setMainDrop] = useState(false);
  const [megaDrop, setMegaDrop] = useState(false);
  const [AccountDrop, setAccountDrop] = useState(false);
  const [logged, setLogged] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [accountMenu, setAccountMenu] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    // filter matching products
    const filtered = product.filter((item) =>
      item.productName.toLowerCase().includes(value)
    );

    // get unique names
    const uniqueNames = [...new Set(filtered.map((item) => item.productName))];

    setResults(uniqueNames);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/Result?search=${encodeURIComponent(query)}`);
    }
  };
  const userId = localStorage.getItem("userId");

  return (
    <div>
      <div className="top-bar">Super Value Deals - Save more with coupons</div>
      <div className="navigation-bar">
        <div className="nav-container">
          <div className="logo">
            <div>
              <LiaOpencart className="logo-icon" />
            </div>
            <div>FizzMart</div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="nav-search-container">
              <div className="Nav-search-input">
                <input
                  type="text"
                  name="product"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Search for product"
                  onKeyDown={handleKeyDown}
                />
                <div className="search-icon">
                  <GoSearch />
                </div>
              </div>
              {results.length > 0 && (
                <div className="search-item shadow-sm">
                  {results.map((name, index) => (
                    <div
                      onClick={() => {
                        navigate(`/Result?search=${encodeURIComponent(name)}`);
                        setResults(false);
                      }}
                      key={index}
                      className="search-item-container"
                    >
                      <div> {name}</div>
                      <div>
                        <GoArrowUpRight />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              onClick={() => navigate("/settings/address")}
              className="location-cont"
            >
              <div>
                <HiOutlineLocationMarker className="mb-1" />
              </div>
              <div>Location</div>
            </div>
          </div>

          <div className="nav-icons">
            <Link to="/Wishlist-page" className="shopping-icons">
              <FiHeart />
              <div className="shopping-counter">{getTotalList()}</div>
            </Link>
            <div
              className="user-menu"
              onMouseOver={() => setAccountMenu(true)}
              onMouseOut={() => setAccountMenu(false)}
            >
              <div className="shopping-icons">
                <FiUser size={23} />
              </div>
              {localStorage.getItem("auth-token") ? (
                <div
                  className={`user-menu-container ${
                    accountMenu ? "active" : ""
                  }`}
                >
                  <Link
                    to={`/settings/profile/${localStorage.getItem("userId")}`}
                    className="user-menu-items"
                  >
                    <div>
                      <FiUser />
                    </div>
                    <div>My Account</div>
                  </Link>

                  <Link to="/settings/notification" className="user-menu-items">
                    <div className="position-relative">
                      <BsBell />
                      {notifications.find((item) => item.isRead === false) && (
                        <div className="bell-active"></div>
                      )}
                    </div>
                    <div>Notification</div>
                  </Link>
                  <Link to="/settings/address" className="user-menu-items">
                    <div>
                      <IoLocationOutline />
                    </div>
                    <div>Address</div>
                  </Link>
                  <Link to="/settings/orders" className="user-menu-items">
                    <div>
                      <TfiPackage />
                    </div>
                    <div>Orders</div>
                  </Link>
                  <div
                    className="user-menu-items"
                    onClick={() => navigate("/wishlist-page")}
                  >
                    <div>
                      <GoHeart />
                    </div>
                    <div>Wishlist</div>
                  </div>
                  <div
                    className="user-menu-items-log-out"
                    onClick={() => {
                      localStorage.removeItem("auth-token");
                      localStorage.removeItem("userId");
                      window.location.replace("/");
                    }}
                  >
                    <div>
                      <RxExit />
                    </div>
                    <div>Log out</div>
                  </div>
                </div>
              ) : (
                <div
                  className={`user-menu-container ${
                    accountMenu ? "active" : ""
                  }`}
                >
                  <Link to="/sign-in" className="user-menu-button">
                    <div>Sign in</div>
                  </Link>
                  <hr />
                  <Link to="/sign-in" className="user-menu-items">
                    <div>
                      <FiUser />
                    </div>
                    <div>My Account</div>
                  </Link>

                  <Link to="/settings/orders" className="user-menu-items">
                    <div>
                      <TfiPackage />
                    </div>
                    <div>Orders</div>
                  </Link>
                  <div
                    className="user-menu-items"
                    onClick={() => navigate("/wishlist-page")}
                  >
                    <div>
                      <GoHeart />
                    </div>
                    <div>Wishlist</div>
                  </div>
                </div>
              )}
            </div>
            <Link to="/cart-page" className="shopping-icons">
              <MdOutlineShoppingCart />
              <div className="shopping-counter">{getTotalCart()}</div>
            </Link>
          </div>
        </div>
        <div className="nav-bottom">
          <ul className="nav-list">
            <li
              className="nav-itm"
              onMouseOver={() => setMainDrop(true)}
              onMouseOut={() => setMainDrop(false)}
            >
              <div className="menu-container shadow-sm">
                <div className="menu-icn">
                  <PiSquaresFour size={17} className="mb-1" />
                </div>
                <div>All Department</div>
              </div>

              <ul
                className={`drop-down-container shadow-sm ${
                  mainDrop ? "Open" : ""
                }`}
              >
                <div className="px-4 py-3">
                  {categories.map((item) => {
                    return (
                      <li
                        onClick={() => navigate(`/category-${item.name}`)}
                        className=""
                      >
                        <img loading="lazy" src={item.image} alt="" />

                        {item.name}
                      </li>
                    );
                  })}
                </div>
              </ul>
            </li>
            <li className="nav-Itm">
              <Link to="/" className="nav-Itm">
                Home
              </Link>{" "}
            </li>

            <li
              className="nav-Itm"
              onMouseOver={() => setAccountDrop(true)}
              onMouseOut={() => setAccountDrop(false)}
            >
              <div className="nav-item-dropdown">
                <div>Account</div>
                <div className="menu-icn">
                  <MdKeyboardArrowDown className="mb-1" />
                </div>
              </div>
              {localStorage.getItem("auth-token") ? (
                <ul
                  className={`account-drop-down shadow-sm ${
                    AccountDrop ? "active" : ""
                  }`}
                >
                  <li>
                    <Link to="/settings/orders" className="account-link">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/settings/profile/${localStorage.getItem("userId")}`}
                      className="account-link"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings/address" className="account-link">
                      Address
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul
                  className={`account-drop-down shadow-sm ${
                    AccountDrop ? "active" : ""
                  }`}
                >
                  <li>
                    <Link className="account-link" to="/sign-in">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link className="account-link" to="/sign-up">
                      SignUp
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="nav-Itm"
              onMouseOver={() => setMegaDrop(true)}
              onMouseOut={() => setMegaDrop(false)} // ✅ works for both nav + dropdown
            >
              <div className="nav-item-dropdown">
                <div>Mega menu</div>
                <div className="menu-icn">
                  <MdKeyboardArrowDown className="mb-1" />
                </div>
              </div>

              <div className={`mega-menu ${megaDrop ? "active" : ""}`}>
                <div className="mega-menu-itm">
                  {categories.map((item) => {
                    return (
                      <div className="menu" onClick={() => setMegaDrop(false)}>
                        <Link
                          to={`/category-${item.name}`}
                          className="mega-menu-head"
                        >
                          {item.name}
                        </Link>
                        <ul>
                          {item.subcategories.map((sub) => {
                            return (
                              <li
                                onClick={() => navigate(`/Subcategory-${sub}`)}
                              >
                                {sub}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>

            <li className="nav-Itm">
              <Link className="nav-Itm" to="/About-page">
                About
              </Link>
            </li>
            <li>
              <Link className="nav-Itm" to="/contact-us">
                Contact
              </Link>
            </li>
            <li>
              <Link className="nav-Itm" to="/store-categories">
                Categories
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
