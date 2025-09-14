import React, { useState } from "react";
import "./SignIn.css";
import { LiaOpencart } from "react-icons/lia";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import toast from "react-hot-toast";
const SignIn = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.password.trim()) {
      newErrors.password = "password is required";
    }
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
          `${process.env.REACT_APP_API}/login`,
          formData
        );

        if (response.data.success) {
          localStorage.setItem("auth-token", response.data.token);
          localStorage.setItem("userId", response.data.id);

          setFormData({ email: "", password: "" });
          window.location.replace(`/`);
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
            <div className="form-head">Sign In</div>
            <div className="form-Content">
              Welcome back FizzMart Enter your credentials to continue
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

            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-3 ${errors.password ? "error-input" : ""}`}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-between mt-2 w-100 ">
              <div className="d-flex align-items-center gap-1">
                <div>
                  <input type="checkbox" className="checkBox-container" />
                </div>
                <div className="form-label mt-2">Remember me</div>
              </div>
              <Link to="/Password-reset" className="Forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="submit">
              {loader ? "Loading..." : "Sign In"}
            </button>
            <div className="create-div">
              Don't have an account?{" "}
              <span onClick={() => navigate("/sign-Up")}>Create one </span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
