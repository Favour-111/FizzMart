import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import NavBar from "../../components/NavBar/NavBar";
import NavSm from "../../components/NavSm/NavSm";
import { MdChevronRight } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Item from "../../components/Item/Item";
import { io } from "socket.io-client";
// import your product array
import { GoPlus } from "react-icons/go";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LuMinus } from "react-icons/lu";
import { IoIosPaperPlane, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { TbArrowsSort } from "react-icons/tb";
import Footer from "../../components/Footer/Footer";
import { ShopContext } from "../../components/Context/ShopContext";
import toast, { Toaster } from "react-hot-toast";
import { RiUser6Line } from "react-icons/ri";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import axios from "axios";
import SingleProdLoader from "../../components/SingleProdLoader/SingleProdLoader";
import ProdSkeleton from "../../components/Skelenton/ProdSkelenton";
const View = () => {
  const {
    addToCart,
    product,
    cartItems,
    RemoveCart,
    addToList,
    WishList,
    removeList,
    ProdLoader,
  } = useContext(ShopContext);
  const { id } = useParams();

  const ProductFind = product.find((item) => item?._id === id) || null;

  const [user, setUser] = useState([]);

  const [comment, setComment] = useState([]);
  const [loader, setLoader] = useState(false);
  const [commentLoader, setCommentLoader] = useState(false);
  const [addLoader, setAddLoader] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const page = ProductFind?.subcategories[0];
  // pick the first product for now
  const currentProduct = product[0];

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(currentProduct?.Rating);
    const halfStar = currentProduct?.Rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar size={13} key={`full-${i}`} className="star filled" />
      );
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt size={13} key="half" className="star half" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar size={13} key={`empty-${i}`} className="star empty" />
      );
    }
    return stars;
  };
  const productFilter = product.filter((item) =>
    item.subcategories.includes(page)
  );
  const socket = io("https://fizzserver-1.onrender.com", {
    transports: ["websocket", "polling"], // allow fallback
    withCredentials: true, // optional, helps if you use cookies
  });

  const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"], // text formatting
      [{ list: "ordered" }, { list: "bullet" }], // lists
      ["clean"], // remove formatting
    ],
  };
  const allUser = async () => {
    setLoader(true);
    try {
      const userFETCH = await axios.get(`${process.env.REACT_APP_API}/allUser`);
      if (userFETCH) {
        setUser(userFETCH.data.users);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const allComment = async () => {
    setLoader(true);
    try {
      const commentFETCH = await axios.get(
        `${process.env.REACT_APP_API}/comments`
      );
      if (commentFETCH) {
        setComment(commentFETCH.data.message);
        console.log(comment);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    // 🔥 Listen for product added
    socket.on("comment-added", (newComment) => {
      setComment((prev) => [...prev, newComment]);
      toast.success(`new comment Added added!`);
    });

    // ✅ Cleanup to avoid duplicate listeners
    return () => {
      socket.off("comment-added");
    };
  }, [socket, setComment]);
  useEffect(() => {
    allUser();
    allComment();
  }, []);

  const userId = localStorage.getItem("userId");
  const fetchUser = user.find((item) => item._id === userId) || null;
  const sendComment = async () => {
    if (!fetchUser) {
      toast.error("User not found, please log in first");
      return;
    }
    if (!value.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const formData = {
      name: fetchUser?.FullName,
      product_id: id,
      content: value,
    };
    console.log(formData);

    try {
      setAddLoader(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API}/addComment`,
        formData
      );

      setComment((prev) => [...prev, response.data]); // append new comment
      setValue(""); // clear editor
      toast.success("Comment submitted");
    } catch (error) {
      toast.error("Error adding review");
      console.log(error);
    } finally {
      setAddLoader(false);
    }
  };
  const handleLike = async (commentId) => {
    try {
      if (!userId) {
        toast.error("Please login to like comments");
        return; // 🚨 stop execution if not logged in
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API}/${commentId}/like`,
        { userId }
      );
      // Update local state with new comment
      setComment((prev) =>
        prev.map((c) => (c._id === commentId ? res.data : c))
      );
      if (res) {
        toast.success("comment has been liked");
      } else {
        toast.error("error liking comment");
      }
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  const handleUnlike = async (commentId) => {
    if (!userId) {
      toast.error("Please login to dislike comments");
      return; // 🚨 stop execution if not logged in
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/${commentId}/unlike`,
        {
          userId,
        }
      );
      setComment((prev) =>
        prev.map((c) => (c._id === commentId ? res.data : c))
      );
      if (res) {
        toast.success("comment has been disliked");
      } else {
        toast.error("error liking disliked");
      }
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };
  const commentFilter = comment.filter((item) => item.product_id === id);
  console.log(comment);

  const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return past.toLocaleDateString(); // fallback full date
  };

  const sortedComments = [...commentFilter].sort((a, b) => {
    if (sortType === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt); // newest first
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt); // oldest first
    }
  });

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
          <span>{ProductFind?.category}</span>

          <div className="slash">
            <MdChevronRight />
          </div>
          {page}
        </div>
        {ProductFind ? (
          <div className="product-about-container">
            <div className="product-about-container-image">
              <img src={ProductFind?.image} alt={ProductFind?.productName} />
            </div>
            <div className="product-about-container-content">
              {ProductFind?.availability !== "in Stock" ? (
                <div className="Stock-cont out">Out Of Stock</div>
              ) : (
                <div className="Stock-cont in">in Stock</div>
              )}

              <div className="cont-1">
                <div className="prod-abt-category">
                  {ProductFind?.category} <MdChevronRight /> {page}
                </div>
                <div className="prod-abt-name">{ProductFind?.productName}</div>

                {/* rating stars */}
                <div className="d-flex align-items-center gap-1 ">
                  <div className="prod-abt-rating">{renderStars()}</div>
                  <div className="ratin-num mt-1">
                    ({ProductFind?.Rating} star)
                  </div>
                </div>
                {/* price (if available in your array) */}
                <div className="d-flex align-items-center gap-1 mt-2">
                  <div className="prod-abt-price">
                    ₦{Number(ProductFind?.newPrice).toLocaleString()}
                  </div>

                  {ProductFind?.oldPrice && (
                    <>
                      <div>/</div>
                      <div className="prod-abt-Old-price">
                        ₦{Number(ProductFind?.oldPrice).toLocaleString()}
                      </div>
                      <div className="item-discount-lg">
                        (-
                        {(
                          ((Number(ProductFind?.oldPrice) -
                            Number(ProductFind?.newPrice)) /
                            Number(ProductFind?.oldPrice)) *
                          100
                        ).toFixed(0)}
                        %)
                      </div>
                    </>
                  )}
                </div>

                {ProductFind?.Variation && (
                  <div className="gram-cont">{ProductFind?.Variation}</div>
                )}
              </div>
              <div className="cont-2">
                <div className="abt-buttons">
                  <div>
                    {ProductFind?.availability === "in Stock" ? (
                      cartItems[ProductFind?.id] > 0 ? (
                        <div className="abt-counter-body">
                          <button
                            onClick={() => {
                              addToCart(ProductFind?.id);
                            }}
                            className="abt-button-1"
                          >
                            <GoPlus />
                          </button>
                          <div className="about-counter">
                            {cartItems[ProductFind?.id]}
                          </div>
                          <button
                            onClick={() => {
                              RemoveCart(ProductFind?.id);
                              toast.success(
                                `${ProductFind?.productName} removed`
                              );
                            }}
                            className="abt-button-2"
                          >
                            <LuMinus />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="abt-add-cart"
                          onClick={() => {
                            toast.success(
                              `${ProductFind?.productName} added to cart`
                            );
                          }}
                        >
                          Add to Cart
                        </button>
                      )
                    ) : (
                      <button
                        className="abt-add-cart opacity-75"
                        onClick={() => {
                          toast.success(
                            `${ProductFind?.productName} is currently unavailable`
                          );
                        }}
                      >
                        Item Unavailable
                      </button>
                    )}
                  </div>

                  {WishList[ProductFind?.id] > 0 ? (
                    <button
                      className="abt-heart-1"
                      onClick={() => {
                        removeList(ProductFind?.id);
                        toast.success(
                          `${ProductFind?.productName} removed from wish list`
                        );
                      }}
                    >
                      <IoMdHeart size={20} />
                    </button>
                  ) : (
                    <button
                      className="abt-heart-1"
                      onClick={() => {
                        addToList(ProductFind?.id);
                        toast.success(
                          `${ProductFind?.productName} added to wish list`
                        );
                      }}
                    >
                      <IoMdHeartEmpty size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SingleProdLoader />
        )}

        <div className="det-text-container">
          <div className="details-text-head">Product Details</div>
          <div className="details-line">
            <div className="inner-line"></div>
          </div>
          <div
            className="detail-content"
            dangerouslySetInnerHTML={{
              __html: ProductFind?.productDescription,
            }}
          ></div>
        </div>
        <div className="comment-section-container">
          <div className="header-sub-head">Comment</div>
          <div className="related-head">Product Review Section</div>
          <div className="New-ProductContent">check out Customers reviews</div>

          <div className="styled-quill-wrapper">
            <ReactQuill
              theme="snow"
              className="custom-quill"
              value={value}
              onChange={setValue}
              modules={modules} // 👈 pass custom toolbar
              placeholder="Write your comment now..."
            />
          </div>
          <button className="send-button" onClick={() => sendComment()}>
            {addLoader ? "Sending..." : "Send"} <IoIosPaperPlane />
          </button>

          <div className="mt-5 d-flex align-items-center justify-content-between">
            <div className="comment-head">
              Comments{" "}
              <span>{comment.filter((c) => c.product_id === id).length}</span>
            </div>
            <div className="sort-comment-cont">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          {loader ? (
            <div className="comment-loading">
              <div>
                <div class="text-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
              <div className="mt-2">loading</div>
            </div>
          ) : commentFilter?.length > 0 ? (
            <div className="comment-container">
              {sortedComments.map((item) => {
                return (
                  <div className="comment-item">
                    <div>
                      <div className="icon">
                        <RiUser6Line />
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="review-name">
                          {item.name === fetchUser?.FullName
                            ? "you"
                            : item.name}{" "}
                        </div>
                      </div>
                      <div className="timer">{timeAgo(item.createdAt)}</div>
                      <div
                        className="review"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                      <div className=" d-flex align-items-center gap-3 mt-2">
                        <div className="d-flex align-items-center gap-1 likes-buttons">
                          <div
                            className="d-flex align-items-center gap-1 likes-buttons"
                            onClick={() => handleLike(item._id)}
                            style={{ cursor: "pointer" }}
                          >
                            <AiFillLike
                              color={
                                item.likedBy.includes(userId)
                                  ? "tomato"
                                  : "#787878"
                              }
                              size={18}
                              className="mb-1"
                            />
                            <div
                              className={
                                item.likedBy.includes(userId)
                                  ? "item-like"
                                  : "item-unlike"
                              }
                              style={{
                                color: item.likedBy.includes(userId)
                                  ? "tomato"
                                  : "#787878",
                              }}
                            >
                              {item.likes}
                            </div>
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-center gap-1 likes-buttons"
                          onClick={() => handleUnlike(item._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <AiFillDislike
                            color={
                              item.unlikedBy.includes(userId)
                                ? "tomato"
                                : "#787878"
                            }
                            size={18}
                            className=""
                          />
                          <div
                            className={
                              item.unlikedBy.includes(userId)
                                ? "item-unlike-active"
                                : "item-unlike"
                            }
                            style={{
                              color: item.unlikedBy.includes(userId)
                                ? "tomato"
                                : "#787878",
                            }}
                          >
                            {item.unlikes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="noComment">
              <div className="img">
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/no-comment-3d-icon-png-download-7794550.png"
                  alt=""
                />
              </div>
              <div>There are no comment available</div>
            </div>
          )}
        </div>
        <div className="related-container">
          <div className="header-sub-head">Products</div>
          <div className="related-head">You May also like</div>
          <div className="New-ProductContent">checkout related items</div>
          <div className="NewProducts mt-2">
            {ProdLoader ? (
              <div className="NewProducts mt-4">
                <ProdSkeleton />
                <ProdSkeleton />
                <ProdSkeleton />
                <ProdSkeleton />
                <ProdSkeleton />
                <ProdSkeleton />
                <ProdSkeleton />
                <ProdSkeleton />
                <ProdSkeleton />
                <ProdSkeleton />
              </div>
            ) : (
              productFilter.reverse().map((item) => {
                return <Item product={item} />;
              })
            )}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default View;
