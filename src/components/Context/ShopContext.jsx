import react, { createContext, useEffect, useState } from "react";
import product from "../Product";
import toast from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";

export const ShopContext = createContext(null);
const socket = io(process.env.REACT_APP_API, {
  transports: ["websocket"],
});

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < product.length; index++) {
    cart[index] = 0;
  }
  return cart;
};

const getDefaultList = () => {
  let list = {};
  for (let index = 0; index < product.length; index++) {
    list[index] = 0;
  }
  return list;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [WishList, setWishListItems] = useState(getDefaultList());
  const [categories, setCategories] = useState([]);
  const [cartLoader, setCartLoader] = useState(null); // track product id being updated
  const [product, setProduct] = useState([]);
  const [notificationLoader, setNotificationLoader] = useState(false);
  const [notifications, setNotification] = useState([]);
  const [ProdLoader, setProdLoader] = useState(null); // track product id being updated
  const [wishlistLoader, setWishlistLoader] = useState(null); // track wishlist item being updated
  const [categoryLoader, setCategoryLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const fetchNotification = async () => {
    try {
      setNotificationLoader(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/notifications/${userId}`
      );
      if (response) {
        setNotification(response.data.notifications);
      } else {
        console.log("error fsetching notifications");
      }
    } catch (error) {
      toast.error("network error");
    } finally {
      setNotificationLoader(false);
    }
  };

  const fetchAllCategory = async () => {
    try {
      setCategoryLoader(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/getallCategory`
      );

      if (response) {
        console.log(response);

        setCategories(response.data.response); // adjust depending on your API response
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      toast.error("Network error, please refresh");
    } finally {
      setCategoryLoader(false);
    }
  };
  const fetchAllProduct = async () => {
    try {
      setProdLoader(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/getallProducts`
      );

      if (response) {
        console.log(response);

        setProduct(response.data.response); // adjust depending on your API response
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      toast.error("Network error, please refresh");
    } finally {
      setProdLoader(false);
    }
  };

  // 🔹 fetch entire cart (no per-item loader needed here)
  const fetchCartData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const response = await fetch(`${process.env.REACT_APP_API}/getCart`, {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      });

      const cartData = await response.json();
      setCartItems(cartData);
    } catch (error) {
      console.error("Error fetching updated cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 fetch wishlist
  const fetchWishlistData = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const response = await fetch(`${process.env.REACT_APP_API}/getList`, {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      });

      const wishlistData = await response.json();
      setWishListItems(wishlistData);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };
  useEffect(() => {
    // 🔥 Listen for product added
    socket.on("product-added", (newProduct) => {
      setProduct((prev) => [...prev, newProduct]);
      toast.success(`${newProduct.productName} added!`);
    });

    // 🔥 Listen for product updated
    socket.on("product-updated", (updatedProduct) => {
      setProduct((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
      toast.success(`${updatedProduct.productName} updated!`);
    });

    socket.on("category-added", (newCategory) => {
      setCategories((prev) => {
        // Prevent duplicate
        if (prev.some((cat) => cat._id === newCategory._id)) return prev;
        return [...prev, newCategory];
      });
    });

    // 🔥 Listen for category updated
    socket.on("category-updated", (updatedCategory) => {
      setCategories((prev) =>
        prev.map((p) => (p._id === updatedCategory._id ? updatedCategory : p))
      );
      toast.success(`${updatedCategory.name} updated!`);
    });

    socket.on("category-deleted", (deletedCategory) => {
      setCategories((prev) =>
        prev.filter((p) => p._id !== deletedCategory._id)
      );
      toast("A category has been deleted");
    });

    socket.on("product-deleted", ({ id }) => {
      setProduct((prev) => prev.filter((p) => p._id !== id));
      toast("a product has been deleted");
    });
    socket.on("order-status-updated", (data) => {
      setNotification((prev) => {
        // check if notification already exists
        const exists = prev.some((n) => n._id === data.notification._id);
        if (exists) return prev; // don’t add duplicate
        return [data.notification, ...prev];
      });

      toast.success(data.notification.message);
    });

    return () => {
      socket.off("product-added");
      socket.off("product-updated");
      socket.off("product-deleted");
    };
  }, []);
  useEffect(() => {
    if (userId) {
      socket.emit("register", userId); // ✅ join the user-specific room
    }
  }, [userId]);

  useEffect(() => {
    fetchCartData();
    fetchNotification();
    fetchWishlistData();
    fetchAllCategory();
    fetchAllProduct();
  }, []);

  // 🔹 add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    if (localStorage.getItem("auth-token")) {
      try {
        setCartLoader(itemId);
        const response = await fetch(`${process.env.REACT_APP_API}/addtocart`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });
        if (response) {
          toast.success("item successfully added to cart");
        }

        await fetchCartData();
      } catch (error) {
        console.error(error.message);
      } finally {
        setCartLoader(null);
      }
    }
  };
  const clearCart = async () => {
    setCartItems(getDefaultCart()); // reset local cart

    if (localStorage.getItem("auth-token")) {
      try {
        await fetch(`${process.env.REACT_APP_API}/clearCart`, {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  const getTotalValue = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let totalValue = product.find((product) => product.id === Number(item));
        totalAmount += totalValue?.newPrice * cartItems[item];
      }
    }
    return totalAmount;
  };
  // 🔹 remove one quantity from cart
  const RemoveCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, prev[itemId] - 1),
    }));

    if (localStorage.getItem("auth-token")) {
      try {
        setCartLoader(itemId);
        await fetch(`${process.env.REACT_APP_API}/removeFromCart`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });

        await fetchCartData();
      } catch (error) {
        console.error(error.message);
      } finally {
        setCartLoader(null);
      }
    }
  };

  // 🔹 delete completely from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));

    if (localStorage.getItem("auth-token")) {
      try {
        setCartLoader(itemId);
        await fetch(`${process.env.REACT_APP_API}/deleteFromCart`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });

        await fetchCartData();
      } catch (error) {
        console.error(error.message);
      } finally {
        setCartLoader(null);
      }
    }
  };

  // 🔹 add to wishlist
  const addToList = async (itemId) => {
    setWishListItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (localStorage.getItem("auth-token")) {
      try {
        setWishlistLoader(itemId);
        await fetch(`${process.env.REACT_APP_API}/addtowishlist`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });

        await fetchWishlistData();
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      } finally {
        setWishlistLoader(null);
      }
    }
  };

  // 🔹 remove from wishlist
  const removeList = async (itemId) => {
    setWishListItems((prev) => ({ ...prev, [itemId]: 0 }));

    if (localStorage.getItem("auth-token")) {
      try {
        setWishlistLoader(itemId);
        await fetch(`${process.env.REACT_APP_API}/removeFromList`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });

        await fetchWishlistData();
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      } finally {
        setWishlistLoader(null);
      }
    }
  };

  // 🔹 count totals
  const getTotalCart = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  const getTotalList = () => {
    return Object.values(WishList).reduce((a, b) => a + b, 0);
  };

  const contextValue = {
    getTotalCart,
    product,
    cartItems,
    addToCart,
    RemoveCart,
    removeFromCart,
    getTotalList,
    WishList,
    clearCart,
    addToList,
    removeList,
    cartLoader,
    wishlistLoader,
    getTotalValue,
    categories,
    categoryLoader,
    product,
    ProdLoader,
    notifications,
    setNotification,
    loading,
    notificationLoader,
    fetchNotification,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
