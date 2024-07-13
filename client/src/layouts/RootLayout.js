import React from "react";
import "../css/App.css";
import NavigationBar from "../components/common/NavigationBar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <NavigationBar />

      <main>
        <Outlet></Outlet>
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;
