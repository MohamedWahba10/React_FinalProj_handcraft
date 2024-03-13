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
  const imageUrl = dataUser?.data.message.imageUrl;
  const userType = dataUser?.data.message.usertype;
  const userData = dataUser?.data?.message;
  const [isLoading,setIsLoading]=useState(true);
  console.log("userData", userData);

  const [allData,setAllData]=useState([])
  async function getProduct() {
    setIsLoading(true);
    try {
      let {data} = await axios.get(`http://127.0.0.1:8000/api/product/vendor/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("response Product vendor");
      setAllData(data)
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
    getProduct(); // Corrected to use a function within useEffect
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
      getProduct()
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

        <span className={`${styles.span_profile}`}>&gt;Profile</span>
      </div>

      {userLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 d-flex justify-content-between flex-column align-items-center">
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
                <div>
                  <Link to="/updateProfile">
                    <button className={`fs-5 py-2 ${styles.update_button}`}>
                      UPDATE PROFILE
                    </button>
                  </Link>
                </div>
                {userType === "vendor" ? (
                  <>
                    <Link to="/addProduct">
                      <button className={`fs-5 py-2 ${styles.update_button}`}>
                        ADD PRODUCT
                      </button>
                    </Link>
                  </>
                ) : null}
                <div></div>
              </div>
            </div>
            <div className="col-md-7 offset-md-1 ">
              <h2>
                {dataUser?.data.message.first_name}{" "}
                {dataUser?.data.message.last_name}
              </h2>
              <h5 className="mb-4">{userType}</h5>
              <hr />
              <h3 className="mt-2 mb-3 fs-5">EMAIL</h3>

              <p className="mb-4">{userData.email}</p>
              <hr />
              {userData.address && (
                <>
                  <h3 className="mt-2 mb-3 fs-5">ADDRESS</h3>
                  <p className="mb-4">{userData.address}</p>
                  <hr />
                </>
              )}
              {userData.phone && (
                <>
                  <h3 className="mt-2 mb-3 fs-5">PHONE</h3>
                  <p className="mb-4">{userData.phone}</p>
                  <hr />
                </>
              )}
              {userType === "vendor" ? (
                <>
                  <h3 className="mt-2 mb-3 fs-5">SHOP NAME</h3>
                  <p className="mb-4">{userData.shopname}</p>
                  <hr />
                </>
              ) : null}
            </div>
            {userType === "vendor" ? (
              <>
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="col-md-12">
                    <h3 className="text-center my-5">FEATURED PRODUCT</h3>
                    {Products ? (
                      <>
                        <div className="container">
                          <div className="row">
                            {Array.isArray(Products) && Products?.map((pro) => (
                              <div
                                key={pro.id}
                                className="col-lg-4 col-md-6 cursor-pointer"
                              >
                                <div className="product py-3 px-2">
                                  <Link
                                    to={`/detail/${pro.id}`}

                                    className="text-decoration-none text-dark"
                                  >
                                    <div className={`${styles.product_info}`}>
                                      <img
                                        src={`${pro.prodImageUrl}`}
                                        className="w-100"
                                        alt={pro.prodName}
                                      />
                                      <div
                                        className={`${styles.above_layer} p-3 d-flex flex-column justify-content-between `}
                                      >
                                        <div className="d-flex justify-content-end"  onClick={handleAddToCartClick}>
                                          <div
                                            className={`${styles.delete}`}
                                            onClick={() =>
                                              confirmDelete(pro.id)
                                            }
                                          >
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
                                                  className={`${styles.button_style}  fs-6`}
                                                >
                                                  Update Product
                                                </button>
                                              </Link>
                                              <Link to={`/detail/${pro.id}`}>
                                                <button
                                                  className={`${styles.button_style} fs-6`}
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
                        </div>
                      </>
                    ) : (
                      <Loading />
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className="text-center my-5">FAVORITE PRODUCT</h3>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
{
}
