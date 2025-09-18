import React, { useContext, useMemo, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import NavSm from "../../components/NavSm/NavSm";
import Item from "../../components/Item/Item";
import Footer from "../../components/Footer/Footer";
import {
  MdChevronRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineChevronRight,
  MdOutlineClose,
} from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoChevronDownOutline, IoListOutline } from "react-icons/io5";
import { CiFilter, CiGrid41 } from "react-icons/ci";
import { BsGrid3X3Gap } from "react-icons/bs";
import category from "../../components/categories";
import { Link, useNavigate } from "react-router";
import { ShopContext } from "../../components/Context/ShopContext";

// ⭐ star rating component
const RatingFilter = ({ rating, setRating }) => {
  const handleCheckboxChange = (val) => {
    if (rating === val) {
      setRating(""); // unselect if same
    } else {
      setRating(val);
    }
  };

  return (
    <div className="rating-filter mt-1">
      {[5, 4, 3, 2, 1].map((val) => (
        <label key={val} className="star-label" style={{ display: "block" }}>
          <div className="star-container">
            <div>
              <input
                className="star-checkbox"
                type="checkbox"
                checked={rating === String(val)}
                onChange={() => handleCheckboxChange(String(val))}
              />
            </div>
            <div className="star-text" style={{}}>
              {Array.from({ length: val }, (_, i) => (
                <FaStar key={i} color="gold" />
              ))}{" "}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

const Shop = ({ page }) => {
  const { categories, product, categoryLoader } = useContext(ShopContext);
  const navigate = useNavigate();
  // --- STATE ---

  const [filter, setFilter] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [inStock, setInStock] = useState(""); // "in", "out", or ""
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openCategory, setOpenCategory] = useState(null);

  const [rating, setRating] = useState(""); // 1–5
  let filteredCategory;
  // --- FILTER (Dry Goods only) ---
  console.log(product);
  const include = product?.find((p) => p?.subcategories === "Turkey");
  console.log(include);

  const filteredProducts = useMemo(() => {
    return product.filter((p) => {
      const subs =
        p.subcategories?.flatMap((s) => s.split(",").map((x) => x.trim())) ||
        [];
      if (!subs.includes(page)) return false;
      if (inStock === "out" && p.availability === "in Stock") return false;
      if (inStock === "in" && p.availability === "out Of Stock") return false;
      if (minPrice && Number(p.newPrice) < Number(minPrice)) return false;
      if (maxPrice && Number(p.newPrice) > Number(maxPrice)) return false;
      if (rating && Number(p.Rating) < Number(rating)) return false;
      return true;
    });
  }, [page, inStock, minPrice, maxPrice, rating]);

  // --- SORT ---
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    switch (sortBy) {
      case "price-high":
        arr.sort((a, b) => Number(b.newPrice) - Number(a.newPrice));
        break;
      case "price-low":
        arr.sort((a, b) => Number(a.newPrice) - Number(b.newPrice));
        break;
      case "rating":
        arr.sort((a, b) => Number(b.Rating) - Number(a.Rating));
        break;
      case "recent":
        arr.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
      default:
        break;
    }
    return arr;
  }, [filteredProducts, sortBy]);

  // --- PAGINATION ---
  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- RENDER PAGINATION ---
  const renderPagination = () => {
    const pages = [];
    const maxEdge = 5;

    pages.push(
      <button
        key="prev"
        className="page-btn prev"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <MdKeyboardArrowLeft />
      </button>
    );

    if (totalPages <= maxEdge) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`page-btn ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          className={`page-btn ${currentPage === 1 ? "active" : ""}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (currentPage > 3) {
        pages.push(
          <span key="dots-left" className="dots">
            ...
          </span>
        );
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(
          <button
            key={i}
            className={`page-btn ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="dots-right" className="dots">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          className={`page-btn ${currentPage === totalPages ? "active" : ""}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    pages.push(
      <button
        key="next"
        className="page-btn next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <MdKeyboardArrowRight />
      </button>
    );

    return pages;
  };
  const pageName = categories.find((item) =>
    item.subcategories.some((sub) => sub.includes(page))
  );

  return (
    <div>
      <NavBar />
      <NavSm />
      <div className="home-container">
        {/* Breadcrumb */}
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
          <span onClick={() => navigate(`/category-${pageName?.name}`)}>
            {pageName?.name}
          </span>
          <div className="slash">
            <MdChevronRight />
          </div>
          {page}
        </div>
        <div className="shop">
          <div className="filter-container">
            {/* --- Filter category --- */}
            <div className="filter-category">
              <div className="filter-head">Categories</div>

              <div className="filter-item mb-3">
                {categories.map((item, index) => {
                  const isOpen = openCategory === index; // check if this one is open

                  return (
                    <div key={item.name}>
                      <Link
                        className="filter-cat-items"
                        onClick={
                          () => setOpenCategory(isOpen ? null : index) // toggle only this one
                        }
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div>
                            <img
                              src={item.image}
                              alt=""
                              className="filter-img"
                            />
                          </div>
                          <div>{item.name}</div>
                        </div>
                        <div>
                          {isOpen ? (
                            <IoChevronDownOutline />
                          ) : (
                            <MdOutlineChevronRight />
                          )}
                        </div>
                      </Link>

                      <div
                        className={`filter-sub-category-container ${
                          isOpen ? "active" : ""
                        }`}
                      >
                        <ul>
                          {item.subcategories.map((sub) => (
                            <li
                              key={sub}
                              onClick={() => {
                                setFilter(false);
                                navigate(`/Subcategory-${sub}`);
                              }}
                            >
                              <div className="Filter-sub-category-items">
                                {sub}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Stock filter */}
            <div className="filter-head mb-2">Stock</div>
            <select
              value={inStock}
              className="form-select mb-4 p-2"
              onChange={(e) => {
                setInStock(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Stock</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>

            {/* Price range */}
            <div>
              <div className="filter-head mb-2">Price ₦</div>
              <div className="d-flex align-items-center  mb-4 gap-2">
                <div>
                  {" "}
                  <input
                    type="text"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div>-</div>
                <div>
                  <input
                    type="text"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="filter-head mb-2">Sort</div>

            <select
              value={sortBy}
              className="form-select p-2"
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Sort By : Featured</option>
              <option value="recent">Recently Added</option>
              <option value="price-high">Price : High to Low</option>
              <option value="price-low">Price : Low to High</option>
              <option value="rating">Avg rating</option>
            </select>
            <div className="filter-head mt-4">Ratings</div>

            <RatingFilter rating={rating} setRating={setRating} />

            {/* banner */}
            <div className="side-banner">
              <div className="side-head">Dry Goods</div>
              <div className="side-content">Get Upto 25% off</div>
              <button>
                Shop now <FaArrowRightLong className="ms-2" />
              </button>
            </div>
          </div>
          <div className="shop-bdy">
            {/* Heading + image */}
            <div className="shop-name">
              <div>{page}</div>
              <div>
                <img loading="lazy" src={pageName.image} alt="banner" />
              </div>
            </div>

            {/* Top controls */}
            <div className="item-head">
              <div className="product-found">
                <span>{sortedProducts.length}</span> Products found
              </div>
              <div className="select-item">
                <div className="filter">
                  <button
                    className="filter-open-button"
                    onClick={() => setFilter(true)}
                  >
                    <div>
                      <CiFilter />
                    </div>
                    <div>Filters</div>
                  </button>
                  <div className="filter-icons-cont">
                    <div className="filter-icons">
                      <IoListOutline />
                    </div>
                    <div className="filter-icons">
                      <CiGrid41 />
                    </div>
                    <div className="filter-icons">
                      <BsGrid3X3Gap />
                    </div>
                  </div>
                </div>

                {/* Show (items per page) */}
                <div className="select-div">
                  <select
                    className="form-select show"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={10}>Show : 10</option>
                    <option value={20}>Show : 20</option>
                    <option value={30}>Show : 30</option>
                    <option value={40}>Show : 40</option>
                    <option value={50}>Show : 50</option>
                  </select>
                  <select
                    value={sortBy}
                    className="form-select sort"
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">Sort By : Featured</option>
                    <option value="recent">Recently Added</option>
                    <option value="price-high">Price : High to Low</option>
                    <option value="price-low">Price : Low to High</option>
                    <option value="rating">Avg rating</option>
                  </select>
                </div>
              </div>
            </div>
            {currentProducts.length < 1 ? (
              <div className="no-prod-cont">
                <img
                  src="https://t4.ftcdn.net/jpg/04/16/51/95/360_F_416519523_wabFJQqgcyTX2uSsKaeeqQg0Okr91XYn.jpg"
                  alt=""
                />
                <p className="no-prod-text">no product in this category</p>
              </div>
            ) : (
              <></>
            )}

            {/* Products grid */}
            <div className="new-product-container">
              <div className="mt-3 NewProducts">
                {currentProducts.map((item) => (
                  <Item
                    key={item.id || item.name}
                    product={item}
                    category={page}
                  />
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="pagination">{renderPagination()}</div>
          </div>
        </div>
        <div className={`filter-container-bg ${filter ? "active" : ""}`}></div>
        <div
          className={`filter-container-sm shadow-sm ${filter ? "active" : ""}`}
        >
          <div className="filter-sm">
            {/* --- Filter Head --- */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="filter-sm-head">Filter</div>
              <div className="close-icon" onClick={() => setFilter(false)}>
                <MdOutlineClose size={25} color="#787878" />
              </div>
            </div>
            {/* --- Filter category --- */}
            <div className="filter-category">
              <div className="filter-head">Categories</div>
              <div className="filter-item mb-3">
                {categories.map((item, index) => {
                  const isOpen = openCategory === index; // check if this one is open

                  return (
                    <div key={item.name}>
                      <Link
                        className="filter-cat-items"
                        onClick={
                          () => setOpenCategory(isOpen ? null : index) // toggle only this one
                        }
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div>
                            <img
                              src={item.image}
                              alt=""
                              className="filter-img"
                            />
                          </div>
                          <div>{item.name}</div>
                        </div>
                        <div>
                          {isOpen ? (
                            <IoChevronDownOutline />
                          ) : (
                            <MdOutlineChevronRight />
                          )}
                        </div>
                      </Link>

                      <div
                        className={`filter-sub-category-container ${
                          isOpen ? "active" : ""
                        }`}
                      >
                        <ul>
                          {item.subcategories.map((sub) => (
                            <li
                              key={sub}
                              onClick={() => {
                                setFilter(false);
                                navigate(`/Subcategory-${sub}`);
                              }}
                            >
                              <Link className="Filter-sub-category-items">
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Stock filter */}
            <div className="filter-head mb-2">Stock</div>
            <select
              value={inStock}
              className="form-select mb-4 p-2"
              onChange={(e) => {
                setInStock(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Stock</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>

            {/* Price range */}
            <div>
              <div className="filter-head mb-2">Price ₦</div>
              <div className="d-flex align-items-center  mb-4 gap-2">
                <div>
                  {" "}
                  <input
                    type="text"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div>-</div>
                <div>
                  <input
                    type="text"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="filter-head mb-2">Sort</div>

            <select
              value={sortBy}
              className="form-select p-2"
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Sort By : Featured</option>
              <option value="recent">Recently Added</option>
              <option value="price-high">Price : High to Low</option>
              <option value="price-low">Price : Low to High</option>
              <option value="rating">Avg rating</option>
            </select>
            <div className="filter-head mt-4">Ratings</div>

            <RatingFilter rating={rating} setRating={setRating} />

            {/* banner */}
            <div className="side-banner">
              <div className="side-head">Dry Goods</div>
              <div className="side-content">Get Upto 25% off</div>
              <button>
                Shop now <FaArrowRightLong className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
