import React from "react";
import "./SingleProdLoader.css";
const SingleProdLoader = () => {
  return (
    <div className="p-0 d-md-flex d-sm-block gap-2">
      <div className="SingleProdLoader-skeleton SingleProdLoader-skeleton-card-summary ">
        {/* <div className="SingleProdLoader-skeleton SingleProdLoader-skeleton-text short"></div>{" "} */}
      </div>
      <div className="SingleProdLoader-skeleton-card-body">
        <div className="SingleProdLoader-skeleton-card mt-3">
          <div className="SingleProdLoader-skeleton SingleProdLoader-skeleton-text shortest"></div>
          <div className="SingleProdLoader-skeleton SingleProdLoader-skeleton-text shorter"></div>
          <div className="SingleProdLoader-skeleton SingleProdLoader-skeleton-text short"></div>
          <div className="SingleProdLoader-skeleton SingleProdLoader-skeleton-text shorter"></div>
          <div className="SingleProdLoader-skeleton SingleProdLoader-skeleton-text long"></div>
          <div className="SingleProdLoader-skeleton SingleProdLoader-skeleton-counter "></div>
          <div className="SingleProdLoader-skeleton SingleProdLoader-skeleton-cart mt-2"></div>
          {/* <div className="SingleProdLoader-skeleton SingleProdLoader-skeleton-text short"></div>{" "} */}
        </div>
      </div>
    </div>
  );
};
export default SingleProdLoader;
