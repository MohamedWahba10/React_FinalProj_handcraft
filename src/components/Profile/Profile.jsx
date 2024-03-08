import React, { useState } from "react";
import styles from "./Profile.module.css";
import PersonICon from "../../assets/images/personIcon.jpeg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Profile() {
  
  
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
      <Link to="/updateProfile">Update Profile</Link>
    </>
  );
}
