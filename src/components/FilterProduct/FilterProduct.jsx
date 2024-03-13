import React, { useState, useEffect } from "react";
import styles from "./FilterProduct.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function FilterProduct() {
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
        product.product.prodName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory === 2 && data) {
      const filtered = data.data.results.filter((product) =>
        product.prodSubCategory.subCateName.toLowerCase().includes(searchQueryCategory.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory === 3 && data) {
      const filtered = data.data.results.filter((product) =>
        product.vendor.shopname.toLowerCase().includes(searchVendorShopName.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory === 4 && data) {
      const filtered = data.data.results.filter((product) => filterByPrice(product));
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, data, searchQuery, searchQueryCategory, searchVendorShopName, minPrice, maxPrice]);
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
  return (
    <>



      <div
        className={`d-flex container  mx-auto border-none rounded-2 bg-secondary cursor-pointer rounded border-secondary p-2 mb-4 bg-light justify-content-between text-black ${styles.cursor_pointer}`}
        style={{color: "grey" }}
      >
        {[
          "ALL",
          "Search Product Name",
          "Search Category Name",
          "Search Vendor ShopName",
          "Search By Price",
        ].map((category, index) => (
          <div
            key={index}
            className={`p-2 ${
              selectedCategory === index
                ? "border border-secondary-emphasis rounded-4 rounded bg-secondary-emphasis shadow"
                : ""
            }`}
            onClick={() => handleCategoryClick(index)}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="container my-3">
        {selectedCategory === 1 ? (
          <input
            type="text"
            className={`${styles.search_input}`}
            placeholder="Search By Name Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        ) : null}
        {selectedCategory === 2 ? (
            <input
              type="text"
              className={`${styles.search_input}`}
              placeholder="Search By Category Name"
              value={searchQueryCategory}
              onChange={(e) => setSearchQueryCategory(e.target.value)}
            />
        ) : null}
            {selectedCategory === 3 ? (
             <input
             type="text"
             className={`${styles.search_input}`}
             placeholder="Search By Vendor Shop Name"
             value={searchVendorShopName}
             onChange={(e) => setSearchVendorShopName(e.target.value)}
           />
        ) : null}
            {selectedCategory === 4 ? (
            <div className="row gy-3">
            <div className="col-md-6">
              <input
                type="number"
                className={`${styles.search_input}`}
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className={`${styles.search_input}`}
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* --------------------------------------------------------------------------------------- */}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container my-4">
            <div className="row gy-5 ">
              {filteredProducts?.map((pro) => (
                <div key={pro.product.id} className="col-md-3 cursor-pointer">
                  <div className="product ">
                    <div className={`${styles.product_info}`}>
                      <img
                        src={`${pro.product.prodImageUrl}`}
                        className="w-100"
                        alt={pro.product.prodName}
                      />
                      <Link
                        to={`/detail/${pro.product.id}`}
                        className="text-decoration-none text-dark "
                      >
                        <div
                          className={`${styles.above_layer} p-3 d-flex  align-items-end  flex-column justify-content-between `}
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
                              <button
                                className={`${styles.button_style}`}
                                onClick={handleAddToCartClick}
                              >
                                ADD TO CART
                              </button>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>

                    <h4 className="pb-1 pt-2">{pro.product.prodName}</h4>
                    <h6 className="pb-1"> {pro.prodSubCategory.subCateName}</h6>
                    <h6 className="pb-1">Created By {pro.vendor.shopname}</h6>

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
{
}
