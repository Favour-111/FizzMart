import React, { useContext, useRef } from "react";
import "./Receipt.css";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router";

const Receipt = ({ date, OrderId, Orders, discount, shipping }) => {
  const receiptRef = useRef();
  const { cartItems, getTotalValue } = useContext(ShopContext);
  const handlePrint = () => {
    window.print(); // Opens browser print dialog
  };
  console.log(Orders);

  const navigate = useNavigate();
  return (
    <div className="receipt-wrapper ">
      <div className="receipt-container" ref={receiptRef}>
        <hr />
        <h2 className="receipt-title">Order Summary</h2>
        <hr />
        {/* Order Info */}
        <div className="receipt-info">
          <div className="receipt-info-item">
            <div className="label">Date</div>
            <div className="value">{date}</div>
          </div>
          <div className="receipt-info-item">
            <div className="label">Order Number</div>
            {OrderId === "Payment on delivery" ? (
              <div className="payment-value">{OrderId}</div>
            ) : (
              <div className="value">{OrderId}</div>
            )}
          </div>
          <div className="receipt-info-item">
            <div className="label">Payment Method</div>
            <div className="value">*********</div>
          </div>
        </div>

        <hr />

        {/* Items */}
        {Orders.map((item) => (
          <div className="receipt-item">
            <div className="item-name">{item.productName}</div>
            <div className="item-meta">Qty : {item.quantity}</div>
            <div className="item-meta">
              {" "}
              ₦{item.price.toLocaleString()} (per unit)
            </div>
            <div className="item-price">
              ₦{(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}

        <hr />

        {/* Summary */}
        <div className="summary">
          <div className="summary-row">
            <span>Sub Total :</span>
            <div> ₦{getTotalValue().toLocaleString()}</div>
          </div>
          <div className="summary-row">
            <span>Shipping :</span>
            <div> ₦{shipping.toLocaleString()}</div>
          </div>
          {discount === 0 ? (
            <></>
          ) : (
            <div className="summary-row">
              <span>Discount :</span>
              <div>- ₦{discount.toLocaleString()}</div>
            </div>
          )}
        </div>

        <div className="summary total">
          <div className="summary-row">
            <span className="total-label">Order Total</span>
            <span className="total-value">
              ₦{(getTotalValue() + shipping - discount || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <button
        className="print-btn"
        onClick={() => navigate("/store-categories")}
      >
        Continue Shopping
      </button>
      <hr />
    </div>
  );
};

export default Receipt;
