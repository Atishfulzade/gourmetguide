import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { SizeProvider } from "../context/SizeContext";
const Layout = () => {
  return (
    <SizeProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </SizeProvider>
  );
};

export default Layout;
