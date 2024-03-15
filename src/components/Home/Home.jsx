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
    <Helmet>
      <title>
        Home Page
      </title>
    </Helmet>
      {isLoading && userLoading ? (
        <Loading />
      ) : (
        <>
          <MainSlider />
          <CategorySlider/>
          <FilterProduct />
          <NewProduct/>
          <Sales/>
          <HighestRate/>

        </>
      )}
    </>
  );
}
