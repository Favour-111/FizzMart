import React, { useContext, useState, useEffect } from "react";
import "./RecentlyViewed.css";
import Item from "../Item/Item";
import { ShopContext } from "../Context/ShopContext";
import ProdSkeleton from "../Skelenton/ProdSkelenton";
import axios from "axios";

const RecentlyViewed = () => {
  const { product, ProdLoader, setProdLoader } = useContext(ShopContext);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);

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
        <div className="NewProduct-container">
          <div className="newproduct">
            <div className="new-prod-top">
              <div className="New-ProductHead">
                Recently <span>Viewed</span>{" "}
              </div>
              <div className="New-ProductContent">
                Take another look at the items you recently viewed
              </div>
            </div>
          </div>
          {loading || ProdLoader ? (
            <div className="new-product-container">
              <div className="mt-3 NewProducts">
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
            </div>
          ) : (
            <div className="new-product-container">
              <div className="mt-3 NewProducts">
                {recentlyViewed.length > 0 ? (
                  recentlyViewed.map((item) => {
                    return <Item key={item.id} product={item} />; // Use id for the key
                  })
                ) : (
                  <div className="no-products">
                    No products found in this category.
                  </div>
                )}
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

export default RecentlyViewed;
