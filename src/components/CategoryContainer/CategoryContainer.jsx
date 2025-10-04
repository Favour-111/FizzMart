import React, { useContext, useEffect, useState } from "react";
import "./CategoryContainer.css";
import category from "../categories";
import Slider from "react-slick";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import CategorySkelenton from "../CategorySkelenton/CategorySkelenton";
import { ShopContext } from "../Context/ShopContext";
const CategoryContainer = () => {
  const { categories, categoryLoader } = useContext(ShopContext);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true, // ✅ Enable auto-scrolling
    autoplaySpeed: 3000, // ✅ Time between transitions (3 seconds)
    pauseOnHover: false, // ❌ Try disabling hover pause to check if it works
    pauseOnFocus: false, //
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 1181,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const navigate = useNavigate();
  return (
    <div className="CategoryContainer">
      <div className="header-sub-head">Categories</div>
      <div className="New-ProductHead">Shop by Top Categories</div>
      {!categoryLoader ? (
        <div className="Category-body-container">
          <Slider {...settings}>
            {categories.map((item) => {
              return (
                <div
                  onClick={() => {
                    navigate(`category-${item.name}`);
                  }}
                  className="category"
                >
                  <div className="category-item shadow-sm">
                    <div>
                      <img loading="lazy" src={item.image} alt="" />
                    </div>
                  </div>
                  <div className="category-list-name">{item.name}</div>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <div className="mt-3 Category-body-container d-flex align-items-center justify-content-center gap-2">
          <CategorySkelenton />
          <CategorySkelenton />
          <CategorySkelenton />
          <CategorySkelenton />
          <CategorySkelenton />
          <CategorySkelenton />
        </div>
      )}
    </div>
  );
};

export default CategoryContainer;
