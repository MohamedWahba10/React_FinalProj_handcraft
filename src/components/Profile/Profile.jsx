import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import PersonICon from "../../assets/images/personIcon.jpeg";
import { Link ,useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
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
  const userType = data?.data.message.usertype;
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
      {userType === "vendor" ? (
        <>
          <div className={`m-5  ${styles.profile}`}>
            <div>
              {imageUrl ? (
                <img src={`${imageUrl}`} alt="Profile" />
              ) : (
                <img src={PersonICon} alt="Default Profile" />
              )}
            </div>
            <h4>
              {data?.data.message.first_name} {data?.data.message.last_name}
            </h4>
            <h5>
              {userType}
            </h5>
            <div>
            <Link to="/updateProfile">
              
            <button className={`fs-5 py-2 ${styles.update_button}`} >Update Profile</button></Link>


            </div>
            <div>
            <button className={`fs-4 py-2 my-2 ${styles.update_button}`} >Delete Account</button>

            </div>

          </div>
        </>
      ) : (
        <div>
        {/* Use navigate to redirect to updateProfile */}
        {navigate('/updateProfile')}
      </div>
      )}
      <div></div>

    </>
  );
}
