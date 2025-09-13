import React, { useContext, useState } from "react";
import category from "../categories";
import product from "../Product";
import "./BestSellers.css";
import Item from "../Item/Item";
import { ShopContext } from "../Context/ShopContext";
import ProdSkelenton from "../Skelenton/ProdSkelenton";
const BestSellers = () => {
  const { product, ProdLoader } = useContext(ShopContext);
  return (
    <div>
      <div className="NewProduct-container">
        <div className="newproduct">
          <div className="new-prod-top2">
            <div className="header-sub-head">Products</div>
            <div className="New-ProductHead">Bestsellers In Your Area</div>
            <div className="New-ProductContent">
              Find the bestseller products in your area with discount.
            </div>
          </div>
        </div>
        <div className="new-product-container">
          {ProdLoader ? (
            <div className="mt-3 NewProducts">
              <ProdSkelenton />
              <ProdSkelenton />
              <ProdSkelenton />
              <ProdSkelenton />
              <ProdSkelenton />
              <ProdSkelenton />
              <ProdSkelenton />
              <ProdSkelenton />
              <ProdSkelenton />
              <ProdSkelenton />
            </div>
          ) : (
            <div className="mt-3 NewProducts">
              {product
                .filter((item) => {
                  if (item.deals === "bestSellers") {
                    return item;
                  }
                })
                .reverse()
                .slice(0, 10)
                .map((item) => {
                  return <Item product={item} />;
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
