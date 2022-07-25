import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

function HomeLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default HomeLayout;
