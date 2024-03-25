import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import styles from "./VendorProduct.module.css";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function VendorProduct() {
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    getProduct();
    ProfileData();
  }, []);

  async function getProduct() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/product/vendor/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setAllData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching product:", error);
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      toast.success("Product removed successfully");
      getProduct();
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to remove product");
    }
  }
  

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

  const handleDelete = async () => {
    await deleteProduct(deleteProductId);
    setDeleteProductId(null);
  };

  const confirmDelete = (id) => {
    setDeleteProductId(id);
  };

  const cancelDelete = () => {
    setDeleteProductId(null);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
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

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {allData.length !== 0 ? (
            <div className="container">
              <div className="row">
                {allData.map((pro) => (
                  <div key={pro.id} className={`col-md-3 cursor-pointer`}>
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
                              <span className={`${styles.sale_product}`}>
                                Sales
                              </span>
                            ) : null}
                            {pro.prodStock > 0 ? (
                              <span
                                className={`${styles.sale_product} bg-light text-dark`}
                              >
                                In Stock
                              </span>
                            ) : (
                              <span
                                className={`${styles.sale_product} bg-light text-dark`}
                              >
                                Out Stock
                              </span>
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className={`px-2 `}>
                        <h4 className={`pb-1 pt-2 ${styles.pro_name}`}>
                          {pro.prodName}
                        </h4>

                        <div>
                          <div>
                            <div className="d-flex justify-content-between align-items-center">
                              {pro.prodOnSale ? (
                                <>
                                  <p className="fs-5 text-decoration-line-through">
                                    {pro.prodPrice} $
                                  </p>
                                  <p className="fs-5">
                                    {pro.discounted_price} $
                                  </p>
                                </>
                              ) : (
                                <p className="fs-5 ">{pro.prodPrice} $</p>
                              )}
                            </div>
                          </div>
                          <div>
                            <p>{pro.prodDescription}</p>
                          </div>
                          <div>
                            <p>Number Product : {pro.prodStock}</p>
                          </div>
                        </div>

                        <div className="my-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <div onClick={handleAddToCartClick}>
                                <Link to={`/updateProduct/${pro.id}`}>
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
                                  onClick={() => confirmDelete(pro.id)}
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
          ) : (
            <div className={`col-12 text-center ${styles.No_product}`}>
              <h1>
                No Product Created By {dataUser?.message?.first_name}{" "}
                {dataUser?.message?.last_name}
              </h1>
            </div>
          )}
        </>
      )}
    </>
  );
}
