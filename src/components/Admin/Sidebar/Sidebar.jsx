import React, { useEffect, useState } from "react";
import "./Sidebar.css";
// import Logo from "../../";
import Logo from "../../../assets/images/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import axios from "axios";

const Sidebar = () => {
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
  console.log(window.innerWidth);

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
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Ad<span>m</span>in
          </span>
        </div>
 
        <span className="mt-4 ms-3 fs-5">
          Welcom {firstName}{" "}{lastName}
        </span>
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}

          {/* signoutIcon */}
          {/* <div className="menuItem">
          <UilSignOutAlt />
        </div> */}
        </div>
      </motion.div>
      {selected == 0 ? (
        <>
          {/* <div className="d-flex justify-content-center  my-5 align-items-center content">
            <div></div>
          </div> */}
        </>
      ) : (
        <>Romaaaaa</>
      )}
    </>
  );
};

export default Sidebar;
