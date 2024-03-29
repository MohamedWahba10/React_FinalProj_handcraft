
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Logo from "../../../assets/images/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = ({ handleNavigation }) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  const [dataUser, setDataUser] = useState(null);

  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      setDataUser(response.data);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    ProfileData();
  }, []);

  if (!dataUser) {
    return null;
  }

  const firstName = dataUser?.message.first_name;
  const lastName = dataUser?.message.last_name;

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Ad<span>m</span>in
          </span>
        </div>

        <span className="mt-4 ms-3 fs-5">
          Welcome {firstName} {lastName}
        </span>
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => {
                  setSelected(index);
                  handleNavigation(index);
                }}
              >
                <item.icon />
                <span>
                  <Link to={item.path} className="text-decoration-none text-dark">
                    {item.heading}
                  </Link>
                </span>{" "}
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
