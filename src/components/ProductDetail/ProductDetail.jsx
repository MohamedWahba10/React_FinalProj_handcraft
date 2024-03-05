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
          <Loading />
        ) : (
          <div className="row gy-5" key={detailPro._id}>
            <div className="col-md-5 cursor-pointer">
              <div className="py-3 px-2 my-4">
                <Slider {...settings} className="w-100">
                  {detailPro.images.map((ele) => (
                    <img
                      src={ele}
                      className={`w-100 ${styles.img_style}`}
                      alt={detailPro.title}
                    />
                  ))}
                </Slider>
              </div>
            </div>

            <div className="col-md-6 offset-1 py-3 px-2 my-4 d-flex justify-content-start  ">
              <div className="w-100 py-3 px-2 my-5">
                <div className="d-flex justify-content-end mx-4 my-3 ">
                  <div className={`${styles.wish_style}`}>
                    <i
                      class={`fa-regular fa-heart fs-2 ${styles.wish_icon}`}
                    ></i>
                  </div>
                </div>
                <h5 className="pb-2">{detailPro.category.name}</h5>
                <h3 className=" pb-3">{detailPro.title}</h3>
                <p>
                  <i className="fa-solid fa-star text-warning pe-2 fs-4"></i>
                  <span className="fs-4">{detailPro.ratingsAverage}</span>
                </p>

                <p className="fs-4 py-2">${detailPro.price} </p>

                <p>
                  {detailPro.description} Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Quod ad eligendi quae odit odio
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
                  aliquam molestias enim. Explicabo, provident? Quis. non!
                </p>

                <button className={` my-4 w-100 fs-4 py-3 ${styles.cart_button_style}`} >ADD TO CART</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
