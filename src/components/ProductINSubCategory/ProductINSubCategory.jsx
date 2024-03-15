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

  return (
    <>
      <Helmet>
        <title>SubCategory</title>
      </Helmet>
      <div className={`${styles.header_profile} py-5 mb-5 text-center `}>
        <h1>SubCategory</h1>

        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>
        <Link to="/category" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>&gt;Category</span>
        </Link>
        <Link
          to={`/subcategory/${categoryId}/${categoryName}`}
          className="text-decoration-none "
        >
          <span className={`${styles.link_home} pe-1 `}>
            &gt;{categoryName}
          </span>
        </Link>
        <span className={`${styles.span_profile}`}>&gt;{subCategoryName}</span>
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
                .map((productItem) => (
                  <div
                    key={productItem.product.id}
                    className="col-md-3 cursor-pointer"
                  >
                    <div className="product py-3 px-2">
                      <Link
                        to={`/detail/${productItem.product.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className={`${styles.product_info}`}>
                          <img
                            src={`${productItem.product.prodImageUrl}`}
                            className="w-100"
                            alt={productItem.product.prodName}
                          />
                          <div
                            className={`${styles.above_layer} p-3 d-flex flex-column justify-content-between `}
                          >
                            <div className="d-flex justify-content-end">
                              <div onClick={handleAddToCartClick}>
                                {userType === "vendor" ? null : (
                                  <div>
                                    {dataFavorite?.find(
                                      (favProduct) =>
                                        favProduct.id === productItem.product.id
                                    ) ? (
                                      <div
                                        className={`${styles.wish_list} bg-danger`}
                                        onClick={() =>
                                          deletefavorite(productItem.product.id)
                                        }
                                      >
                                        <i className="fa-regular fa-heart text-white"></i>
                                      </div>
                                    ) : (
                                      <div
                                        className={`${styles.wish_list}`}
                                        onClick={() =>
                                          addfavorite(productItem.product.id)
                                        }
                                      >
                                        <i className="fa-regular fa-heart"></i>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                              <button className={`${styles.button_style}`}>
                                QUICK VIEW
                              </button>
                              {userType === "vendor" ? null : (
                                <div onClick={handleAddToCartClick}>
                                  <button className={`${styles.button_style}`}>
                                    ADD TO CART
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>

                      <h4 className="pb-2 pt-2">
                        {productItem.product.prodName}
                      </h4>
                      <p>{productItem.product.prodPrice} EGP</p>
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
