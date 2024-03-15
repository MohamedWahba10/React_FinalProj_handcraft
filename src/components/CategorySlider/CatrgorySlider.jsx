import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./CategorySlider.module.css"
export default function CategorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow:3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  const { data, isLoading } = useQuery({
    queryKey: "subCategory",
    queryFn: getSubCategory,
  });

  const subCategory = data?.data?.data;
  function getSubCategory() {
    let response = axios.get(`http://127.0.0.1:8000/api/product/subcategory/`);
    return response;
  }
return(


  <>
    {isLoading ? (
      <>
        <Loading />

      </>
    ) : (
      <div className="container mb-5 pb-5 overflow-hidden ">
        <div className="mb-4">
        <h2 className={`my-5 text-center fs-1 ${styles.categoryName}`}>Sub Category</h2>
        <Slider {...settings} className="w-100">
          {subCategory?.map((category) => (
            <div key={category.id}>
              <img
                className={`${styles.image_category}`}
                src={`${category.subCateImage}`}
                width={"100%"}
                alt={category.subCateName}
              />
              <div className="d-flex justify-content-center">
              <span className="text-center fs-4 my-2">{category.subCateName}</span>

              </div>
            </div>
          ))}
        </Slider>
        </div>
     
      </div>
    )}
  </>
)
}
