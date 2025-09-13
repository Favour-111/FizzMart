import React, { useEffect, useState } from "react";
import "./EmailVerify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading
  const navigate = useNavigate();
  const param = useParams();
  const api = process.env.REACT_APP_API;
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = `${api}/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };
    verifyEmail();
  }, [param]);

  if (loading) {
    return (
      <div className="loading-cont">
        <p>Verifying your email, please wait...</p>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {validUrl ? (
        <div className="verified-cont">
          <div className="verified-head">Email Verified Successfully</div>
          <div className="verified-content">
            Please log in to your account to continue shopping and enjoy a
            seamless experience with access to your cart, wishlist, and
            exclusive deals.
          </div>
          <div className="verfied-img ">
            <img
              src="https://freepngimg.com/save/167774-logo-verification-free-png-hq/512x512"
              alt="Email Verified"
              loading="lazy"
            />
          </div>
          <button
            className="verified-login"
            onClick={() => navigate("/sign-in")}
          >
            sign in
          </button>
        </div>
      ) : (
        <div className="no-found">
          <div className="not-found-text">404</div>
          <div className="cont-not-found">invalid token login again</div>
        </div>
      )}
    </div>
  );
};

export default EmailVerify;
