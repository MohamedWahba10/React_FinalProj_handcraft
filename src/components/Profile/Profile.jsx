import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import PersonIcon from "../../assets/images/personIcon.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";

import FavoriteUser from "../FavoriteUser/FavoriteUser";
import VendorProduct from "../VendorProduct/VendorProduct";

export default function Profile() {
  const [dataUser, setData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("response", response);
      setUserLoading(false);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    ProfileData();
  }, []);
  const imageUrl =dataUser?.data.message.image;
  const userType = dataUser?.data.message.usertype;
  const userData = dataUser?.data?.message;
  const [isLoading, setIsLoading] = useState(true);
  console.log("userData", userData);



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

        <span className={`${styles.span_profile}`}>/Profile</span>
      </div>

      {userLoading ? (
        <Loading />
      ) : (
        <>
          <div className={`container ${styles.Profile_data}`}>
            <div className="row gy-5">
              <div className="col-md-4">
                <div className={`${styles.profile}`}>
                  <div>
                    {imageUrl ? (
                      <img 
                      src={`http://localhost:8000${imageUrl}`}

                     alt="Profile" width={"100%"} />
                    ) : (
                      <img
                        src={PersonIcon}
                        alt="Default Profile"
                        width={"100%"}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6  text-start">
                <h4 className={`${styles.name}`}>
                  {dataUser?.data.message.first_name}{" "}
                  {dataUser?.data.message.last_name}
                </h4>
                <h5 className="mb-4">User is {userType}</h5>
                <div className="row gy-3">
                  <div className="col-md-12">
                    <div
                      className={`d-flex justify-content-start align-items-center`}
                    >
                      <h4 className={`${styles.name_field} pe-1`}>
                        Email Address :
                      </h4>
                      <h5>{userData.email}</h5>
                    </div>
                  </div>

                  {userData.address && (
                    <div className="col-md-12">
                      <div
                        className={`d-flex justify-content-start align-items-center`}
                      >
                        <h4 className={`${styles.name_field} pe-1`}>
                          Address :
                        </h4>
                        <h5>{userData.address}</h5>
                      </div>
                    </div>
                  )}

                  {userData.phone && (
                    <div className="col-md-12">
                      <div
                        className={`d-flex justify-content-start align-items-center`}
                      >
                        <h4 className={`${styles.name_field} pe-1`}>Phone :</h4>
                        <h5>{userData.phone}</h5>
                      </div>
                    </div>
                  )}

                  {userType === "vendor" ? (
                    <div className="col-md-12">
                      <div
                        className={`d-flex justify-content-start align-items-center`}
                      >
                        <h4 className={`${styles.name_field} pe-1`}>
                          Shop Name :
                        </h4>
                        <h5>{userData.shopname}</h5>
                      </div>
                    </div>
                  ) : null}

                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <Link to="/updateProfile">
                        <button className={`fs-5 py-2 ${styles.update_button}`}>
                          UPDATE PROFILE
                        </button>
                      </Link>
                      <Link to="/changePassword">
                        <button
                          type="button"
                          className={`fs-5 py-2  ${styles.update_button}`}
                        >
                          Change Password
                        </button>
                      </Link>
                      {userType === "vendor" ? (
                        <>
                          <Link to="/addProduct">
                            <button
                              className={`fs-5 py-2 ${styles.update_button}`}
                            >
                              ADD PRODUCT
                            </button>
                          </Link>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        

          {userType === "vendor" ? (
            <>
      
                <div className={`container my-5 ${styles.Profile_info}`}>
                  <h3 className={`text-center my-5 ${styles.word_Favorite}`}>
                    FEATURED PRODUCT Of Vendor{" "}
                    {dataUser?.data.message.first_name}{" "}
                    {dataUser?.data.message.last_name}
                  </h3>
                  <VendorProduct/>
                  
                </div>
            </>
          ) : (
            <>
              <div className={`container my-5 ${styles.Profile_info}`}>
                <h3 className={`text-center my-5 ${styles.word_Favorite}`}>
                  FAVORITE PRODUCT
                </h3>
                <FavoriteUser />
              </div>
            </>
          )}
  
        </>
      )}
    </>
  );
}
{
}
