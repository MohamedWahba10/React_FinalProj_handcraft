import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css"
export default function Layout() {
  return (
    <>
      <NavBar />

      <div className={`${styles.outlet}`}>
        <div className={`${styles.oulet_content}`}>
        <Outlet />
        <Toaster />
        </div>
   
      </div>

      <Footer />
    </>
  );
}
