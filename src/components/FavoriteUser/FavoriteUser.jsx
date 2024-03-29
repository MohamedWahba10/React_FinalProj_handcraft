import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./FavoriteUser.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";

export default function FavoriteUser() {
  let { addToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  let { deleteFavoriteProduct, getFavorite, settotal_items_FAV } =
    useContext(FavoriteContext);

  async function deletefavorite(id) {
    let res = await deleteFavoriteProduct(id);
    console.log("heloo remove to favorite ", res);
    if (res?.data?.message === "Product was removed from favorites.") {
      toast.success("Product Removed Favorite Successfully");
      settotal_items_FAV(res.data.total_items_count);
      getfavorite();
    } else {
      toast.error("ERROR");
    }
  }
  const [dataFavorite, setDataFavorite] = useState(null);

  async function getfavorite() {
    setIsLoading(true);
    try {
      let res = await getFavorite();
      console.log("hello all to favorite", res);
      setDataFavorite(res?.data?.favorite_products);
      console.log("dataFavoeite", dataFavorite);
      settotal_items_FAV(res.data.total_items_count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error("Error while fetching favorite:", error);
    }
  }
  useEffect(() => {
    getfavorite();
  }, []);

  async function addcart(id) {
    let res = await addToCart(id);
    console.log("heloo add to cart ", res);
    if (res.data.msg === "added") {
      toast.success("product added Successfully");
    } else {
    }
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
  const userType = dataUser?.data?.message?.usertype;

  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {dataFavorite && dataFavorite.length > 0 ? (
            <div className="container mb-5 pb-5 overflow-hidden">
              <div className="row gy-5">
                {dataFavorite?.map((pro) => (
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
                            className={`${styles.above_layer}  p-3 d-flex flex-column justify-content-between `}
                          >
                            <div>
                            {pro.prodStock > 0 ? (
                              <span
                                className={`${styles.sale_product} bg-light text-dark`}
                              >
                                In Stock
                              </span>
                            ) : (
                              <span
                                className={`${styles.sale_product} `}
                              >
                                Out of Stock
                              </span>
                            )}
                            </div>
                       
                          </div>
                        </Link>
                      </div>
                      <div className={`px-2 `}>
                        <h4 className={`pb-1 pt-2 ${styles.pro_name}`}>
                          {pro.name}
                        </h4>

                        <h6 className="fs-5">{pro.price} $</h6>

                        <p className="pb-1">{pro.prodDescription}</p>
                        <div className="my-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              {userType === "vendor" ? null : (
                                <div
                                  // className={`${styles.wish_list}`}
                                  onClick={handleAddToCartClick}
                                >
                                  <div
                                    className={`${styles.wish_list} bg-danger`}
                                    onClick={() => deletefavorite(pro.id)}
                                  >
                                    <i className="fa-regular fa-heart text-white"></i>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div>
                              {userType === "vendor" ? null : (
                                <div onClick={handleAddToCartClick}>
                                   {
                                            pro.prodStock >0 ?(
                                              <>
                                              
                                              <button
                                            className={`${styles.button_style} ${styles.cart}`}
                                            onClick={() =>
                                              addcart(pro.id)
                                            }
                                            
                                          >
                                            <i class="fa-solid fa-cart-shopping cart"></i>
                                          </button>
                                              </>
                                            )
                                            :(<>
                                                   <button
                                            className={` ${styles.cart_disabled}`}
                        
                                            disabled
                                          >
                                            <i class="fa-solid fa-cart-shopping cart"></i>
                                          </button>
                                            </>)
                                          }
                                </div>
                              )}
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
              <h1>No Favorite Products</h1>
            </div>
          )}
        </>
      )}
    </>
  );
}
