import React, { useState } from "react";
import "./ForgotPass.css";
import { LiaOpencart } from "react-icons/lia";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import toast from "react-hot-toast";
const ForgotPass = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
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
          `${process.env.REACT_APP_API}/forgot_password`,
          formData
        );

        if (response.data.success) {
          setFormData({ email: "" });
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
            <div className="form-head">Forgot your password?</div>
            <div className="form-Content">
              Please enter the email address associated with your account and We
              will email you a link to reset your password.
            </div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error-input" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
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

export default ForgotPass;
