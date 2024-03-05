import React, { useState } from "react";
import styles from "./ProductDetail.module.css";
// import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function ProductDetail() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
  };
  const { data, isLoading } = useQuery({
    queryKey: ["detailProduct"],
    queryFn: getDetailProduct,
  });

  function getDetailProduct() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b`
    );
  }
  const detailPro = data?.data?.data;

  return (
    <>
      <div className="container mb-5 pb-5 overflow-hidden">

      
      {isLoading ? (
          <Loading/>
          
        ) : (
          <div className="row gy-5" key={detailPro._id}>
            <div className="col-md-4 cursor-pointer">
              <div className=" py-3 px-2 my-4">
                <Slider {...settings} className="w-100">
                  {detailPro.images.map((ele) => (
                    <img src={ele} className="w-100" alt={detailPro.title} />
                  ))}
                </Slider>
              </div>
            </div>

            <div className="col-md-7 offset-1   py-3 px-2 my-4 d-flex justify-content-start  align-items-center ">
              <div className="w-100">
                <h3 className=" pb-3">{detailPro.title}</h3>
                <p>{detailPro.description}</p>
                <h5 className="text-main pt-3 pb-2">
                  {detailPro.category.name}
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                  <p>{detailPro.price} EGP</p>
                  <p>
                    <i className="fa-solid fa-star rating-color"></i>
                    {detailPro.ratingsAverage}
                  </p>
                </div>
                <div className="d-flex justify-content-end mx-4 my-3">
                  <i
                    className={`fa-solid fa-heart fs-2 heart-icon  cursor-pointer
                   `
                    }
                  
                  ></i>
                </div>
                <button
                  className="btn my-2 w-100 bg-main fs-5 py-2 text-light"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
