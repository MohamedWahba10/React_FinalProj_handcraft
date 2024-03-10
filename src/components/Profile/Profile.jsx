import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import PersonICon from "../../assets/images/personIcon.jpeg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";


export default function Profile() {
  const [data, setData] = useState(null);



  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("response", response);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    ProfileData();
  }, []);

  console.log("dataaaaaaaaaaaaaaaaaaaaa", data?.data.message.imageUrl);
  const imageUrl = data?.data.message.imageUrl;
  console.log("imggggggggggg", imageUrl);
 
  

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className={`${styles.header_profile} py-5 mb-5 text-center `}>
        <h1>Your Profile</h1>

        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>

        <span className={`${styles.span_profile}`}>&gt;Profile</span>
      </div>
      {imageUrl ? (
        // <img src={modifiedImageUrl} alt="Profile" />
        <img src={`${imageUrl}`} alt="Profile" />
        ) : (
        <img
          src={PersonICon}
          alt="Default Profile"
        />
      )}

      <Link to="/updateProfile">Update Profile</Link>
    </>
  );
}
