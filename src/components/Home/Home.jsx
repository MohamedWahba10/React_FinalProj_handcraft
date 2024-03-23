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
import NewProduct from "../NewsProduct/NewPoduct";
import { Helmet } from "react-helmet";
import Sales from "../Sales/Sales";
import HighestRate from "../HighestRate/HighestRate";
import ChatBot from "../ChatBot/ChatBot";

export default function Home() {
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
  const first_name = dataUser?.data.message.first_name;
  const userType = dataUser?.data.message.usertype;
  const last_name = dataUser?.data.message.last_name;

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
  const [layerVisibleSearch, setLayerVisibleSearch] = useState(false);

  function viewSearch() {
    setLayerVisibleSearch(!layerVisibleSearch);
  }
  function closeLayerSearch() {
    setLayerVisibleSearch(false);
  }
  function handleInnerLayerClick(e) {
    e.stopPropagation();
  }
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      {isLoading && userLoading ? (
        <Loading />
      ) : (
        <div className="position-relative ">
          <MainSlider />
          <CategorySlider />
          <FilterProduct />
          <NewProduct />
          <Sales />
          <HighestRate />
          {/* <ChatBot/> */}
          {userType === "vendor" ?null: (
            <div
            className={`${styles.cursor_pointer} ps-2 navbar-brand ${styles.chat}`}
          >
            <div className={`${styles.chatBot}`} onClick={() => viewSearch()}>
            <i
              className="fa-brands fa-rocketchat"
              
            ></i>
            </div>
   
          </div>
   )}

          
          {layerVisibleSearch && (
            <div
              className={`${styles.above_layer_wish}`}
              onClick={closeLayerSearch}
            >
              <div
                className={`${styles.inner_layer_search} position-relative `}
                onClick={handleInnerLayerClick}
              >
                <div
                  className={`d-flex justify-content-between align-items-center  px-3 py-2 ${styles.conteent_theChat}`}
                >
                  <p>
                    Welcome {first_name} {last_name}
                  </p>
                  <i
                    class={`fa-solid fa-xmark px-5  fs-3 ${styles.cursor_pointer}`}
                    onClick={closeLayerSearch}
                  ></i>
                </div>

                <ChatBot />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
