import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./FeatureProduct.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";

export default function NewProduct() {
  let { addToCart } = useContext(CartContext);

  const { data, isLoading } = useQuery({
    queryKey: "products",
    queryFn: getProduct,
  });
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


  async function addcart(id) {
    let res = await addToCart(id);
    console.log("heloo add to cart ", res);
    if (res.data.msg === "added") {
      toast.success("product added Successfully");
    } else {
    }
  }

  const Products = data?.data?.results;

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
                <div key={pro.product.id} className="col-md-3 cursor-pointer">
                  <div className="product py-3 px-2">
                    <div className={`${styles.product_info}`}>
                      <img
                        src={`${pro.product.prodImageUrl}`}
                        className="w-100"
                        alt={pro.product.prodName}
                      />

                      <Link
                        to={`/detail/${pro.product.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div
                          className={`${styles.above_layer} p-3 d-flex flex-column justify-content-between `}
                        >
                          <div className="d-flex justify-content-end">
                            {userType === "vendor" ? null : (
                              <div onClick={handleAddToCartClick}>
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
                                    className={`${styles.wish_list} bg-light`}
                                    onClick={() => addfavorite(pro.product.id)}
                                  >
                                    <i className="fa-regular fa-heart"></i>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="d-flex justify-content-center align-items-center">
                            <button className={`${styles.button_style}`}>
                              QUICK VIEW
                            </button>
                            {userType === "vendor" ? null : (
                              <div onClick={handleAddToCartClick}>
                                <button
                                  className={`${styles.button_style}`}
                                  onClick={() => addcart(pro.product.id)}
                                >
                                  ADD TO CART
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>

                    <h4 className="pb-2 pt-2">{pro.product.prodName}</h4>
                    <p>{pro.product.prodPrice} EGP</p>
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
