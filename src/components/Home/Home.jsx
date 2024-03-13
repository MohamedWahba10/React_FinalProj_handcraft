import React, { useContext, useEffect, useState } from "react";
import img1 from "../../assets/images/image3.jpg";
import styles from "./Home.module.css";
import MainSlider from "../MainSlider/MainSlider";
import CartContext from "../../Context/CartContext";

import RecipeReviewCard from "../test/RecipeReviewCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import CategorySlider from "../CategorySlider/CatrgorySlider";
import FilterProduct from "../FilterProduct/FilterProduct";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  // let { addToCart } = useContext(CartContext)

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
  };

  // async function addCart(id) {
  //  let res= await addToCart(id)
  // }

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

  const { data, isLoading } = useQuery({
    queryKey: "products",
    queryFn: getProduct,
  });

  const Products = data?.data?.results;
  function getProduct() {
    let response = axios.get(`http://127.0.0.1:8000/api/product/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    });
    return response;
  }

  return (
    <>
      {isLoading && userLoading ? (
        <Loading />
      ) : (
        <>
          <MainSlider />
          <CategorySlider/>
          <FilterProduct />
          {/* <RecipeReviewCard /> */}

          <div className="container my-5">
            <div className="row">
              <div className="md-col-3 text-center mt-5">
                <h2>What's New?</h2>
              </div>
            </div>
            <div
              className={`d-flex mx-auto border-none rounded-2 bg-secondary cursor-pointer rounded border-secondary p-1 mb-4 bg-light justify-content-between text-black ${styles.cursor_poiner}`}
              style={{ width: "30rem", color: "grey" }}
            >
              {["category 1", "On Sale", "category 3", "category 4"].map(
                (category, index) => (
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
                )
              )}
            </div>
            <div className="row gy-4">
              {selectedCategory === 1 &&
                Array.isArray(Products) &&
                Products.map((pro, index) => {
                  if (pro.prodOnSale) {
                    return (
                      <div key={index} className="col-lg-3 col-md-6 col-12">
                        <div
                          className={`${styles.card_sale} card ${styles.product}`}
                        >
                          <div>
                            <img
                              src={pro.prodImageUrl}
                              alt={pro.prodName}
                              className={`${styles.img_sale}`}
                            />
                            <div className={`${styles.check_onsale}`}>
                              {pro.prodOnSale ? (
                                <>
                                  <button className="">Sale</button>
                                </>
                              ) : null}
                            </div>
                          </div>

                          <div className="card-body gy-5">
                            <h5 className="card-title">{pro.prodName}</h5>
                            <p className="card-text">{pro.prodPrice} EGP</p>
                          </div>
                          {userType === "vendor" ? null : (
                            <div className="d-flex justify-content-center ">
                              <button
                                className={`${styles.btn} my-2 fs-5 py-2 `}
                              >
                                ADD TO CART
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              {selectedCategory !== 1 &&
                [1, 2, 3, 4].map((cardIndex) => (
                  <div key={cardIndex} className="col-lg-3 col-md-6 col-12">
                    <div className="card">
                      <img src={img1} alt="" style={{ height: "12rem" }} />
                      <div className="card-body gy-5">
                        <h5 className="card-title">{`Category ${
                          selectedCategory + 1
                        } Card ${cardIndex}`}</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
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
