import React, { useState } from "react";
import "./SignUp.css";
import { LiaOpencart } from "react-icons/lia";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    FullName: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
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
    if (!formData.FullName) {
      newErrors.FullName = "FullName is required";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!Number(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number should be a number";
    } else if (!/^\+?\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number (10–15 digits)";
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
          `${process.env.REACT_APP_API}/users`,
          formData
        );

        if (response.data.success) {
          alert(
            "User created successfully! Check your email for verification."
          );
          navigate("/sign-in");
        }
      } catch (error) {
        console.log("Registration error:", error);
        alert(error.response?.data?.msg || "Something went wrong!");
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
          Already have an account?{" "}
          <span onClick={() => navigate("/sign-in")}>Sign In</span>
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
            <div className="form-head">Sign Up</div>
            <div className="form-Content">
              Welcome to Fizz Mart! Enter your details to get started.
            </div>
            <div className="row">
              <div className="form-group col-6">
                <input
                  name="FullName"
                  type="text"
                  placeholder="FullName"
                  value={formData.FullName}
                  onChange={handleChange}
                  className={` ${errors.FullName ? "error-input" : ""}`}
                />
                {errors.FullName && (
                  <p className="error-text">{errors.FullName}</p>
                )}
              </div>
              <div className="form-group col-6">
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
            </div>
            <div className="form-group ">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={` ${errors.password ? "error-input" : ""}`}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>
            <div className="form-group ">
              <input
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={` ${errors.phoneNumber ? "error-input" : ""}`}
              />
              {errors.phoneNumber && (
                <p className="error-text">{errors.phoneNumber}</p>
              )}
            </div>

            <button type="submit" className="submit">
              {loader ? "loading" : "Register"}
            </button>
            <div className="create-div">
              Have an account?{" "}
              <span onClick={() => navigate("/sign-in")}> Sign In</span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
