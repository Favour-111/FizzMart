import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Settings.css"; // for styling active link
import NavBar from "../../components/NavBar/NavBar";
import NavSm from "../../components/NavSm/NavSm";
import Footer from "../../components/Footer/Footer";
import { FiUser } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { TfiPackage } from "react-icons/tfi";
import { GoBell } from "react-icons/go";
import { RxExit } from "react-icons/rx";
import { RiCloseLargeFill, RiMenuFold4Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  return (
    <div>
      <NavBar />
      <NavSm />
      <div className="home-container">
        <div className="settings-layout">
          {/* Sidebar */}
          {isOpen && (
            <div
              className={`overlay-side`}
              onClick={() => setIsOpen(false)}
            ></div>
          )}
          <aside className={`settings-sidebar  ${isOpen ? "opened" : ""}`}>
            <div className="side-header">
              <div>Account Settings</div>
              <div
                onClick={() => setIsOpen(false)}
                style={{
                  cursor: "pointer",
                }}
              >
                <RiCloseLargeFill />
              </div>
            </div>
            <nav>
              <ul>
                <li>
                  <NavLink
                    to={`profile/${userId}`}
                    className={`profile-item ${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <div className="mb-1">
                      <FiUser />
                    </div>
                    <div>My Profile</div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="address"
                    className={`profile-item ${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <div className="mb-1">
                      <IoLocationOutline />
                    </div>
                    <div>Address</div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="orders"
                    className={`profile-item ${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <div className="mb-1">
                      <TfiPackage />
                    </div>
                    <div>My orders</div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="notification"
                    className={`profile-item ${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <div className="mb-1">
                      <GoBell />
                    </div>
                    <div>Notification</div>
                  </NavLink>
                </li>
                <div className="side-line"></div>
                <div
                  className="side-logout"
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
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="settings-content">
            <div className="settings-side-sm-nav">
              <div>Account settings</div>
              <div className="side-menu-open" onClick={() => setIsOpen(true)}>
                <RiMenuFold4Line />
              </div>
            </div>
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
