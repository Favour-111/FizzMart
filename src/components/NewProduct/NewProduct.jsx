import React, { useState, useEffect, useContext } from "react";
import "./NewProduct.css";
import category from "../categories";
import Item from "../Item/Item";
import ProdSkeleton from "../Skelenton/ProdSkelenton";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
const NewProduct = () => {
  const { product, ProdLoader, categories } = useContext(ShopContext);
  const [activeButton, setActiveButton] = useState("");
  useEffect(() => {
    if (categories && categories.length > 0 && !activeButton) {
      setActiveButton(categories[0].name);
    }
  }, [categories]);

  return (
    <div>
      <div className="NewProduct-container">
        <div className="newproduct">
          <div className="new-prod-top">
            <div className="header-sub-head">Products</div>
            <div className="New-ProductHead">New Product</div>
            <div className="New-ProductContent">
              New products with updated stocks
            </div>
          </div>
          <div className="new-prod-filter-container">
            {categories.map((item) => (
              <div
                key={item._id || item.name} // ✅ add key
                onClick={() => setActiveButton(item.name)}
                className={`filter-buttons ${
                  activeButton === item.name ? "active" : ""
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        {ProdLoader ? (
          <div className="NewProducts mt-4">
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
            <div className="mt-3 NewProducts">
              {product
                .filter((item) => {
                  if (item.category === activeButton) {
                    return item;
                  }
                })
                .reverse()
                .slice(0, 10)
                .map((item) => {
                  return <Item product={item} />;
                })}
              {product.filter((item) => item.category === activeButton)
                .length === 0 && (
                <div className="no-products">
                  No products found in this category.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProduct;
