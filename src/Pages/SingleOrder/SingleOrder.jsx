import React, { useContext, useState } from "react";
import "./SingleOrder.css";
import NavBar from "../../components/NavBar/NavBar";
import NavSm from "../../components/NavSm/NavSm";
import { useLocation, useNavigate } from "react-router";
import order from "../../components/Orders";
import Footer from "../../components/Footer/Footer";
import { HiOutlineBackward } from "react-icons/hi2";
import { MdKeyboardBackspace } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";
import { IoWarning } from "react-icons/io5";
import { ShopContext } from "../../components/Context/ShopContext";
const SingleOrder = () => {
  const { product, ProdLoader } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const orderID = location.state || {};
  const { id, orders } = orderID;
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const OrderFilter = orders?.find((item) => item?._id === id);
  console.log(OrderFilter);

  const [orderStatus, setOrderStatus] = useState(
    OrderFilter?.orderStatus || "pending"
  );

  // const total = OrderFilter.products.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  const handleStatusButtonClick = async (status) => {
    console.log("Button Clicked Status:", status);

    setOrderStatus(status);
    if (!OrderFilter) return;

    try {
      setLoader(true);
      const response = await fetch(
        `${process.env.REACT_APP_API}/updateOrderStatus/${OrderFilter._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderStatus: status }),
        }
      );

      const data = await response.json();
      console.log("Backend Response:", data);

      if (!response.ok) throw new Error("Failed to update order status");

      setModal(false);
      navigate("/settings/orders");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <NavBar />
      <NavSm />
      <div className="home-container">
        <div className="single-order-body">
          <div className="single-order-address">
            <div className="single-item">
              <div className="single-order-head">Order Id</div>
              <div className="single-order-content-text">
                Order_${OrderFilter.paymentReference}
              </div>
            </div>
            <div className="single-item">
              <div className="single-order-head">Order Status</div>
              {orderStatus === "Processing" ? (
                <div className="processing">Processing Delivery</div>
              ) : orderStatus === "delivered" ? (
                <div className="delivered">Order Delivered ✅ </div>
              ) : orderStatus === "ongoing" ? (
                <div className="Shipped">Ready for PickUp</div>
              ) : orderStatus === "Shipping" ? (
                <div className="Shipping">Out for Delivery</div>
              ) : (
                <div className="cancelled">Order Cancelled</div>
              )}
            </div>

            <div className="single-item">
              <div className="single-order-head">Delivery Address</div>
              <div className="single-order-content-text">
                {OrderFilter.street}
              </div>
            </div>
            <div className="single-item">
              <div className="single-order-head">State</div>
              <div className="single-order-content-text">
                {" "}
                {OrderFilter.state}
              </div>
            </div>
            <div className="single-item">
              <div className="single-order-head">Region</div>
              <div className="single-order-content-text">
                {OrderFilter.Region}
              </div>
            </div>
            <div className="single-item">
              <div className="single-order-head">Payment Details</div>
              <div className="single-order-content-text">
                Items total:₦{OrderFilter.OrderPrice}
              </div>
              <div className="single-order-content-text">
                Shipping Fee:₦{OrderFilter.DeliveryFee}
              </div>
              <div className="single-order-content-text">
                total:₦{OrderFilter.OrderPrice + OrderFilter.DeliveryFee}
              </div>
            </div>

            <div className="single-item">
              <div className="single-order-head">Payment Method</div>
              <div className="single-order-content-text">Cash Payment</div>
            </div>
          </div>
          <div className="single-order-content">
            <div className="d-flex align-items-center justify-content-between">
              <button
                className="Order-list-btn shadow-sm"
                onClick={() => navigate("/settings/orders")}
              >
                <div className="back-icn">
                  <MdKeyboardBackspace />
                </div>
                <div>Return to Orders</div>
              </button>
              <div className="single-item-btn">
                {orderStatus === "ongoing" && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => setModal(true)}
                  >
                    <CgClose style={{ marginBottom: 3 }} /> Cancel Order
                  </button>
                )}
              </div>
            </div>
            {OrderFilter.Orders.map((item) => (
              <div className="single-item-order">
                <div className="single-image">
                  <img src={item.image} alt="" />
                </div>
                <div>
                  <div className="single-prod-name mt-1">{item.name}</div>
                  <div className="single-Variation mt-1">variation:1KG</div>
                  <div className="single-quantity mt-1">
                    QTY:{item.quantity}
                  </div>
                  <div className="single-price mt-1">₦{item.price}</div>
                </div>
                <button onClick={() => item.id}>Buy Again</button>
              </div>
            ))}
          </div>
        </div>
        {modal && (
          <div className="confirmation-modal-overlay">
            <div className="confirmation-modal">
              <div className="confirmation-head">Cancel Order</div>
              <div className="confirmation-Subhead">
                Are you sure you want to cancel this order?
              </div>
              <div className="confirmation-bdy">
                <div className="warning-text">
                  <div>
                    <IoWarning />
                  </div>
                  <div>Warning</div>
                </div>
                Once cancelled, this action cannot be undone. The order will no
                longer be processed or delivered.
              </div>
              <div className="confirmation-buttons">
                <button className="close" onClick={() => setModal(false)}>
                  close
                </button>
                <button
                  className="cancel"
                  disabled={loader}
                  onClick={() => handleStatusButtonClick("Cancelled")}
                >
                  {loader ? "loading..." : "Yes,Cancel Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SingleOrder;
