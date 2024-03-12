import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./FeatureProduct.module.css";

export default function FeatureProduct() {
  const { data, isLoading } = useQuery({
    queryKey: "products",
    queryFn: getProduct,
  });

  const Products = data?.data?.data;

  function getProduct() {
    let response = axios.get(`http://127.0.0.1:8000/api/product/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    });
    return response;
  }
  // --------------- userData ------------------------
  const [dataUser, setData] = useState(null);

  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    ProfileData();
  }, []);
  const userType = dataUser?.data.message.usertype;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={`${styles.header_product} py-5 mb-5 text-center `}>
            <h1>Shop</h1>

            <Link to="/" className="text-decoration-none ">
              <span className={`${styles.link_home} pe-1 `}>HomePage</span>
            </Link>

            <span className={`${styles.span_profile}`}>&gt;Shop</span>
          </div>
          <div className="container mb-5 pb-5 overflow-hidden">
            <div className="row gy-5">
              {Products?.map((pro) => (
                <div key={pro.id} className="col-md-3 cursor-pointer">
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
                              <i class="fa-regular fa-heart"></i>
                            </div>
                          </div>

                          <div className="d-flex justify-content-center align-items-center">
                            <button className={`${styles.button_style}`}>
                              QUICK VIEW
                            </button>
                            {userType === "vendor" ? null : (
                              <button className={`${styles.button_style}`}>
                                ADD TO CART
                              </button>
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
      )}
    </>
  );
}
