import React, { useContext, useState } from "react";
import NavSm from "../../components/NavSm/NavSm";
import NavBar from "../../components/NavBar/NavBar";
import "./Cart.css";
import { RiDeleteBinLine, RiSubtractFill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Footer from "../../components/Footer/Footer";
import { ShopContext } from "../../components/Context/ShopContext";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { MdChevronRight } from "react-icons/md";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import CartLoader from "../../components/CartLoader/CartLoader";
const Cart = () => {
  const navigate = useNavigate();
  const [text, setText] = useState({
    value: "",
  });
  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };
  const Navigate = useNavigate();
  const {
    product,
    cartItems,
    RemoveCart,
    cartLoader,
    addToCart,
    getTotalValue,
    removeFromCart,
    loading,
  } = useContext(ShopContext);
  console.log(cartItems);
  const cartProducts = product.filter(
    (itm) => cartItems && cartItems[itm.id] && cartItems[itm.id] > 0
  );
  const [Coupon, setCoupon] = useState(0);
  const couponDiscount = (Coupon / 100) * Number(getTotalValue());
  const handleSubmit = () => {
    if (text.value === "") {
      toast.error("coupon input is required");
    } else if (text.value === "SAVE4") {
      setCoupon(4);
      toast.success("coupon applied successfully");
    } else {
      setCoupon(0);
      toast.error("invalid coupon code");
    }
    // console.log(Coupon);
  };
  return (
    <div>
      <NavBar />
      <NavSm />
      <div className="home-container mb-5">
        <div className="bread-crumb mt-3">
          <Link to="/" className="bread-crumb-link">
            Home
          </Link>
          <div className="slash">
            <MdChevronRight />
          </div>
          <span>Shop</span>
          <div className="slash">
            <MdChevronRight />
          </div>
          Shopping Cart
        </div>

        <div className="cart-header">Shop Cart</div>
        <div className="cart-content">Review your items before checkout</div>
        {loading ? (
          <CartLoader />
        ) : (
          <>
            {" "}
            {cartProducts.length > 0 ? (
              <div className="cart-container">
                <div className="cart-body">
                  {cartProducts.map((item) => {
                    if (cartItems[item.id] > 0) {
                      return (
                        <div className="cart-item">
                          <div className="d-flex align-items-center gap-2">
                            <div>
                              <img
                                loading="lazy"
                                src={item.image}
                                alt=""
                                className="cart-image"
                              />
                            </div>
                            <div>
                              <div className="cart-item-name">
                                {item.productName}
                              </div>
                              <div className="cart-weight">
                                {cartItems[item.id]} kg
                              </div>
                              <div
                                className="remove-section"
                                onClick={() => {
                                  removeFromCart(item.id);
                                  toast.success(
                                    `${item.name} has been removed from cart`
                                  );
                                }}
                              >
                                <div className="cart-remove-icon ">
                                  <FaRegTrashAlt size={14} />
                                </div>
                                <div className="text">Remove</div>
                              </div>
                            </div>
                          </div>
                          {cartLoader === product.id ? (
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            <div className="cart-counter">
                              <div
                                className="cart-counter-btn"
                                onClick={() => addToCart(item.id)}
                              >
                                <AiOutlinePlus />
                              </div>
                              <div className="cart-amount">
                                {cartLoader === item.id ? (
                                  <div
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                  >
                                    <span class="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                ) : (
                                  cartItems[item.id]
                                )}
                              </div>
                              <div
                                className="cart-counter-btn"
                                onClick={() => RemoveCart(item.id)}
                              >
                                <RiSubtractFill />
                              </div>
                            </div>
                          )}
                          <div className="Cart-price">
                            ₦
                            {(
                              item.newPrice * cartItems[item.id]
                            ).toLocaleString()}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="cart-summary">
                  <div className="cart-head">Summary</div>
                  <div className="shipping-head">Estimated shipping</div>
                  <div className="shipping-content mb-3">
                    Enter your destination to get a shipping estimate
                  </div>
                  <div className="price">
                    <div>sub-total</div>
                    <div className="cart-sub-price">
                      ₦ {getTotalValue().toLocaleString()}
                    </div>
                  </div>

                  <div className="price">
                    <div>coupon-discount</div>
                    <div className="cart-sub-price">{Coupon}% discount</div>
                  </div>
                  <div className="price">
                    <div>Coupon</div>
                    <div className="cart-sub-price">
                      ₦ {couponDiscount !== 0 ? "-" : ""}{" "}
                      {couponDiscount.toLocaleString()}
                    </div>
                  </div>
                  <div className="price">
                    <input
                      type="text"
                      name="value"
                      onChange={handleChange}
                      value={text.value}
                      className="coupon-input"
                    />
                    <button className="coupon-button" onClick={handleSubmit}>
                      Apply
                    </button>
                  </div>
                  <div className="line"></div>
                  <div className="price">
                    <div>Total</div>
                    <div className="cart-sub-price">
                      ₦ {(getTotalValue() - couponDiscount).toLocaleString()}{" "}
                      <span>
                        {couponDiscount !== 0 ? " (-2 % discount)" : null}
                      </span>
                    </div>
                  </div>
                  <div className="shipping-content-buttons">
                    <button
                      className="continue-shopping"
                      onClick={() => navigate("/store-categories")}
                    >
                      Continue Shopping
                    </button>
                    <button
                      className="checkout-button"
                      onClick={() => {
                        if (!localStorage.getItem("auth-token")) {
                          toast(
                            "Please ensure you sign in before checking out"
                          );
                          navigate("/sign-in");
                        } else {
                          navigate("/checkout-items", {
                            state: { couponDiscount }, // ✅ wrap in object
                          });
                        }
                      }}
                    >
                      Check out{" "}
                      <span>
                        ₦{(getTotalValue() - couponDiscount).toLocaleString()}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-cart">
                <img
                  src="https://threedio-prod-var-cdn.icons8.com/wf/preview_sets/previews/fnC2rp3ReDj4Y9HM.webp"
                  alt=""
                />
                <div className="cart-empty-head">
                  Your cart is currently empty
                </div>
                <div className="cart-empty-content">
                  Before proceeding to checkout you must add some product to
                  your shopping cart you will find alot of product on our "shop
                  page"
                </div>
                <button onClick={() => Navigate("/store-categories")}>
                  Start Shopping
                </button>
              </div>
            )}
          </>
        )}

        <div className="recently-viewed">
          <RecentlyViewed />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
