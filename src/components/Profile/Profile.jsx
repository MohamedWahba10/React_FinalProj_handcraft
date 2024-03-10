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

  console.log("data:", data);
  const Products = data?.data;
  console.log("Products:", Products);

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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {userType === "vendor" ? (
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
                        <button className={`fs-5 py-2 ${styles.update_button}`}>
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
                          <div key={pro.id} className="col-md-6 cursor-pointer">
                            <div className="product py-3 px-2">
                              <Link
                                to={`/detail/${pro.id}`}
                                className="text-decoration-none text-dark"
                              >
                                <img
                                  src={pro.prodImageCover}
                                  className="w-100"
                                  alt={pro.prodName}
                                />
                                <h5 className="text-center text-main pt-3 pb-2">
                                  {pro.prodSubCategory.subCateName}
                                </h5>
                                <h3 className="h6 text-center pb-3">
                                  {pro.prodName}
                                </h3>
                                <div className="d-flex justify-content-between mx-5 align-items-center">
                                  <p>{pro.prodPrice} EGP</p>
                                </div>
                              </Link>
                              <div className="d-flex justify-content-end mx-4 my-3">
                                <i
                                  className={`fa-solid fa-heart fs-2 heart-icon`}
                                ></i>
                              </div>
                              <Link
                              to={`/updateProduct/${pro.id}`}
                              >
                              <button className="btn my-2 w-100 bg-primary fs-5 py-2 text-dark">
                              
                                Update Product
                              </button>
                              </Link>
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
          ) : (
            <div>{navigate("/updateProfile")}</div>
          )}
        </>
      )}
    </>
  );
}
