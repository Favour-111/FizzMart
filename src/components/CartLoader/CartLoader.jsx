import React from "react";
import "./CartLoader.css";
const CartLoader = () => {
  return (
    <div className="d-md-flex d-sm-block gap-2">
      <div className="CartLoader-skeleton-card-body">
        <div className="CartLoader-skeleton-card mt-3">
          <div className="d-flex align-items-center justify-content-between ">
            <div className="CartLoader-skeleton CartLoader-skeleton-img "></div>
            <div className="CartLoader-skeleton CartLoader-skeleton-counter "></div>
            <div className="CartLoader-skeleton CartLoader-skeleton-text shortest"></div>
          </div>
          {/* <div className="CartLoader-skeleton CartLoader-skeleton-text short"></div>{" "} */}
        </div>
        <div className="CartLoader-skeleton-card mt-3">
          <div className="d-flex align-items-center justify-content-between ">
            <div className="CartLoader-skeleton CartLoader-skeleton-img "></div>
            <div className="CartLoader-skeleton CartLoader-skeleton-counter "></div>
            <div className="CartLoader-skeleton CartLoader-skeleton-text shortest"></div>
          </div>
          {/* <div className="CartLoader-skeleton CartLoader-skeleton-text short"></div>{" "} */}
        </div>
        <div className="CartLoader-skeleton-card mt-3">
          <div className="d-flex align-items-center justify-content-between ">
            <div className="CartLoader-skeleton CartLoader-skeleton-img "></div>
            <div className="CartLoader-skeleton CartLoader-skeleton-counter "></div>
            <div className="CartLoader-skeleton CartLoader-skeleton-text shortest"></div>
          </div>
          {/* <div className="CartLoader-skeleton CartLoader-skeleton-text short"></div>{" "} */}
        </div>
      </div>

      <div className="CartLoader-skeleton CartLoader-skeleton-card-summary ">
        {/* <div className="CartLoader-skeleton CartLoader-skeleton-text short"></div>{" "} */}
      </div>
    </div>
  );
};
export default CartLoader;
