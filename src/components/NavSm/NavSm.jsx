import React, { useContext, useEffect, useState } from "react";
import "./NavSm.css";
import { LiaOpencart } from "react-icons/lia";
import { RiUserLine } from "react-icons/ri";
import { FiBell, FiHeart, FiUser } from "react-icons/fi";
import { LuMenu, LuShoppingBag, LuUser } from "react-icons/lu";
import {
  IoChevronDown,
  IoCloseOutline,
  IoLocationOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiSquaresFour } from "react-icons/pi";
import category from "../categories";
import { Link, useNavigate } from "react-router";
import { MdChevronRight, MdOutlineShoppingCart } from "react-icons/md";
import { ShopContext } from "../Context/ShopContext";
import product from "../Product";
import { GoArrowUpRight, GoHeart } from "react-icons/go";
import { BiBell } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { TfiPackage } from "react-icons/tfi";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineEquals } from "react-icons/hi2";
import { RxExit, RxHamburgerMenu } from "react-icons/rx";
import { BsBell } from "react-icons/bs";
import toast from "react-hot-toast";
import axios from "axios";
const NavSm = () => {
  const navigate = useNavigate();
  const {
    getTotalCart,
    product,
    notifications,
    getTotalList,
    categories,
    categoryLoader,
  } = useContext(ShopContext);

  const [openNav, setOpenNav] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  // "category", "account", "mega" or null

  const [AccountDrop, setAccountDrop] = useState(false);
  // {
  //   localStorage.getItem("auth-token")
  //     ? setAccountDrop(false)
  //     : setAccountDrop(true);
  // }
  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
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
      setResults(false);
      setOpenNav(false);
    } else if (e.key === "return") {
      navigate(`/Result?search=${encodeURIComponent(query)}`);
      setResults(false);
      setOpenNav(false);
    }
  };
  const userId = localStorage.getItem("userId");

  return (
    <div className="nav-sm">
      <div className="nav-sm-container mt-2">
        <div className={`nav-sm-menu-container ${openNav ? "active" : ""}`}>
          <div className="p-3">
            {/* Top Logo + Close */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="logo-sm">
                <div>
                  <LiaOpencart className="logo-icon" />
                </div>
                <div className="logo-txt">FizzMart</div>
              </div>
              <IoCloseOutline onClick={() => setOpenNav(false)} size={28} />
            </div>

            {/* Search */}
            <div className="nav-search-container-sm">
              <div className="menu-search">
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Search for product"
                  onKeyDown={handleKeyDown}
                />
                <IoSearchOutline />
              </div>
              {results.length > 0 && (
                <div className="menu-item-search-sm shadow-sm">
                  <div
                    onClick={() => {
                      navigate(`/Result?search=${encodeURIComponent(query)}`);
                      setResults(false);
                      setOpenNav(false);
                    }}
                    className="search-item-container"
                  >
                    <div>{query}</div>
                    <div>
                      <GoArrowUpRight />
                    </div>
                  </div>
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

            {/* Location */}
            <div
              onClick={() => navigate("/settings/address")}
              className="menu-location"
            >
              <HiOutlineLocationMarker />
              <div>Pick Location</div>
            </div>

            {/* All Departments */}
            <div
              className="menu-container-sm"
              onClick={() => toggleMenu("category")}
            >
              <div className="menu-icn-sm">
                <PiSquaresFour size={17} className="mb-1" />
              </div>
              <div>All Department</div>
            </div>

            <div
              className={`department-sm ${
                activeMenu === "category" ? "active" : ""
              }`}
            >
              <div className="px-2 py-0">
                {categories.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      to={`/category-${item.name}`}
                      onClick={() => setOpenNav(false)}
                      className="department-sm-itm"
                    >
                      <img loading="lazy" src={item.image} alt={item.name} />
                      <div>{item.name}</div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Navigation List */}
            <div>
              <ul className="nav-sm-list-item-container">
                <div>
                  <li>
                    <Link className="nav-sm-list-item" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/store-categories" className="nav-sm-list-item">
                      Categories
                    </Link>
                  </li>
                  {/* Account */}
                  <li onClick={() => toggleMenu("account")}>
                    <Link className="nav-sm-list-item">Account</Link>
                    <div>
                      {activeMenu === "account" ? (
                        <IoChevronDown />
                      ) : (
                        <MdChevronRight />
                      )}
                    </div>
                  </li>
                </div>

                <ul
                  className={`nav-sm-list-dropdown ${
                    activeMenu === "account" ? "active" : ""
                  }`}
                >
                  {!localStorage.getItem("auth-token") ? (
                    <div className="py-2  ">
                      <li>
                        <Link
                          className="nav-sm-list-dropdown-link"
                          to="/sign-in"
                        >
                          <LuUser />
                          <div>Sign In</div>
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="nav-sm-list-dropdown-link"
                          to="/sign-in"
                        >
                          <TfiPackage />
                          <div>Orders</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="nav-sm-list-dropdown-link"
                          to="/sign-in"
                        >
                          <IoMdHeartEmpty />
                          <div>Wishlist</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="nav-sm-list-dropdown-link"
                          to="/sign-in"
                        >
                          <BiBell />
                          <div>Notification</div>
                        </Link>
                      </li>
                    </div>
                  ) : (
                    <div className="py-2  ">
                      <li>
                        <Link
                          className="nav-sm-list-dropdown-link"
                          to={`/settings/profile/${localStorage.getItem(
                            "userId"
                          )}`}
                        >
                          <LuUser />
                          <div>My Account</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="nav-sm-list-dropdown-link"
                          to="/settings/notification"
                        >
                          <BiBell />
                          <div>Notification</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="nav-sm-list-dropdown-link"
                          to="/settings/address"
                        >
                          <CiLocationOn />
                          <div>Address</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="nav-sm-list-dropdown-link"
                          to="/settings/orders"
                        >
                          <TfiPackage />
                          <div>Orders</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="nav-sm-list-dropdown-link"
                          to="/settings/Wishlist-page"
                        >
                          <IoMdHeartEmpty />
                          <div>Wishlist</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="nav-sm-list-dropdown-link"
                          to="/settings/notification"
                        >
                          <BiBell />
                          <div>Notification</div>
                        </Link>
                      </li>
                    </div>
                  )}
                </ul>

                {/* Mega Menu */}
                <li onClick={() => toggleMenu("mega")}>
                  <Link className="nav-sm-list-item">Mega menu</Link>
                  <div>
                    {activeMenu === "mega" ? (
                      <IoChevronDown />
                    ) : (
                      <MdChevronRight />
                    )}
                  </div>
                </li>

                <div
                  className={`mega-menu-sm ${
                    activeMenu === "mega" ? "active" : ""
                  }`}
                >
                  {categories.map((item) => {
                    return (
                      <div key={item.name} className="mt-3">
                        <Link
                          to={`/category-${item.name}`}
                          className="mega-sm-head"
                        >
                          {item.name}
                        </Link>
                        <ul className="mt-2">
                          {item.subcategories.map((sub) => {
                            return (
                              <li
                                key={sub.name}
                                onClick={() => navigate(`/Subcategory-${sub}`)}
                              >
                                <Link className="Mega-Link">{sub}</Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                <li>
                  <Link className="nav-sm-list-item">About</Link>
                </li>
                <li>
                  <Link className="nav-sm-list-item" to="/contact-us">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="nav-sm-list-item" to="/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navbar */}
        <div className="shopping-icons-sm" onClick={() => setOpenNav(true)}>
          <RxHamburgerMenu size={23} />
        </div>
        <div>
          <Link to="/" className="logo-sm">
            <div>
              <LiaOpencart className="logo-icon" />
            </div>
            <div>FizzMart</div>
          </Link>
        </div>

        <div className="nav-sm-icons">
          <Link to="/Wishlist-page" className="shopping-icons-sm">
            <FiHeart size={23} />
            <div className="shopping-counter-sm">{getTotalList()}</div>
          </Link>
          <Link
            // to={`${
            //   localStorage.getItem("auth-token")
            //     ? `/settings/profile/${localStorage.getItem("userId")}`
            //     : "/sign-in"
            // }`}
            onClick={() =>
              accountMenu === true
                ? setAccountMenu(false)
                : setAccountMenu(true)
            }
            onMouseOver={() => setAccountMenu(true)}
            onMouseOut={() => setAccountMenu(false)}
            className="shopping-icons-sm"
          >
            <FiUser size={26} />
          </Link>
          {localStorage.getItem("auth-token") ? (
            <div
              className={`user-menu-container ${accountMenu ? "active" : ""}`}
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
              className={`user-menu-container ${accountMenu ? "active" : ""}`}
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

              <Link to="/sign-in" className="user-menu-items">
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
          <Link to="/cart-page" className="shopping-icons-sm">
            <MdOutlineShoppingCart size={23} />
            <div className="shopping-counter-sm">
              <div>{getTotalCart()}</div>
            </div>
          </Link>
          {/* <Link to="/cart-page" className="shopping-icons-sm">
            <FiBell size={23} />
          </Link> */}
        </div>
      </div>

      {/* Bottom Search */}
      <div className="nav-search">
        <div className="nav-search-container-sm">
          <div className="nav-bar-input-sm ">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search for product"
              onKeyDown={handleKeyDown}
            />
            <IoSearchOutline />
          </div>
          {results.length > 0 && (
            <div className="search-item-sm shadow-sm">
              <div
                onClick={() => {
                  navigate(`/Result?search=${encodeURIComponent(query)}`);
                  setResults(false);
                }}
                className="search-item-container"
              >
                <div>{query}</div>
                <div>
                  <GoArrowUpRight />
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default NavSm;
