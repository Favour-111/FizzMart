import React from "react";
import "./OrderLoader.css";
const OrderLoader = () => {
  return (
    <div className="Order-skeleton-card mt-3">
      <div className="d-flex align-items-center justify-content-between ">
        <div className="Order-skeleton Order-skeleton-img "></div>
        <div className="Order-skeleton Order-skeleton-text shortest"></div>
      </div>
      <div className="Order-skeleton Order-skeleton-text short"></div>{" "}
    </div>
  );
};
export default OrderLoader;
