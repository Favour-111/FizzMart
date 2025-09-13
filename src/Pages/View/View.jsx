import React, { useContext } from "react";
import "./View.css";
import NavBar from "../../components/NavBar/NavBar";
import NavSm from "../../components/NavSm/NavSm";
import { MdChevronRight } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Item from "../../components/Item/Item";
// import your product array
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Footer from "../../components/Footer/Footer";
import { ShopContext } from "../../components/Context/ShopContext";
import toast, { Toaster } from "react-hot-toast";
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
                  {!product.stock ? (
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
                        className="abt-add-cart opacity-75"
                        onClick={() => {
                          toast(
                            `${ProductFind?.productName} is currently unavailable`
                          );
                        }}
                      >
                        Item is Unavailable
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
        <div className="related-container">
          <div className="related-head">Related Items</div>
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
