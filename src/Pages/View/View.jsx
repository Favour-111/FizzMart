import React, { useContext, useState } from "react";
import "./View.css";
import NavBar from "../../components/NavBar/NavBar";
import NavSm from "../../components/NavSm/NavSm";
import { MdChevronRight } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Item from "../../components/Item/Item";
// import your product array
import { GoPlus } from "react-icons/go";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LuMinus } from "react-icons/lu";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { TbArrowsSort } from "react-icons/tb";
import Footer from "../../components/Footer/Footer";
import { ShopContext } from "../../components/Context/ShopContext";
import toast, { Toaster } from "react-hot-toast";
import { RiUser6Line } from "react-icons/ri";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
const View = () => {
  const {
    addToCart,
    product,
    cartItems,
    RemoveCart,
    addToList,
    WishList,
    removeList,
  } = useContext(ShopContext);
  const { id } = useParams();

  const ProductFind = product.find((item) => item?._id === id);

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
  console.log(productFilter);
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"], // text formatting
      [{ list: "ordered" }, { list: "bullet" }], // lists
      ["clean"], // remove formatting
    ],
  };
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
          <span>{currentProduct?.category}</span>

          <div className="slash">
            <MdChevronRight />
          </div>
          {page}
        </div>
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
                {currentProduct?.category} <MdChevronRight /> {page}
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
                  {ProductFind.availability === "in Stock" ? (
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
                        className="abt-add-cart "
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
          <div className="d-flex align-items-center justify-content-between">
            <div className="comment-head">
              Comments <span>26</span>
            </div>
            <div className="sort-comment-cont">
              Most Recent <TbArrowsSort />
            </div>
          </div>
          <div className="comment-container">
            <div className="comment-item">
              <div>
                <div className="icon">
                  <RiUser6Line />
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <div className="review-name">omojola obaloluwa favour</div>
                </div>
                <div className="timer">58 minutes ago</div>
                <div className="review">
                  i really don't like the product i got it doesn't work well but
                  it was delivered fast
                </div>
                <div className=" d-flex align-items-center gap-3 mt-2">
                  <div className="d-flex align-items-center gap-1 likes-buttons">
                    <div>
                      <AiFillLike size={18} className="mb-1" />
                    </div>
                    <div>54</div>
                  </div>
                  <div className="d-flex align-items-center gap-1 likes-buttons">
                    <div>
                      <AiFillDislike size={18} className="mb-1" />
                    </div>
                    <div>3</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="comment-item">
              <div>
                <div className="icon">
                  <RiUser6Line />
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <div className="review-name">omojola obaloluwa favour</div>
                </div>
                <div className="timer">58 minutes ago</div>
                <div className="review">
                  i really don't like the product i got it doesn't work well but
                  it was delivered fast
                </div>
                <div className=" d-flex align-items-center gap-3 mt-2">
                  <div className="d-flex align-items-center gap-1 likes-buttons">
                    <div>
                      <AiFillLike size={18} className="mb-1" />
                    </div>
                    <div>54</div>
                  </div>
                  <div className="d-flex align-items-center gap-1 likes-buttons">
                    <div>
                      <AiFillDislike size={18} className="mb-1" />
                    </div>
                    <div>3</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="comment-item">
              <div>
                <div className="icon">
                  <RiUser6Line />
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <div className="review-name">omojola obaloluwa favour</div>
                </div>
                <div className="timer">58 minutes ago</div>
                <div className="review">
                  i really don't like the product i got it doesn't work well but
                  it was delivered fast
                </div>
                <div className=" d-flex align-items-center gap-3 mt-2">
                  <div className="d-flex align-items-center gap-1 likes-buttons">
                    <div>
                      <AiFillLike size={18} className="mb-1" />
                    </div>
                    <div>54</div>
                  </div>
                  <div className="d-flex align-items-center gap-1 likes-buttons">
                    <div>
                      <AiFillDislike size={18} className="mb-1" />
                    </div>
                    <div>3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="related-container">
          <div className="header-sub-head">Products</div>
          <div className="related-head">You May also like</div>
          <div className="New-ProductContent">checkout related items</div>
          <div className="NewProducts mt-2">
            {productFilter.reverse().map((item) => {
              return <Item product={item} />;
            })}
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
