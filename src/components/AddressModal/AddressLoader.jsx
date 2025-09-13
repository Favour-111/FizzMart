import React from "react";
import "./AddressLoader.css";
const AddressLoader = () => {
  return (
    <div className="Address-skeleton-card">
      <div className="Address-skeleton  Address-skeleton-text short"></div>
      <div className="Address-skeleton  Address-skeleton-text shorter"></div>
      <div className="Address-skeleton  Address-skeleton-text"></div>
      <div className="Address-skeleton  Address-skeleton-text short"></div>
      <div className="Address-skeleton  Address-skeleton-text shorter"></div>
      <div className="Address-skeleton  Address-skeleton-text shorter"></div>

      <div className="d-flex align-items-center justify-content-between">
        <div className="Address-skeleton Address-skeleton-text shorter"></div>
        <div className="Address-skeleton Address-skeleton-text shortest"></div>
      </div>
    </div>
  );
};

export default AddressLoader;
