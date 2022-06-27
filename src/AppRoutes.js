import ProductDetails from "./Components/ProductDetails";
import ProductCategoryPage from "./Containers/ProductCategoryPage";
import BrokenLink from "./Containers/BrokenLink";
import { PrivacyPolicy } from "./Containers/StaticPages/PrivacyPolicy";
import { RefundPolicy } from "./Containers/StaticPages/RefundPolicy";
import { TermsAndConditions } from "./Containers/StaticPages/TermsAndConditions";
import OurRoots from "./Containers/OurRoots";
import Probiotics from "./Containers/ProductPages/Probiotics";
import Organics from "./Containers/ProductPages/Organics";
import ContactUs from "./Containers/ContactUs";
import LoginPage from "./Containers/LoginPage";
import RegisterPage from "./Containers/RegisterPage";
import Cart from "./Containers/CartPage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Containers/LandingPage";
import AllProducts from "./Containers/ProductPages/AllProducts";
import UserProfilePage from "./Containers/UserProfilePage";
import ViewOrders from "./Containers/ViewOrders";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/aboutus" element={<OurRoots />} />
        <Route exact path="/probiotics" element={<Probiotics />} />
        <Route
          exact
          path="/products/:category/:name"
          element={<ProductCategoryPage />}
        />
        <Route exact path="/product/:id/details" element={<ProductDetails />} />
        <Route exact path="/products/all" element={<AllProducts />} />
        <Route exact path="/organics" element={<Organics />} />
        <Route exact path="/contactus" element={<ContactUs />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route exact path="/refund-policy" element={<RefundPolicy />} />
        <Route exact path="/profile" element={<UserProfilePage />} />
        <Route exact path="/viewOrders" element={<ViewOrders />} />
        <Route
          exact
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        />

        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<BrokenLink />} />
      </Routes>
    </>
  );
};
