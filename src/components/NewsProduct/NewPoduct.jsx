import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
// import styles from "./NewPoduct.module.css";
import styles from "./NewProduct.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";
import Slider from "react-slick";
import { TokenContext } from "../../Context/Token";

export default function NewProduct() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    spaceBetween: 10,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  let { addToCart, settotal_items_count } = useContext(CartContext);
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
      toast.success("Product Added TO Favorite Successfully");
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
      toast.success("Product Removed From Favorite Successfully");
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

  async function addcart(id) {
    let res = await addToCart(id);
    console.log("heloo add to cart ", res);
    if (res.data.msg === "added") {
      toast.success("product added Successfully");
      settotal_items_count(res.data.total_items_count);
    } else {
    }
  }

  const [isLoading, SetIsLoading] = useState(true);
  const [newProduct, setNewProduct] = useState([]);

  async function getNewProduct() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/product/lastProducts`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      }
    );
    SetIsLoading(false);
    console.log("my respone==>>", response);
    setNewProduct(response);
    return response;
  }
  useEffect(() => {
    getNewProduct();
  }, []);
  console.log("newProduct-------------", newProduct?.data?.data);
  let products = newProduct?.data?.data;

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

  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <>
            <div className={`${styles.Section_new}`}>
              <div className="container my-5 py-5">
                <h1 className={`${styles.word_news}`}>What's New?</h1>
                <div className="row gy-5 ">
                  <Slider {...settings} className="w-100 ">
                    {products?.map((pro) => (
                      <div className="p-2">
                        <div key={pro.id} className={`cursor-pointer`}>
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
                                  className={`${styles.above_layer}  p-3 d-flex justify-content-between align-items-start`}
                                >
                                  {pro.prodOnSale ? (
                                    <span className={`${styles.sale_product}`}>
                                      On Sale
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
                              <p>{pro.prodDescription}</p>
                              <div className="my-2">
                                <div className="d-flex justify-content-between align-items-center">
                                  <>
                                    {token ? (
                                      <>
                                        <div>
                                          {userType === "vendor" ? null : (
                                            <div
                                              // className={`${styles.wish_list}`}
                                              onClick={handleAddToCartClick}
                                            >
                                              {dataFavorite?.find(
                                                (favProduct) =>
                                                  favProduct.id === pro.id
                                              ) ? (
                                                <div
                                                  className={`${styles.wish_list} bg-danger`}
                                                  onClick={() =>
                                                    deletefavorite(pro.id)
                                                  }
                                                >
                                                  <i className="fa-regular fa-heart text-white"></i>
                                                </div>
                                              ) : (
                                                <div
                                                  className={`${styles.wish_list} `}
                                                  onClick={() =>
                                                    addfavorite(pro.id)
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
                                      </>
                                    ) : (
                                      <>
                                        <div>
                                          {userType === "vendor" ? null : (
                                            <div
                                              // className={`${styles.wish_list}`}
                                              onClick={handleAddToCartClick}
                                            >
                                              {dataFavorite?.find(
                                                (favProduct) =>
                                                  favProduct.id === pro.id
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
                                                onClick={checkLogin}
                                              >
                                                <i class="fa-solid fa-cart-shopping cart"></i>
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}
