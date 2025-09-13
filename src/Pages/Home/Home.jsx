import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import { LuMoveRight } from "react-icons/lu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CategoryContainer from "../../components/CategoryContainer/CategoryContainer";
import NavSm from "../../components/NavSm/NavSm";
import NewProduct from "../../components/NewProduct/NewProduct";
import Item from "../../components/Item/Item";
import product from "../../components/Product";
import Special from "../../components/Special/Special";
import BestSellers from "../../components/BestSellers/BestSellers";
import Subscribe from "../../components/Subscribe/Subscribe";
import AboutSection from "../../components/AboutSection/AboutSection";
import Footer from "../../components/Footer/Footer";
import BackToTop from "../../components/BackToTop/BackToTop";
import chicken from "../../assets/images/43-430088_chicken-png-free-commercial-use-images-chicken-meat.png";
import PopUP from "../../components/PopUp/PopUP";
import { useNavigate } from "react-router";
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // ✅ Enable auto-scrolling
  autoplaySpeed: 3000, // ✅ Wait for 3 seconds before scrolling
  pauseOnHover: true, // ✅ Pause if user hovers
  pauseOnFocus: true, // ✅ Pause if user interacts
};
const Home = () => {
  const navigate = useNavigate();
  const bannerItems = [
    // {
    //   image: chicken,
    //   offer: "35",
    //   Head: "Premium Drinks at Unbeatable Prices",
    //   Price: "3,500",
    //   ButtonText: "Shop This Week Offer",
    //   bannerClass: "Left2",
    // },
    {
      image: chicken,
      offer: "20",
      Head: "Best Chicken Deals, Fresh at Low Price!",
      Price: "2,800",
      ButtonText: "Grab This Week Deal",
      bannerClass: "Left1",
    },
  ];
  return (
    <div>
      <NavBar />
      <NavSm />
      <PopUP />
      <div className="home-container">
        <div className="banners-container">
          <div className="first-banner ">
            {/* <Slider {...settings}> */}
            {bannerItems.map((item) => {
              return (
                <div className={`banner-left ${item.bannerClass}`}>
                  <div className="banner-right-top">
                    Executive offer <span>{item.offer}%</span>
                  </div>
                  <div className="banner-right-head">{item.Head}</div>
                  <div className="banner-right-week">
                    On only this week ... Don't miss
                  </div>
                  <div className="banner-right-price">
                    Start from <span>₦{item.Price}</span>
                  </div>
                  <button
                    onClick={() => navigate("/store-categories")}
                    className="banner-right-button"
                  >
                    <div>{item.ButtonText}</div>
                    <div>
                      <LuMoveRight />
                    </div>
                  </button>
                  <img
                    loading="lazy"
                    src={item.image}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              );
            })}
            {/* </Slider> */}
          </div>

          <div className="banner-right">
            <div className="banner-right-item-top">
              <div className="banner-top-head">10% cashback on First Order</div>
              <div className="banner-top-content">
                Refresh your day the
                <br /> with Fresh Seasoning
              </div>
              <button
                onClick={() => navigate("/store-categories")}
                className="banner-top-button"
              >
                Shop Now
              </button>
              <img
                src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-pina-colada-with-pineapple-slice-and-cherry-png-image_12511808.png"
                alt=""
              />
            </div>
            <div className="banner-right-item-bottom">
              <div className="banner-top-head">Say yes to season’s fresh</div>
              <div className="banner-top-content">
                Refresh your day the
                <br /> with Fresh Seasoning
              </div>
              <button
                onClick={() => navigate("/store-categories")}
                className="banner-top-button"
              >
                Shop Now
              </button>
              <img
                src="https://static.vecteezy.com/system/resources/previews/051/960/680/non_2x/an-assortment-of-various-grocery-items-including-fruits-bread-cereals-and-jars-arranged-neatly-for-display-perfect-for-food-related-projects-png.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <CategoryContainer />
        <div>
          <NewProduct />
        </div>
        <div className="second-banner">
          <div>
            <div className="second-banner-head">One Stop Grocery Shop</div>
            <div className="second-banner-content">
              Shopping for your furry friend? Find food, treats, and more in one
              easy spot.
            </div>
            <button
              onClick={() => navigate("/store-categories")}
              href="tel:+2347069961314"
              className="fancy-button"
            >
              <span>Start shop now</span>
            </button>
          </div>
          <div>
            <img
              src="https://freshcart.codescandy.com/assets/images/svg-graphics/store-graphics.svg"
              alt=""
            />
          </div>
        </div>
        <div>
          <Special />
        </div>
        <div>
          <BestSellers />
        </div>
        <div>
          <AboutSection />
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;
