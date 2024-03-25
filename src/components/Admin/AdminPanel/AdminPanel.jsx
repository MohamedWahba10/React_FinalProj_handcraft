import "./AdminPanel.css";

import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminCategory from "../AdminCategory/AdminCategory";
import { Outlet, useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();

  const handleNavigation = (selectedIndex) => {
    if (selectedIndex === 1) {
      navigate("/adminPanel/adminCategory");
    }
    if (selectedIndex === 2) {
      navigate("/adminPanel/adminSubCategory");
    }
  };
  return (
    <div className="Admin">
      <div className="AdminGlass">
        <Sidebar handleNavigation={handleNavigation} />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
