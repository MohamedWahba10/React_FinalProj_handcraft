import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import PersonIcon from "../../assets/images/personIcon.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import FavoriteUser from "../FavoriteUser/FavoriteUser";

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
  const imageUrl =`http://localhost:8000${dataUser?.data.message.image}`;
  const userType = dataUser?.data.message.usertype;
  const userData = dataUser?.data?.message;
  const [isLoading, setIsLoading] = useState(true);
  console.log("userData", userData);

  const [allData, setAllData] = useState([]);
  async function getProduct() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `http://127.0.0.1:8000/api/product/vendor/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log("response Product vendor");
      setAllData(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      // handle error
      console.error("Error fetching product:", error);
      return null; // or throw error if necessary
    }
  }
  const Products = allData;
  console.log("product vendorrrrrr", Products);
  useEffect(() => {
    getProduct();
  }, []);
  async function deleteProduct(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      toast.success("Product removed successfully");
      // refetchProducts();
      getProduct();
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to remove product");
    }
  }

  const [deleteProductId, setDeleteProductId] = useState(null);

  const confirmDelete = (id) => {
    setDeleteProductId(id);
  };

  const cancelDelete = () => {
    setDeleteProductId(null);
  };

  const handleDelete = async () => {
    await deleteProduct(deleteProductId);
    setDeleteProductId(null);
  };
  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Modal show={deleteProductId !== null} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
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
                      <img src={`${imageUrl}`} alt="Profile" width={"100%"} />
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
          {/* <div >
            <div className="row"> */}

          {userType === "vendor" ? (
            <>
              {isLoading ? (
                <Loading />
              ) : (
                <div className={`container my-5 ${styles.Profile_info}`}>
                  <h3 className={`text-center my-5 ${styles.word_Favorite}`}>
                    FEATURED PRODUCT Of Vendor{" "}
                    {dataUser?.data.message.first_name}{" "}
                    {dataUser?.data.message.last_name}
                  </h3>
                  {Products ? (
                    <>
                      <div className="container">
                        <div className="row">
                          {Array.isArray(Products) &&
                            Products?.map((pro) => (
                              <div
                                key={pro.id}
                                className={`col-md-3 cursor-pointer`}
                              >
                                <div className={` ${styles.product}`}>
                                  <div
                                    className={`${styles.product_info} ${styles.product} w-100`}
                                  >
                                    <img
                                      src={`http://127.0.0.1:8000${pro.prodImageThumbnail}`}
                                      className="w-100"
                                      alt={pro.prodName}
                                    />
                                    <Link
                                      to={`/detail/${pro.id}`}
                                      className="text-decoration-none text-dark "
                                    >
                                      <div
                                        className={`${styles.above_layer}  p-3 d-flex  justify-content-between align-items-start  `}
                                      >
                                        {pro.prodOnSale ? (
                                          <span
                                            className={`${styles.sale_product}`}
                                          >
                                            Sales
                                          </span>
                                        ) : null}
                                      </div>
                                    </Link>
                                  </div>
                                  <div className={`px-2 `}>
                                    <h4
                                      className={`pb-1 pt-2 ${styles.pro_name}`}
                                    >
                                      {pro.prodName}
                                    </h4>

                                    <div>
                                      <div className="d-flex justify-content-between align-items-center">
                                        {pro.discounted_price ===
                                        pro.original_price ? (
                                          <p className="fs-5 ">
                                            {pro.prodPrice} $
                                          </p>
                                        ) : (
                                          <>
                                            <p className="fs-5 text-decoration-line-through">
                                              {pro.original_price} $
                                            </p>
                                            <p className="fs-5">
                                              {pro.discounted_price} $
                                            </p>
                                          </>
                                        )}
                                      </div>
                                      <div>
                                        <p>{pro.prodDescription}</p>
                                      </div>
                                    </div>

                                    <div className="my-2">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                          <div onClick={handleAddToCartClick}>
                                            <Link
                                              to={`/updateProduct/${pro.id}`}
                                            >
                                              <button
                                                className={`${styles.button_style} ${styles.wish_list}`}
                                              >
                                                <i class="fa-solid fa-pen-to-square"></i>{" "}
                                              </button>
                                            </Link>
                                          </div>
                                        </div>
                                        <div>
                                          <div onClick={handleAddToCartClick}>
                                            <button
                                              className={`${styles.button_style} ${styles.cart}`}
                                              onClick={() =>
                                                confirmDelete(pro.id)
                                              }
                                            >
                                              <i class="fa-solid fa-trash"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Loading />
                  )}
                  {Products.length !== 0 ? null : (
                    <>
                      <div
                        className={`col-12 text-center ${styles.No_product}`}
                      >
                        <h1>
                          No Product Created By{" "}
                          {dataUser?.data.message.first_name}{" "}
                          {dataUser?.data.message.last_name}
                        </h1>
                      </div>
                    </>
                  )}
                </div>
              )}
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
          {/* </div>
          </div> */}
        </>
      )}
    </>
  );
}
{
}
