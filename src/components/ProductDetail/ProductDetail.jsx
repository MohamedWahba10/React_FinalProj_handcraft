import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
// import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";
import { CartContext } from "../../Context/CartContext";
import { TokenContext } from "../../Context/Token";

export default function ProductDetail() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
  };
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["detailProduct"],
    queryFn: getDetailProduct,
  });
  function getDetailProduct() {
    return axios.get(`http://127.0.0.1:8000/api/product/details/${id}/`);
  }
  const detailPro = data?.data?.data;
  console.log("dataProoooo", detailPro);

  const [dataUser, setData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("responsee user type", response);
      setUserLoading(false);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    ProfileData();
  }, []);
  const userType = dataUser?.data.message.usertype;
  console.log("userData", userType);

  let {
    addToFavorite,
    deleteFavoriteProduct,
    getFavorite,
    settotal_items_FAV,
  } = useContext(FavoriteContext);
  async function addfavorite(id) {
    let res = await addToFavorite(id);
    console.log("heloo add to favorite ", res);
    if (res?.data?.message === "Product was added to favorites.") {
      toast.success("Product Added Favorite Successfully");
      settotal_items_FAV(res.data.total_items_count);
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
      settotal_items_FAV(res.data.total_items_count);
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
      settotal_items_FAV(res.data.total_items_count);
      console.log("dataFavoeite", dataFavorite);
    } catch (error) {
      console.error("Error while fetching favorite:", error);
    }
  }
  useEffect(() => {
    getfavorite();
  }, []);

  let [avgRate, setAvgRate] = useState(null);
  async function getAvgRate() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/product/product_r/${id}/`,
        {}
      );
      setAvgRate(response?.data?.average_Rate);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }
  useEffect(() => {
    getAvgRate();
  }, []);

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

  let {
    getCart,
    addToCart,
    deleteCartProduct,
    settotal_items_count,
    increaseCartProduct,
    decreaseCartProduct,
  } = useContext(CartContext);

  let [cartDetails, setcartDetails] = useState({});

  async function getcartDetails() {
    try {
      let { data } = await getCart();

      if (data) {
        setcartDetails(data);

        settotal_items_count(data.total_items_count);
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  }

  async function addcart(id) {
    let res = await addToCart(id);
    console.log("heloo add to cart ", res);
    if (res.data.msg === "added") {
      toast.success("product added Successfully");
      settotal_items_count(res.data.total_items_count);
    }
  }
  let [apiError, setapiError] = useState("");
  async function increase(id, e) {
    e.preventDefault();
    try {
      let data = await increaseCartProduct(id);
      console.log(data);
    } catch (err) {
      setapiError(
        "Quantity cannot be increased further, exceeds prodStock limit"
      );
    }
  }

  async function decrease(id, e) {
    e.preventDefault();
    try {
      let { data } = await decreaseCartProduct(id);
      console.log(data);
      setapiError(""); // this is to remove the error message when user re-try again
    } catch (err) {
      console.log(err);
    }
  }

  async function removeProduct(id, e) {
    e.preventDefault();
    try {
      let { data } = await deleteCartProduct(id);
      console.log("remove my prod", data.response);
      settotal_items_count(data.total_items_count);
      if (data.cart_items) {
        data.cart_items.forEach(item => {
          if (item.item_name === detailPro?.prodName) {
            item.quantity = 0;
          }
        });
      }
      setcartDetails(data);
      getcartDetails();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  }
  

  useEffect(() => {
    getcartDetails();
  }, [getcartDetails]);

  return (
    <>
      <div className="container mb-5 pb-5 overflow-hidden">
        {isLoading && userLoading ? (
          <Loading />
        ) : (
          <div className="row gy-5" key={detailPro?.id}>
            <div className="col-md-5 cursor-pointer">
              <div className="py-3 px-2 my-4">
                <Slider {...settings} className="w-100">
                  {[
                    detailPro?.prodImageOne,
                    detailPro?.prodImageTwo,
                    detailPro?.prodImageThree,
                    detailPro?.prodImageFour,
                  ].map((ele) => (
                    <img
                      src={`http://127.0.0.1:8000${ele}`}
                      className={`w-100 ${styles.img_style}`}
                      alt={detailPro?.prodName}
                    />
                  ))}
                </Slider>
              </div>
            </div>
            <div className="col-md-6 offset-md-1 py-3 px-2 my-4">
              <div className="w-100 py-3 px-2 my-5">
                <div className="mx-4 my-3 ">
                  <>
                    <div className="d-flex justify-content-between  my-3">
                      <div
                        className={`${styles.above_layer}  p-3 d-flex  justify-content-between align-items-start  `}
                      >
                        {detailPro?.prodOnSale ? (
                          <span className={`${styles.sale_product} me-3`}>
                           ON Sale
                          </span>
                        ) : null}
                        {detailPro?.prodStock > 0 ? (
                          <span
                            className={`${styles.sale_product}  text-light bg-secondary `}
                          >
                            In Stock
                          </span>
                        ) : (
                          <span
                            className={`${styles.sale_product} text-light bg-secondary`}
                          >
                            Out Stock
                          </span>
                        )}
                      </div>
                      <>
                        {token ? (
                          <>
                            {userType === "vendor" ? null : (
                              <div>
                                {dataFavorite?.find(
                                  (favProduct) =>
                                    favProduct.id === detailPro?.id
                                ) ? (
                                  <div
                                    className={`${styles.wish_style} bg-danger`}
                                    onClick={() =>
                                      deletefavorite(detailPro?.id)
                                    }
                                  >
                                    <i
                                      class={`fa-regular fa-heart fs-2 text-white  ${styles.wish_icon}`}
                                    ></i>
                                  </div>
                                ) : (
                                  <div
                                    className={`${styles.wish_style}`}
                                    onClick={() => addfavorite(detailPro?.id)}
                                  >
                                    <i
                                      class={`fa-regular fa-heart fs-2  ${styles.wish_icon}`}
                                    ></i>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {userType === "vendor" ? null : (
                              <div>
                                {dataFavorite?.find(
                                  (favProduct) =>
                                    favProduct.id === detailPro?.id
                                ) ? (
                                  <div
                                    className={`${styles.wish_style} bg-danger`}
                                    onClick={checkLogin}
                                  >
                                    <i
                                      class={`fa-regular fa-heart fs-2 text-white  ${styles.wish_icon}`}
                                    ></i>
                                  </div>
                                ) : (
                                  <div
                                    className={`${styles.wish_style}`}
                                    onClick={checkLogin}
                                  >
                                    <i
                                      class={`fa-regular fa-heart fs-2  ${styles.wish_icon}`}
                                    ></i>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </div>
                  </>

                  <h5 className={`pb-2 ${styles.Font}`}>
                    {detailPro?.prodSubCategory.subCateName}
                  </h5>
                  <h3 className={`pb-2 ${styles.Font}`}>
                    {detailPro?.prodName}
                  </h3>
                  {avgRate ? (
                    <p>
                      <i className="fa-solid fa-star text-warning pe-2 fs-4"></i>
                      <span className="fs-4">{avgRate}</span>
                    </p>
                  ) : null}
                  <div className="d-flex justify-content-between align-items-between">
                    <h5 className="pb-2">
                      Created By {detailPro?.prodVendor.shopname}
                    </h5>

                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        {detailPro?.prodOnSale ? (
                          <>
                            <p className="fs-5 text-decoration-line-through pe-2">
                              {detailPro?.prodPrice} $
                            </p>
                            <p className="fs-5">
                              {detailPro?.discounted_price} $
                            </p>
                          </>
                        ) : (
                          <p className="fs-5 ">{detailPro?.prodPrice} $</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <p>{detailPro?.prodDescription}</p>

                  {userType === "vendor" ? (
                    <Link to="/addProduct">
                      <button
                        className={` mt-4 w-100 fs-4 py-3 ${styles.cart_button_style}`}
                      >
                        ADD PROUDUCT
                      </button>
                    </Link>
                  ) : (
                    <div className=" d-flex justify-content-between">
                      <div className="me-4 d-flex">
                        {/* {cartDetails.cart_items && cartDetails.cart_items.some((item) => item.item_name === detailPro?.prodName) && (
                          <>
                            <div><button onClick={(e) => decrease(cartDetails.cart_items.find((item) => item.item_name === detailPro?.prodName)?.id, e)} className="btn btn-outline-secondary me-2" disabled={cartDetails.cart_items.find((item) => item.item_name === detailPro?.prodName).quantity <= 1}>-</button></div>
                            <div className="mt-1"><span>{cartDetails.cart_items.find((item) => item.item_name === detailPro?.prodName).quantity}</span></div>
                            <div><button onClick={(e) => increase(cartDetails.cart_items.find((item) => item.item_name === detailPro?.prodName)?.id, e)} className="btn btn-outline-secondary ms-2">+</button></div>
                            <div><button onClick={(e) => removeProduct(cartDetails.cart_items.find((item) => item.item_name === detailPro?.prodName)?.id, e)} className="btn btn-light border text-danger icon-hover-danger ms-3">Remove</button></div>
                          </>
                        )} */}
                        <>
                          {cartDetails.cart_items && cartDetails.cart_items.some((item) => item.item_id === detailPro?.id) ? (
                            <>
                              <div><button onClick={(e) => decrease(cartDetails.cart_items.find((item) => item.item_id === detailPro?.id)?.id, e)} className="btn btn-outline-secondary me-2" disabled={cartDetails.cart_items.find((item) => item.item_name === detailPro?.prodName).quantity <= 1}>-</button></div>
                              <div className="mt-1"><span>{cartDetails.cart_items.find((item) => item.item_id === detailPro?.id).quantity}</span></div>
                              <div><button onClick={(e) => increase(cartDetails.cart_items.find((item) => item.item_id === detailPro?.id)?.id, e)} className="btn btn-outline-secondary ms-2">+</button></div>
                              <div><button onClick={(e) => removeProduct(cartDetails.cart_items.find((item) => item.item_id === detailPro?.id)?.id, e)} className="btn btn-light border text-danger icon-hover-danger ms-3">Remove</button></div>
                            </>
                          ) : (
                            <>
                              <div><button className="btn btn-outline-secondary me-2" disabled>-</button></div>
                              <div className="mt-1"><span>0</span></div>
                              <div><button className="btn btn-outline-secondary ms-2" disabled>+</button></div>
                              <div><button className="btn btn-light border text-danger icon-hover-danger ms-3">Remove</button></div>
                            </>
                          )}
                        </>

                      </div>
                      <>
                        {token ? (
                          <>
                            {detailPro?.prodStock > 0 ? (
                              <>
                                <button
                                  className={`${styles.button_style} ${styles.cart}`}
                                  onClick={() => addcart(detailPro?.id)}
                                >
                                  <i class="fa-solid fa-cart-shopping cart"></i>
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className={` ${styles.cart_disabled}`}
                                  disabled
                                >
                                  <i class="fa-solid fa-cart-shopping cart"></i>
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <button
                              className={`${styles.button_style} ${styles.cart}`}
                              onClick={checkLogin}
                            >
                              <i class="fa-solid fa-cart-shopping cart"></i>
                            </button>
                          </>
                        )}
                      </>
                    </div>
                  )}
                  {apiError && (
                    <div className="alert alert-danger mt-3">{apiError}</div>
                  )}
                  {token ? (
                    <>
                      <Link
                        to={`/vendorProduct/${detailPro?.prodVendor.id}/${detailPro?.prodVendor.shopname}`}
                      >
                        <button
                          className={`mt-4 w-100 fs-4 py-3 ${styles.cart_button_style}`}
                        >
                          View Products of <span className="fw-bold"> {detailPro?.prodVendor.shopname}</span>
                        </button>
                      </Link>
                    </>
                  ) : null}
                

                  <Link to={`/comment/${detailPro?.id}/${detailPro?.prodName}`}>
                    <button
                      className={` my-4 w-100 fs-4 py-3 ${styles.cart_button_style}`}
                    >
                       Comments
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

     
    </>
  );
}
