import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
const AppLayout = ({ authenticate, setAuthenticate }) => {
  return (
    <div>
      <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
