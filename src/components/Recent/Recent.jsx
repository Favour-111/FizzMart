import React, { useState, useEffect, useContext } from "react";
import "./Recent.css";
import category from "../categories";
import Item from "../Item/Item";
import ProdSkeleton from "../Skelenton/ProdSkelenton";
import axios from "axios";
import Slider from "react-slick";
import { ShopContext } from "../Context/ShopContext";
const Recent = () => {
  const { product, ProdLoader, categories } = useContext(ShopContext);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  //react slick slider
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Replace with actual user ID
        if (!userId) {
          console.log("No user ID found, please log in.");
          return;
        }

        // Fetch recently viewed product IDs from the backend
        const res = await axios.get(
          `http://localhost:5000/recently-viewed/68d7b41148cdc5c5e3fea606`
        );
        setItem(res);
        console.log(res.data);

        if (res && res?.data?.recentlyViewed) {
          const productIds = res?.data.recentlyViewed;

          // Fetch the details for each recently viewed product
          const productDetails = product.filter(
            (p) => productIds.includes(p.id) // Compare against id, not _id
          );

          // Set the fetched products in state
          setRecentlyViewed(productDetails);
        } else {
          console.log("no prod");
        }
      } catch (error) {
        console.error("Error fetching recently viewed products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, [product]); // Re-run when products change

  return (
    <div>
      {recentlyViewed.length > 0 ? (
        <div className="Recent-container">
          <div className="Recent">
            <div className="new-prod-top">
              <div className="header-sub-head">Products</div>
              <div className="New-ProductHead">
                Recently <span>Viewed</span>{" "}
              </div>
              <div className="New-ProductContent">
                Take another look at the items you recently viewed
              </div>
            </div>
          </div>
          {ProdLoader ? (
            <div className="Recents mt-4">
              <ProdSkeleton />
              <ProdSkeleton />
              <ProdSkeleton />
              <ProdSkeleton />
              <ProdSkeleton />
              <ProdSkeleton />
              <ProdSkeleton />
              <ProdSkeleton />
              <ProdSkeleton />
              <ProdSkeleton />
            </div>
          ) : (
            <div className="new-product-container">
              <div className="mt-3 Recents">
                <Slider {...settings}>
                  {recentlyViewed

                    .reverse()
                    .slice(0, 10)
                    .map((item) => {
                      return <Item product={item} />;
                    })}
                  {recentlyViewed.length === 0 && (
                    <div className="no-prod-cont">
                      <img
                        src="https://t4.ftcdn.net/jpg/04/16/51/95/360_F_416519523_wabFJQqgcyTX2uSsKaeeqQg0Okr91XYn.jpg"
                        alt=""
                        loading="lazy"
                      />
                      <p className="no-prod-text">
                        no product in this category
                      </p>
                    </div>
                  )}
                </Slider>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Recent;
