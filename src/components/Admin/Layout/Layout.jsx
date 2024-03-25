import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import styles from "./Layout.module.css";
import AdminPanel from "../AdminPanel/AdminPanel";
export default function LayoutAdmin() {
  return (
    <>
      <AdminPanel />

      <div className="d-flex justify-content-center align-items-center">
        <Outlet />
      </div>
    </>
  );
}
