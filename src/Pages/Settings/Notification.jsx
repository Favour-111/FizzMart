import React, { useContext, useEffect, useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { PiDotsThreeOutlineVerticalFill, PiTrash } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import OrderLoader from "../../components/OrderLoader/OrderLoader";
import { ShopContext } from "../../components/Context/ShopContext";
const Notification = () => {
  const {
    notifications,
    setNotification,
    notificationLoader,
    fetchNotification,
  } = useContext(ShopContext);
  const [menu, SetOpenMenu] = useState(null);
  const userId = localStorage.getItem("userId");

  const markAsRead = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/notifications/${id}/read`
      );
      if (response.data.success) {
        setNotification((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
        toast.success("Marked as read");
      }
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };
  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/notifications/${notificationId}`
      );
      setNotification((prev) => prev.filter((n) => n._id !== notificationId));
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };
  const markAllAsRead = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/markAll/${userId}`
      );

      if (response.data.success) {
        toast.success("All notifications marked as read");

        // 🔹 Update local state instead of refetching
        setNotification((prev) => prev.map((n) => ({ ...n, isRead: true })));
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Failed to mark all as read");
    }
  };

  return (
    <div className="notification-filled-cont mb-5">
      {notificationLoader ? (
        // 🔹 Show loader while fetching
        <div>
          <OrderLoader />
          <OrderLoader />
          <OrderLoader />
          <OrderLoader />
          <OrderLoader />
        </div>
      ) : notifications.length > 0 ? (
        // 🔹 Show notifications if available
        <>
          <div className="Notification-head">
            <div>
              {notifications.filter((item) => !item.isRead).length} Unread
              Notifications
            </div>
            <div className="mark-all" onClick={markAllAsRead}>
              <IoCheckmarkDoneOutline size={15} /> Mark All as read
            </div>
          </div>

          <div>
            {notifications.map((item) => (
              <div key={item._id} className="notification-item">
                <div className="d-flex gap-2">
                  <div className="position-relative">
                    {!item.isRead && <div className="active-icon"></div>}

                    {item.type === "promo" ? (
                      <div className="profile-notification promo">
                        <img
                          src="https://img.icons8.com/3d-fluency/94/discount.png"
                          alt="Promo"
                        />
                      </div>
                    ) : item.type === "checked" ? (
                      <div className="profile-notification checked">
                        <img
                          src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/small-check-mark-icon.png"
                          alt="Checked"
                        />
                      </div>
                    ) : item.type === "order-cancelled" ? (
                      <div className="profile-notification order-cancelled">
                        <img
                          src="https://uxwing.com/wp-content/themes/uxwing/download/logistics-shipping-delivery/product-package-cancelled-icon.svg"
                          alt="Order Cancelled"
                        />
                      </div>
                    ) : item.type === "packages" ? (
                      <div className="profile-notification packages">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/7274/7274757.png"
                          alt="Package"
                        />
                      </div>
                    ) : (
                      <div className="profile-notification order-info">
                        <img
                          src="https://img.icons8.com/ios11/512/228BE6/info.png"
                          alt="Info"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="not-head">{item.title}</div>
                    <div className="not-cont mt-1">{item.message}</div>
                    <div className="d-flex align-items-center gap-1 timing mt-1">
                      <div>{item.type}</div>
                      <div>
                        <GoDotFill size={10} />
                      </div>
                      <div>
                        {formatDistanceToNow(new Date(item.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action menu */}
                <div className="position-relative">
                  <div
                    className="action"
                    onClick={() =>
                      menu === item._id
                        ? SetOpenMenu(null)
                        : SetOpenMenu(item._id)
                    }
                  >
                    <PiDotsThreeOutlineVerticalFill />
                  </div>
                  {menu === item._id && (
                    <div className="action-box shadow-sm">
                      {!item.isRead && (
                        <div
                          className="action-item"
                          onClick={() => markAsRead(item._id)}
                        >
                          <IoCheckmarkDoneOutline /> Mark as read
                        </div>
                      )}

                      <div
                        className="action-item"
                        onClick={() => deleteNotification(item._id)}
                      >
                        <PiTrash className="" /> Delete
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // 🔹 No notifications
        <div className="notification-container">
          <img
            src="https://threedio-prod-var-cdn.icons8.com/uf/preview_sets/previews/51scd-2MFESPi4kQ.webp"
            alt="No notifications"
          />
          <div>No notification yet</div>
          <div className="notification-text">
            no notifications yet, come back later
          </div>
          <button onClick={() => fetchNotification()}>Refresh</button>
        </div>
      )}
    </div>
  );
};

export default Notification;
