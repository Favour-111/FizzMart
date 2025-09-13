import React from "react";
import "./ProdSkelenton.css";

export default function ProdSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img"></div>

      <div className="skeleton skeleton-text shorter"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text short"></div>
      <div className="skeleton skeleton-text short"></div>
      <div className="skeleton skeleton-text Btn"></div>
    </div>
  );
}
