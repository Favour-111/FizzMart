import React, { useContext, useState } from "react";
import "./WishList.css";
import NavBar from "../../components/NavBar/NavBar";
import NavSm from "../../components/NavSm/NavSm";
import { LuTrash2 } from "react-icons/lu";
import { ShopContext } from "../../components/Context/ShopContext";
import product from "../../components/Product";
import { GiShoppingCart } from "react-icons/gi";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { MdChevronRight } from "react-icons/md";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
const WishList = () => {
  const navigate = useNavigate();
  const { WishList, removeList, addToCart } = useContext(ShopContext);
  const [stock, setStock] = useState(true);
  const wishlistProduct = product.filter(
    (itm) => WishList && WishList[itm.id] && WishList[itm.id] > 0
  );
  return (
    <div>
      <NavBar />
      <NavSm />
      <div className="home-container">
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
          My WishList
        </div>
        <div className="cart-header">My Wishlist</div>
        <div className="cart-content">
          There are {wishlistProduct.length} products in this wishlist.
        </div>
        {wishlistProduct.length > 0 ? (
          <>
            <div className="wishlist-container">
              <table>
                <thead>
                  <tr className="table-header">
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th></th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                {wishlistProduct.map((item) => {
                  return (
                    <tbody>
                      <tr className="table-content">
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>
                          <img
                            src={item.image}
                            alt=""
                            className="wishList-img"
                          />
                        </td>
                        <td>
                          <div className="WishList-Prod-name">{item.name}</div>
                          <div className="wishList-Prod-size">1 Kg</div>
                        </td>
                        <td className="Price">₦{item.newPrice}</td>
                        <td>
                          {stock ? (
                            <div className="inStock">In Stock</div>
                          ) : (
                            <div className="outStock">Out Of Stock</div>
                          )}
                        </td>
                        <td onClick={() => removeList(item.id)}>
                          <LuTrash2 className="wishList-trash" />
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
            <div className="wishlist-container-sm">
              {wishlistProduct.map((item) => {
                return (
                  <div className="wishlist-item-sm-cont">
                    <div className="wishlist-itm-sm">
                      <div>Product</div>
                      <div>
                        <img loading="lazy" src={item.image} alt="" />
                      </div>
                    </div>
                    <div className="wishlist-itm-sm">
                      <div>Name</div>
                      <div>{item.name}</div>
                    </div>
                    <div className="wishlist-itm-sm">
                      <div>Price</div>
                      <div>{item.newPrice}</div>
                    </div>
                    <div className="wishlist-itm-sm">
                      <div>Remove</div>
                      <div
                        onClick={() => {
                          removeList(item.id);
                          toast.success(`${item.name} removed from WIsh List`);
                        }}
                      >
                        {" "}
                        <LuTrash2 className="wishList-trash" />
                      </div>
                    </div>
                    <div className="wishlist-itm-sm">
                      <div>Cart</div>
                      <div
                        onClick={() => {
                          addToCart(item.id);
                          toast.success(`${item.name} has been added to cart`);
                        }}
                      >
                        <PiShoppingCartSimpleLight className="wishList-Cart" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="empty-wishlist-container">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-12057810-9824480.png"
              alt=""
            />
            <div className="empty-text">Your Wish list is empty</div>
            <div className="empty-cont">
              Explore more and shortlist some item
            </div>
            <button onClick={() => navigate("/shop-list")}>
              continue shopping
            </button>
          </div>
        )}
        <div className="recently-viewed">
          <RecentlyViewed />
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default WishList;
