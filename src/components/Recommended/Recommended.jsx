import React, { useState, useEffect, useContext } from "react";
import "./Recommended.css";
import category from "../categories";
import Item from "../Item/Item";
import ProdSkeleton from "../Skelenton/ProdSkelenton";
import axios from "axios";
import Slider from "react-slick";
import { ShopContext } from "../Context/ShopContext";

// Utility function to shuffle the products
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

const Recommended = () => {
  const { product, ProdLoader, categories } = useContext(ShopContext);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  //react slick slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1181,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

          // Count the frequency of each product ID in the array
          const productFrequency = productIds.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
          }, {});

          // Sort product IDs by frequency (descending)
          const sortedProductIds = Object.entries(productFrequency)
            .sort((a, b) => b[1] - a[1])
            .map((entry) => entry[0]);

          // Fetch details of these products from the product list
          const detailedProducts = sortedProductIds.map(
            (id) => product.find((p) => p.id === parseInt(id)) // Match the product by id
          );

          // Now, collect more products based on the most viewed products
          const additionalProducts = [];
          sortedProductIds.forEach((id, index) => {
            if (index < 5) {
              // Limit to the top 5 most viewed products
              const categoryProducts = product.filter(
                (p) => p.category === detailedProducts[index].category
              );
              additionalProducts.push(...categoryProducts.slice(0, 3)); // Get 3 more products from the same category
            }
          });

          // Combine detailed and additional products
          const combinedProducts = [...detailedProducts, ...additionalProducts];

          // Filter out duplicates based on product id
          const uniqueProducts = [
            ...new Map(
              combinedProducts.map((item) => [item.id, item])
            ).values(),
          ];

          // Shuffle the unique products and limit to 15
          const shuffledProducts = shuffleArray(uniqueProducts).slice(0, 15);

          // Set the recommended products
          setRecommendedProducts(shuffledProducts);
        } else {
          console.log("No recently viewed products found.");
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
      {recommendedProducts.length > 0 ? (
        <div className="Recent-container">
          <div className="Recent">
            <div className="new-prod-top">
              <div className="header-sub-head">Products</div>
              <div className="New-ProductHead">Recommended Product</div>
              <div className="New-ProductContent">
                Discover Your Next Favorite
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
                  {recommendedProducts.length > 0 ? (
                    recommendedProducts.map((item) => {
                      return <Item product={item} key={item.id} />;
                    })
                  ) : (
                    <div className="no-prod-cont">
                      <img
                        src="https://t4.ftcdn.net/jpg/04/16/51/95/360_F_416519523_wabFJQqgcyTX2uSsKaeeqQg0Okr91XYn.jpg"
                        alt="No products"
                        loading="lazy"
                      />
                      <p className="no-prod-text">
                        No products available at the moment.
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

export default Recommended;
