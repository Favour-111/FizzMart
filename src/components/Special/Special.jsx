import React, { useContext, useState } from "react";
import category from "../categories";
import product from "../Product";
import "./Special.css";
import Item from "../Item/Item";
import { ShopContext } from "../Context/ShopContext";
import ProdSkelenton from "../Skelenton/ProdSkelenton";
const Special = () => {
  const { product, ProdLoader } = useContext(ShopContext);
  return (
    <div>
      <div className="NewProduct-container">
        <div className="newproduct">
          <div className="new-prod-top2">
            <div className="header-sub-head">Products</div>
            <div className="New-ProductHead">
              Special <span>Offers</span>
            </div>
            <div className="New-ProductContent">
              Get exclusive ongoing offers, deals, and discount
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
                  if (item.deals === "Deal") {
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

export default Special;
