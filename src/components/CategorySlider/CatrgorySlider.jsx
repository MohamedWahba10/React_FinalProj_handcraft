import React, { useState } from "react";
import styles from "./MainSlider.module.css";
import img1 from "../../assets/images/mainSlider/image5.jpg";
import img2 from "../../assets/images/mainSlider/image4.jpg";
import img3 from "../../assets/images/mainSlider/image2.avif";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div
        style={{
          bottom: "20px",
          textAlign: "center",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div className="w-100 overflow-hidden">
      <Slider {...settings}>
    
      </Slider>
    </div>
  );
}
