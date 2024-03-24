import "./AdminPanel.css";
import Sidebar from "../Sidebar/Sidebar";

import React, { useState } from "react";

function AdminPanel() {
  return (
    <div className="Admin">
      <div className="AdminGlass">
        <Sidebar />
       
      </div>
    </div>
  );
}

export default AdminPanel;
