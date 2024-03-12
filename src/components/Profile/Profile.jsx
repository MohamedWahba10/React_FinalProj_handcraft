import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import PersonIcon from "../../assets/images/personIcon.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const navigate = useNavigate();
  const [dataUser, setData] = useState(null);

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
  const imageUrl = dataUser?.data.message.imageUrl;
  const userType = dataUser?.data.message.usertype;

  const { data, isLoading } = useQuery({
    queryKey: "products",
    queryFn: getProduct,
  });

  const Products = data?.data;

  function getProduct() {
    let response = axios.get(`http://127.0.0.1:8000/api/product/vendor/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    });
    return response;
  }

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

      <>
        {userType === "vendor" ? (
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                    <div className={`m-5 ${styles.profile}`}>
                      <div>
                        {imageUrl ? (
                          <img src={`${imageUrl}`} alt="Profile" />
                        ) : (
                          <img src={PersonIcon} alt="Default Profile" />
                        )}
                      </div>
                      <h4>
                        {dataUser?.data.message.first_name}{" "}
                        {dataUser?.data.message.last_name}
                      </h4>
                      <h5>{userType}</h5>
                      <div>
                        <Link to="/updateProfile">
                          <button
                            className={`fs-5 py-2 ${styles.update_button}`}
                          >
                            Update Profile
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          className={`fs-4 py-2 my-2 ${styles.update_button}`}
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    {Products ? (
                      <>
                        <div className="row">
                          {Products?.map((pro) => (
                            <div
                              key={pro.id}
                              className="col-md-4 cursor-pointer"
                            >
                              <div className="product py-3 px-2">
                                <Link
                                  // to={`/detail/${pro.id}`}

                                  className="text-decoration-none text-dark"
                                >
                                  <div className={`${styles.product_info}`}>
                                    <img
                                      src={`http://127.0.0.1:8000${pro.prodImageThumbnail}`}
                                      className="w-100"
                                      alt={pro.prodName}
                                    />
                                    <div
                                      className={`${styles.above_layer} p-3 d-flex flex-column justify-content-between `}
                                    >
                                      <div className="d-flex justify-content-end">
                                        <div className={`${styles.wish_list}`}>
                                          <i class="fa-solid fa-trash"></i>
                                        </div>
                                      </div>

                                      <div className="d-flex justify-content-center align-items-center">
                                        {userType === "cusromer" ? null : (
                                          <>
                                            <Link
                                              to={`/updateProduct/${pro.id}`}
                                            >
                                              <button
                                                className={`${styles.button_style}`}
                                              >
                                                Update Product
                                              </button>
                                            </Link>
                                            <Link>
                                              <button
                                                className={`${styles.button_style}`}
                                              >
                                                QUICK VIEW
                                              </button>
                                            </Link>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Link>

                                <h4 className="pb-2 pt-2">{pro.prodName}</h4>
                                <p>{pro.prodPrice} EGP</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Loading />
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>{navigate("/updateProfile")}</div>
        )}
      </>
    </>
  );
}
{
}
