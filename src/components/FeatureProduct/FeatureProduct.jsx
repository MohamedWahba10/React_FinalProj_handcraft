import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./FeatureProduct.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function FeatureProduct() {
  let { addToCart } = useContext(CartContext);

  const { data, isLoading } = useQuery({
    queryKey: "products",
    queryFn: getProduct,
  });

  async function addcart(id) {
    let res = await addToCart(id);
    console.log("heloo add to cart ", res);
    if (res.data.msg === "Quantity updated in cart") {
      toast.success("product added Successfully");
    } else {
    }
  }

  const Products = data?.data?.results;
  console.log("Products:", Products);

  async function getProduct() {
    let response = await axios.get(`http://127.0.0.1:8000/api/product/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    });
    console.log("my respone==>>", response);
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

      console.log("response111", response);

      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    ProfileData();
  }, []);
  const userType = dataUser?.data.message.usertype;

  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };

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
                    <div className={`${styles.product_info}`}>
                      <img
                        src={`${pro.prodImageUrl}`}
                        className="w-100"
                        alt={pro.prodName}
                      />
                      <div className={`${styles.check_onsale}`}>
                        {pro.prodOnSale ? (
                          <>
                            <button className="">Sale</button>
                          </>
                        ) : null}
                      </div>
                      <Link
                        to={`/detail`}
                        className="text-decoration-none text-dark"
                      >
                        <div
                          className={`${styles.above_layer} p-3 d-flex flex-column justify-content-between `}
                        >
                          <div className="d-flex justify-content-end">
                            <div
                              className={`${styles.wish_list}`}
                              onClick={handleAddToCartClick}
                            >
                              <i class="fa-regular fa-heart"></i>
                            </div>
                          </div>

                          <div className="d-flex justify-content-center align-items-center">
                            <button className={`${styles.button_style}`}>
                              QUICK VIEW
                            </button>
                            {userType === "vendor" ? null : (
                              <div onClick={
                                handleAddToCartClick
                              }>
<button
                                className={`${styles.button_style}`}
                                onClick={() => addcart(pro.id)}
                              >
                                ADD TO CART
                              </button>
                              </div>
                              
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>

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
