import React, { useState, useEffect, useContext } from "react";
import styles from "./Sales.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";
import { CartContext } from "../../Context/CartContext";

export default function Sales() {
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
  console.log("userData", userData);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data, isLoading, isFetched } = useQuery({
    queryKey: "products",
    queryFn: getProduct,
  });

  // -------------------------- product Name --------------------------
  const [searchQuery, setSearchQuery] = useState("");

  // // -------categoryyyyyyyyyyyyy Name -----------------------------------
  const [searchQueryCategory, setSearchQueryCategory] = useState("");

  const [searchVendorShopName, setSearchVendorShopName] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filterByPrice = (product) => {
    if (minPrice && maxPrice) {
      return (
        product.product.prodPrice >= parseInt(minPrice) &&
        product.product.prodPrice <= parseInt(maxPrice)
      );
    } else if (minPrice) {
      return product.product.prodPrice >= parseInt(minPrice);
    } else if (maxPrice) {
      return product.product.prodPrice <= parseInt(maxPrice);
    }
    return true;
  };

  // ////////////////////////////////

  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    if (selectedCategory === 0 && data) {
      const allProducts = data.data.results;
      setFilteredProducts(allProducts);
    } else if (selectedCategory === 1 && data) {
      const filtered = data.data.results.filter((product) =>
        product.product.prodName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory === 2 && data) {
      const filtered = data.data.results.filter((product) =>
        product.prodSubCategory.subCateName
          .toLowerCase()
          .includes(searchQueryCategory.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory === 3 && data) {
      const filtered = data.data.results.filter((product) =>
        product.vendor.shopname
          .toLowerCase()
          .includes(searchVendorShopName.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory === 4 && data) {
      const filtered = data.data.results.filter((product) =>
        filterByPrice(product)
      );
      setFilteredProducts(filtered);
    }
  }, [
    selectedCategory,
    data,
    searchQuery,
    searchQueryCategory,
    searchVendorShopName,
    minPrice,
    maxPrice,
  ]);
  // //////////////////////////////////////////////////////////////////////////////////
  const Products = data?.data?.results;
  function getProduct() {
    let response = axios.get(`http://127.0.0.1:8000/api/product/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    });
    return response;
  }
  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
  };

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

  return (
    <>
      {/* --------------------------------------------------------------------------------------- */}

      {isLoading ? (
        <Loading />
      ) : (
        <>
        <div className="container my-4">
          {filteredProducts?.some((pro) => pro.product.prodOnSale) && (
            <h1 className={`${styles.sales_product_word}`}>SALES</h1>
          )}
          <div className="row gy-5">
            {filteredProducts
              ?.filter((pro) => pro.product.prodOnSale)
              .map((pro) => (
                <div
                  key={pro.product.id}
                  className={`col-md-3 cursor-pointer`}
                >
                  <div className={` ${styles.product}`}>
                    <div
                      className={`${styles.product_info} ${styles.product} w-100`}
                    >
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
                          {pro.prodSubCategory.subCateName}
                        </h5>
                      </div>
                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          {pro.product.discounted_price ===
                          pro.product.original_price ? (
                            <p className="fs-5 ">
                              {pro.product.prodPrice} EGP
                            </p>
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
                      </div>
                      <h6 className="pb-1">
                        Created By {pro.vendor.shopname}
                      </h6>
                      <div className="my-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
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
                                    className={`${styles.wish_list} `}
                                    onClick={() =>
                                      addfavorite(pro.product.id)
                                    }
                                  >
                                    <i className="fa-regular fa-heart "></i>
                                  </div>
                                )}
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
                                  <i className="fa-solid fa-cart-shopping cart"></i>
                                </button>
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
      </>
      
      )}
    </>
  );
}

