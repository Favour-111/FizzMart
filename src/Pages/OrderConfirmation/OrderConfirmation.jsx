import React, { useEffect, useState } from "react";
import "./OrderConfirmation.css";
import Receipt from "../../components/Receipt/Receipt";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    OrderIdentity,
    orderId,
    paymentStatus,
    name,
    email,
    address,
    phone,
    Orders,
    shipping,
    discount,
    date,
    cartProducts,
  } = location.state || {};
  console.log(location);
  const [order, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  const FetchOrder = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${process.env.REACT_APP_API}/orders`);
      if (response) {
        const userId = localStorage.getItem("userId");

        setOrders(
          response.data.message.filter((item) => item.UserID == userId)
        );
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Error fetching orders");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    FetchOrder();
  }, []);
  console.log(order);

  return (
    <div className="home-container">
      <div className="confirmation-container">
        <div className="confirmation-text">
          <div className="confirmation-header">
            Thank you for your purchase!!
          </div>
          <div className="confirmation-content">
            We’ll deliver your order within 24 hours on working days! You’ll
            also get a quick email or phone call once it’s ready for pickup
          </div>
          <div className="billing-container">
            <div className="billing-content-head">Name</div>
            <div className="billing-text">{name}</div>

            <div className="billing-content-head">Address</div>
            <div className="billing-text">
              {address?.street}, {address?.Region}
            </div>

            <div className="billing-content-head">Phone</div>
            <div className="billing-text">{phone}</div>

            <div className="billing-content-head">Email</div>
            <div className="billing-text">{email}</div>
          </div>
          <button
            onClick={() =>
              navigate(`/order-details/${OrderIdentity}`, {
                state: { id: OrderIdentity, orders: order },
              })
            }
          >
            Track your order
          </button>
        </div>

        <div className="confirmation-receipt">
          <Receipt
            date={date}
            OrderId={orderId}
            Orders={Orders}
            discount={discount}
            shipping={shipping}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
// /Order-successful/:id
