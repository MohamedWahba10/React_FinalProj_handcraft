import React, { useState, useEffect, useContext } from "react";
import styles from "./ProductINSubCategory.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";
import { CartContext } from "../../Context/CartContext";
import { TokenContext } from "../../Context/Token";

export default function ProductINSubCategory() {
  const { subCategoryId, subCategoryName, categoryName, categoryId } =
    useParams();

  const { data, isLoading } = useQuery({
    queryKey: "product",
    queryFn: getProductINSubCategory,
  });

  const product = data?.data?.results;
  console.log("product........", product);
  function getProductINSubCategory() {
    let response = axios.get(`http://127.0.0.1:8000/api/product/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    });
    return response;
  }
  // -----------------------user data------------------------------
  const [dataUser, setData] = useState(null);

  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("responseee", response);
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

  // ------------------------------------favorite ------------------------------------------------------------------
  let { addToFavorite, deleteFavoriteProduct, getFavorite } =
    useContext(FavoriteContext);
  async function addfavorite(id) {
    let res = await addToFavorite(id);
    console.log("heloo add to favorite ", res);
    if (res?.data?.message === "Product was added to favorites.") {
      toast.success("Product Added Favorite Successfully");
      getfavorite();
    } else {
      toast.error(res.data.message);
    }
  }

  async function deletefavorite(id) {
    let res = await deleteFavoriteProduct(id);
    console.log("heloo remove to favorite ", res);
    if (res?.data?.message === "Product was removed from favorites.") {
      toast.success("Product Removed Favorite Successfully");
      getfavorite();
    } else {
      toast.error("ERROR");
    }
  }
  const [dataFavorite, setDataFavorite] = useState(null);

  async function getfavorite() {
    try {
      let res = await getFavorite();
      console.log("hello all to favorite", res);
      setDataFavorite(res.data.favorite_products);
      console.log("dataFavoeite", dataFavorite);
    } catch (error) {
      console.error("Error while fetching favorite:", error);
    }
  }
  useEffect(() => {
    getfavorite();
  }, []);
  let { addToCart } = useContext(CartContext);

  async function addcart(id) {
    let res = await addToCart(id);
    console.log("heloo add to cart ", res);
    if (res.data.msg === "added") {
      toast.success("product added Successfully");
    } else {
    }
  }


  let { token, setToken } = useContext(TokenContext);
  useEffect(() => {
      setToken(localStorage.getItem("userToken"));
  }, []);
  let navigate = useNavigate();

  function checkLogin() {
      if (!token) {
          toast("Please The Login First");
          navigate("/login");
      }
  }
  return (
    <>
      <Helmet>
        <title>Products IN SubCategory</title>
      </Helmet>
      <div className={`${styles.header_profile} py-5 mb-5 text-center `}>
        <h1>SubCategory</h1>

        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>
        <Link to="/category" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>/Category</span>
        </Link>
        <Link
          to={`/subcategory/${categoryId}/${categoryName}`}
          className="text-decoration-none "
        >
          <span className={`${styles.link_home} pe-1 `}>/{categoryName}</span>
        </Link>
        <span className={`${styles.span_profile}`}>/{subCategoryName}</span>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container my-5">
            <div className="row gy-4">
              {product
                ?.filter(
                  (productItem) =>
                    productItem.prodSubCategory.id == subCategoryId
                )
                .map((pro) => (
                  <div
                    key={pro.product.id}
                    className={`col-md-3 cursor-pointer`}
                  >
                    <div className={` ${styles.product}`}>
                      <div className={`${styles.product_info} w-100`}>
                        <img
                          src={`http://127.0.0.1:8000${pro.product.prodImageThumbnail}`}
                          className="w-100"
                          alt={pro.product.prodName}
                        />
                        <Link
                          to={`/detail/${pro.product.id}`}
                          className="text-decoration-none text-dark "
                        >
                          <div
                            className={`${styles.above_layer}  p-3 d-flex  justify-content-between align-items-start  `}
                          >
                            {pro.product.prodOnSale ? (
                              <span className={`${styles.sale_product}`}>
                                Sales
                              </span>
                            ) : null}
                          </div>
                        </Link>
                      </div>
                      <div className={`px-2 `}>
                        <h4 className={`pb-1 pt-2 ${styles.pro_name}`}>
                          {pro.product.prodName}
                        </h4>
                        <div className="d-flex justify-content-between align-content-center">
                          <h5 className="pb-1">
                            {" "}
                            {pro.prodSubCategory.subCateName}
                          </h5>
                          {/* <p className="fs-5">{pro.product.prodPrice} EGP</p> */}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          {pro.product.discounted_price ===
                          pro.product.original_price ? (
                            <p className="fs-5 ">{pro.product.prodPrice} EGP</p>
                          ) : (
                            <>
                              <p className="fs-5 text-decoration-line-through">
                                {pro.product.original_price} EGP
                              </p>
                              <p className="fs-5">
                                {pro.product.discounted_price} EGP
                              </p>
                            </>
                          )}
                        </div>
                        <h6 className="pb-1">
                          Created By {pro.vendor.shopname}
                        </h6>
                        <div className="my-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <>
                            {
                              token?(
                                <>
                          
                            
                            <div>
                              {userType === "vendor" ? null : (
                                <div
                                  // className={`${styles.wish_list}`}
                                  onClick={handleAddToCartClick}
                                >
                                  {dataFavorite?.find(
                                    (favProduct) =>
                                      favProduct.id === pro.product.id
                                  ) ? (
                                    <div
                                      className={`${styles.wish_list} bg-danger`}
                                      onClick={() =>
                                        deletefavorite(pro.product.id)
                                      }
                                    >
                                      <i className="fa-regular fa-heart text-white"></i>
                                    </div>
                                  ) : (
                                    <div
                                      className={`${styles.wish_list} `}
                                      onClick={() =>
                                        addfavorite(pro.product.id)
                                      }
                                    >
                                      <i className="fa-regular fa-heart "></i>
                                    </div>
                                  )}{" "}
                                </div>
                              )}
                            </div>
                            <div>
                              {userType === "vendor" ? null : (
                                <div onClick={handleAddToCartClick}>
                                  <button
                                    className={`${styles.button_style} ${styles.cart}`}
                                    onClick={() => addcart(pro.product.id)}
                                  >
                                    <i class="fa-solid fa-cart-shopping cart"></i>
                                  </button>
                                </div>
                              )}
                            </div>
                            </>
                              ):
                              <>
                                   <div>
                              {userType === "vendor" ? null : (
                                <div
                                  // className={`${styles.wish_list}`}
                                  onClick={handleAddToCartClick}
                                >
                                  {dataFavorite?.find(
                                    (favProduct) =>
                                      favProduct.id === pro.product.id
                                  ) ? (
                                    <div
                                      className={`${styles.wish_list} bg-danger`}
                                      onClick={checkLogin}
                                    >
                                      <i className="fa-regular fa-heart text-white"></i>
                                    </div>
                                  ) : (
                                    <div
                                      className={`${styles.wish_list} `}
                                      onClick={checkLogin}
                                    >
                                      <i className="fa-regular fa-heart "></i>
                                    </div>
                                  )}{" "}
                                </div>
                              )}
                            </div>
                            <div>
                              {userType === "vendor" ? null : (
                                <div onClick={handleAddToCartClick}>
                                  <button
                                    className={`${styles.button_style} ${styles.cart}`}
                                    onClick={checkLogin}                                  >
                                    <i class="fa-solid fa-cart-shopping cart"></i>
                                  </button>
                                </div>
                              )}
                            </div>
                              </>
                            }
                            </>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {product?.filter((productItem) => {
              if (productItem.prodSubCategory.id == subCategoryId) {
                return true; // Include the product if the condition is met
              } else {
                return false; // Exclude the product if the condition is not met
              }
            }).length === 0 && (
              <>
                <div className={`${styles.No_product}`}>
                  <h1>No Product IN Category {subCategoryName}</h1>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
