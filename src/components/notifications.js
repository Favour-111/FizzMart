const notifications = [
  // 🔔 Promotions & Offers
  {
    id: 1,
    type: "promo",
    title: "Mega Sale!",
    message: "Enjoy up to 50% off on selected items. Limited time only!",
    timestamp: "2025-09-07T09:30:00Z",
  },
  {
    id: 2,
    type: "promo",
    title: "Free Delivery",
    message: "Get free delivery on all orders above ₦10,000 today.",
    timestamp: "2025-09-07T10:00:00Z",
  },
  {
    id: 3,
    type: "promo",
    title: "Exclusive Deal",
    message: "Buy 2, get 1 free on all beverages this weekend!",
    timestamp: "2025-09-07T11:15:00Z",
  },

  // 📦 Orders
  {
    id: 4,
    type: "checked",
    title: "Order Placed",
    message: "Your order #12345 has been placed successfully.",
    timestamp: "2025-09-07T12:00:00Z",
  },
  {
    id: 5,
    type: "checked",
    title: "Order Confirmed",
    message: "Your order #12345 has been confirmed and is being processed.",
    timestamp: "2025-09-07T12:30:00Z",
  },
  {
    id: 6,
    type: "packages",
    title: "Out for Delivery",
    message: "Your order #12345 is out for delivery. It will arrive soon.",
    timestamp: "2025-09-07T13:15:00Z",
  },
  {
    id: 7,
    type: "packages",
    title: "Delivered",
    message:
      "Your order #12345 has been delivered successfully. Enjoy your meal!",
    timestamp: "2025-09-07T14:00:00Z",
  },

  // ❌ Cancellations
  {
    id: 8,
    type: "order-cancelled",
    title: "Order Cancelled",
    message:
      "Your order #12346 has been cancelled. Refund will be processed shortly.",
    timestamp: "2025-09-07T14:30:00Z",
  },
  {
    id: 9,
    type: "order-cancelled",
    title: "Payment Failed",
    message: "Payment for order #12347 was not successful. Please try again.",
    timestamp: "2025-09-07T15:00:00Z",
  },

  // 🛠️ General Updates
  {
    id: 10,
    type: "info",
    title: "New Store Added",
    message:
      "‘Mama Jollof Kitchen’ is now available on MealSection. Order your favorite meals today!",
    timestamp: "2025-09-07T15:30:00Z",
  },
  {
    id: 11,
    type: "info",
    title: "System Maintenance",
    message:
      "Our app will undergo maintenance tonight from 12AM - 2AM. Some features may be unavailable.",
    timestamp: "2025-09-07T16:00:00Z",
  },
  {
    id: 12,
    type: "info",
    title: "Wallet Top-Up",
    message: "You have successfully topped up ₦5,000 to your wallet.",
    timestamp: "2025-09-07T16:30:00Z",
  },
  {
    id: 13,
    type: "info",
    title: "Reward Earned",
    message: "You just earned 200 loyalty points on your last purchase!",
    timestamp: "2025-09-07T17:00:00Z",
  },
];
module.exports = notifications;
