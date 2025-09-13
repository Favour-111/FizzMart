import React, { useState } from "react";
import "./Reset.css";
import { LiaOpencart } from "react-icons/lia";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import toast from "react-hot-toast";
const Reset = () => {
  const { id, token } = useParams();

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "password is required";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "password do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoader(true);
        const response = await axios.post(
          `${process.env.REACT_APP_API}/reset-password/${id}/${token}`,
          { password: formData.password }
        );

        if (response.data.success) {
          toast.success("password reset successful");
          setTimeout(() => {
            navigate("/sign-in");
          }, 2000);
          setFormData({ password: "" });
        }
      } catch (error) {
        console.log("Registration error:", error);
        toast.error(error.response?.data?.msg || "Something went wrong!");
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div>
      <div className="nav-form">
        <Link className="logo" to="/">
          <div>
            <LiaOpencart className="logo-icon" />
          </div>
          <div>FizzMart</div>
        </Link>
        <div className="account-switch">
          Don't have an account?{" "}
          <span onClick={() => navigate("/sign-Up")}>Sign Up</span>
        </div>
      </div>
      <div className="form-container-background">
        <div className="form-img">
          <img
            src="https://png.pngtree.com/png-clipart/20230118/original/pngtree-reset-password-to-gain-more-secure-account-png-image_8920326.png"
            alt=""
          />
        </div>
        <div className="sing-in-container">
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-head">Reset your password?</div>
            <div className="form-Content">
              Enter a new password with at least 8 characters, including
              letters, numbers, or symbols.
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="input Passwords"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error-input" : ""}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>
            <div className="form-group">
              <input
                name="confirmPassword"
                type="password"
                placeholder="confirm Passwords"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error-input" : ""}
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
            </div>

            <button type="submit" className="submit">
              {loader ? "Loading..." : "Reset Password"}
            </button>
            <button className="back-btn" onClick={() => navigate("/sign-in")}>
              Back
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reset;
