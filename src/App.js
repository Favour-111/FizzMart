import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import Shop from "./Pages/Shop/Shop";
import SignIn from "./Pages/SignIn/SignIn";
import Cart from "./Pages/Cart/Cart";
import SignUp from "./Pages/SignUp/SignUp";
import WishList from "./Pages/WishList/WishList";
import About from "./Pages/About/About";
import category from "./components/categories";
import toast, { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import SubCategory from "./Pages/SubCategory/SubCategory";
import View from "./Pages/View/View";
import ResultPage from "./Pages/ResultPage/ResultPage";
import Settings from "./Pages/Settings/Settings";
import Profile from "./Pages/Settings/Profile";
import Orders from "./Pages/Settings/Orders";
import Address from "./Pages/Settings/Address";
import Notification from "./Pages/Settings/Notification";
import SingleOrder from "./Pages/SingleOrder/SingleOrder";
import EmailVerify from "./Pages/EmailVerify/EmailVerify";
import Checkout from "./Pages/Checkout/Checkout";
import Category from "./Pages/Category/Category";
import OrderConfirmation from "./Pages/OrderConfirmation/OrderConfirmation";
import ForgotPass from "./Pages/ForgotPass/ForgotPass";
import Reset from "./Pages/Reset/Reset";
import { useContext } from "react";
import { ShopContext } from "./components/Context/ShopContext";
function App() {
  const { categories, notifications, categoryLoader } = useContext(ShopContext);
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Contact />} path="/contact-us" />
        {categories.map((item) => (
          <Route
            key={item.name}
            path={`/category-${item.name}`}
            element={<Shop page={item.name} />}
          ></Route>
        ))}
        {categories.map((item) =>
          item.subcategories.map((sub) => (
            <Route
              key={sub.name}
              path={`/subcategory-${sub}`}
              element={<SubCategory page={sub} />}
            />
          ))
        )}

        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<Cart />} path="/cart-page" />
        <Route element={<SignUp />} path="/sign-up" />
        <Route element={<WishList />} path="/Wishlist-page" />
        <Route element={<About />} path="/About-page" />
        <Route element={<View />} path="/View-page/:id" />
        <Route element={<ResultPage />} path="/Result" />
        <Route element={<Settings />} path="/settings">
          <Route element={<Profile />} path="profile/:id" />
          <Route element={<Orders />} path="orders" />
          <Route element={<Address />} path="address" />
          <Route element={<Notification />} path="notification" />
        </Route>
        <Route element={<SingleOrder />} path="/order-details/:id"></Route>
        <Route element={<EmailVerify />} path="/users/:id/verify/:token" />
        <Route element={<Checkout />} path="/checkout-items" />
        <Route element={<Category />} path="/store-categories" />
        <Route element={<ForgotPass />} path="/Password-reset" />
        <Route element={<Reset />} path="/users/reset-password/:id/:token" />
        <Route element={<OrderConfirmation />} path="/Order-successful/:id" />
        {/* // for store categories = store-categories */}
      </Routes>
      <Toaster
        position="bottom-right"
        containerStyle={{
          position: "fixed", // 👈 stays on screen while scrolling
          bottom: 30, // margin from bottom
          zIndex: 2147483647, // max safe z-index
        }}
        toastOptions={{
          style: {
            fontSize: "12px",
            padding: "8px 12px",
          },
        }}
      />
    </>
  );
}

export default App;
