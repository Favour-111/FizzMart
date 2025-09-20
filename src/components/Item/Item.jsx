import React, { useContext } from "react";
import "./Item.css";
import { MdAdd } from "react-icons/md";
import {
  FaMinus,
  FaPlus,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { GiShoppingCart } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoAdd, IoEyeOutline } from "react-icons/io5";
import { ShopContext } from "../Context/ShopContext";
import toast, { Toaster } from "react-hot-toast";
import { FiMinus, FiShoppingBag } from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";
const Item = ({ product, category }) => {
  const {
    addToCart,
    cartItems,
    RemoveCart,
    cartLoader,
    addToList,
    WishList,
    removeList,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.Rating);
    const halfStar = product.Rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star filled" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star half" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
    }
    return stars;
  };

  return (
    <div className="item-body">
      <div className="item-border">
        <div
          onClick={() => {
            navigate(`/View-Page/${product._id}`, {
              state: {
                id: product.id,
              },
            });
            window.scrollTo(0, 0);
          }}
          className="item-image"
        >
          <img loading="lazy" src={product.image} alt="" />
        </div>
        <div className="item-content">
          <div className="item-category">
            {category === undefined ? product.category : category}
          </div>
          <div className="item-Name">{product.productName}</div>
          <div className="variation">{product.Variation || ""}</div>
          <div className="rating">
            <div>{renderStars()}</div>
            <div>({product.Rating})</div>
          </div>
          <div className="item-bottom">
            <div className="item-price">
              <div className="New-price">
                ₦{Number(product.newPrice).toLocaleString()}
              </div>
              {product.oldPrice && (
                <div className="old-price">
                  ₦{Number(product.oldPrice).toLocaleString()}
                </div>
              )}
            </div>
            {product.oldPrice && (
              <div className="item-discount">
                (-
                {(
                  ((product.oldPrice - product.newPrice) / product.oldPrice) *
                  100
                ).toFixed(0)}
                %)
              </div>
            )}
            {cartItems[product.id] > 0 ? (
              <div className="item-counter">
                <button onClick={() => RemoveCart(product.id)}>
                  <FiMinus />
                </button>

                {cartLoader === product.id ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <div className="item-count">{cartItems[product.id]}</div>
                )}

                <button onClick={() => addToCart(product.id)}>
                  <IoAdd />
                </button>
              </div>
            ) : product.availability !== "in Stock" ? (
              <button
                className="cart-btn opacity-75"
                onClick={() => toast("This item is currently unavailable")}
              >
                Item Unavailable
              </button>
            ) : (
              <button
                onClick={() => {
                  addToCart(product.id);
                }}
                className="cart-btn"
              >
                {cartLoader === product.id ? "Adding..." : "Add to cart"}
              </button>
            )}

            <div className="button-relative-container">
              {product.availability !== "in Stock" ? (
                <div
                  className="button-1 shadow-sm"
                  onClick={() => {
                    toast(`This item is currently unavailable`);
                  }}
                >
                  <FcCancel />
                </div>
              ) : (
                <div
                  className="button-1 shadow-sm"
                  onClick={() => {
                    addToCart(product.id);
                  }}
                >
                  {cartItems[product.id] > 0 ? (
                    <BsCartCheck />
                  ) : (
                    <GiShoppingCart />
                  )}
                </div>
              )}

              {WishList[product.id] > 0 ? (
                <div
                  className="button-2 shadow-sm"
                  onClick={() => {
                    removeList(product.id);

                    toast.success(
                      `${product.productName} removed from wishList`
                    );
                  }}
                >
                  <IoIosHeart />
                </div>
              ) : (
                <div
                  className="button-1 shadow-sm"
                  onClick={() => {
                    addToList(product.id);
                    toast.success(`${product.productName} added to wishList`);
                  }}
                >
                  <IoIosHeartEmpty />
                </div>
              )}

              <div
                className="button-1 shadow-sm"
                onClick={() => {
                  navigate(`/View-Page/${product._id}`, {
                    state: {
                      id: product.id,
                    },
                  });
                  window.scrollTo(0, 0);
                }}
              >
                <IoEyeOutline />
              </div>
            </div>
            {product.availability !== "in Stock" && (
              <div className="stock">Out Of Stock</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
