import React, { useEffect, useState } from "react";
import orderimg from "../../assets/images/png-transparent-shopping-trolley-with-parcel-boxes-shopping-trolley-parcel-box-shopping-cart-shopping-cart-3d-icon.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { SlRefresh } from "react-icons/sl";
import OrderLoader from "../../components/OrderLoader/OrderLoader";
const Orders = () => {
  const [orderFilter, setOrderFilter] = useState("ongoing");
  const [orders, setOrders] = useState([]);

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

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
  console.log(orders);

  useEffect(() => {
    FetchOrder();
  }, []);

  // ✅ filter API orders, not imported dummy data
  const filteredOrders = orders.filter(
    (item) => item.orderStatus === orderFilter
  );

  return (
    <div>
      <div className="order-container-body">
        <div className="d-flex align-items-center justify-content-between">
          <div className="order-head">My Orders</div>
          <button
            onClick={() => {
              FetchOrder();
            }}
            className="order-refersh-button"
          >
            <div className="icn">
              <SlRefresh />
            </div>{" "}
            <div>Refresh Order</div>
          </button>
        </div>
        <div className="filter-order-body">
          <div
            className={`delivered-filter ${
              orderFilter === "ongoing" ? "active" : ""
            }`}
            onClick={() => setOrderFilter("ongoing")}
          >
            ongoing
          </div>
          <div
            className={`delivered-filter ${
              orderFilter === "delivered" ? "active" : ""
            }`}
            onClick={() => setOrderFilter("delivered")}
          >
            Delivered
          </div>
          <div
            className={`delivered-filter ${
              orderFilter === "Cancelled" ? "active" : ""
            }`}
            onClick={() => setOrderFilter("Cancelled")}
          >
            Cancelled
          </div>
        </div>
        {loader ? (
          <div className="orders-cont mb-5">
            <OrderLoader />
            <OrderLoader />
            <OrderLoader />
          </div>
        ) : (
          <div className="orders-cont mb-5">
            {filteredOrders.length > 0 ? (
              filteredOrders.reverse().map((item) => (
                <div key={item.id} className="order-item-body">
                  <div className="order-item">
                    <div>
                      <img
                        src="https://villyz-store-md6b.vercel.app/static/media/b4728tKYUsFQNOfV.537d369a65a20af92a46.webp"
                        alt=""
                      />
                    </div>
                    <div className="mt-2">
                      <div className="order-name">ORDER_{item.id}</div>
                      {item.orderStatus === "Processing" ? (
                        <div className="processing">Processing Delivery</div>
                      ) : item.orderStatus === "delivered" ? (
                        <div className="delivered">Order Delivered ✅ </div>
                      ) : item.orderStatus === "ongoing" ? (
                        <div className="Shipped">Ready for PickUp</div>
                      ) : item.orderStatus === "Shipping" ? (
                        <div className="Shipping">Out for Delivery</div>
                      ) : (
                        <div className="cancelled">Order Cancelled</div>
                      )}
                      <div className="order-date">
                        On {item.date.slice(0, 10)}
                      </div>
                    </div>
                    <div
                      className="see-details"
                      onClick={() =>
                        navigate(`/order-details/${item._id}`, {
                          state: { id: item._id, orders: orders },
                        })
                      }
                    >
                      See details
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-order">
                <div className="no-order-image">
                  <img loading="lazy" src={orderimg} alt="" />
                </div>
                <div className="no-order-head">
                  No{" "}
                  {orderFilter === "cancelled"
                    ? "closed"
                    : orderFilter === "shipped"
                    ? "delivered"
                    : "pending"}{" "}
                  order to display
                </div>
                <div className="no-order-content">
                  All your{" "}
                  {orderFilter === "cancelled"
                    ? "closed"
                    : orderFilter === "shipped"
                    ? "delivered"
                    : "pending"}{" "}
                  orders will be saved here
                </div>
                <button onClick={() => navigate("/")}>Start shopping</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
