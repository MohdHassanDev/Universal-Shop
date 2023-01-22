import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Adminpanel,
  Cart,
  Checkout,
  Dashboard,
  Home,
  Laptop,
  Login,
  Mobile,
  ProductDetails,
  Signup,
  Tablet,
} from "../screens";

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminpanel" element={<Adminpanel />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/productdetails" element={<ProductDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/mobile" element={<Mobile />} />
      <Route path="/tablet" element={<Tablet />} />
      <Route path="/laptop" element={<Laptop />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Approutes;
