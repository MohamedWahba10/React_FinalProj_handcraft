import React, { useState } from "react";
import styles from "./MainSlider.module.css";
import img1 from "../../assets/images/mainSlider/image5.jpg";
import img2 from "../../assets/images/mainSlider/image4.jpg";
import img3 from "../../assets/images/mainSlider/image2.avif";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
        <div className="position-relative">
          <img
            src={img1}
            alt=""
            className={currentSlide === 0 ? styles["slider-zoom"] : ""}
          />
          <div className={`${styles.above_layer}`}>
            <div className={`${styles.inner_layer} flex-column `}>
              <p>SALE! UP TO 50% OFF!</p>
              <h1>
                Summer Sale <br /> Collections
              </h1>
              <Link to="/allProduct">
                <button className={`${styles.style_button}`}>SHOP NOW</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="position-relative">
          <img
            src={img2}
            alt=""
            className={currentSlide === 1 ? styles["slider-zoom"] : ""}
          />
          <div className={`${styles.above_layer}`}>
            <div className={`${styles.inner_layer} flex-column `}>
              <p>SALE! UP TO 50% OFF!</p>
              <h1>
                Stylish Looks For <br /> Any Season
              </h1>
              <Link to="/allProduct">
                <button className={`${styles.style_button}`}>SHOP NOW</button>
              </Link>{" "}
            </div>
          </div>
        </div>
        <div className="position-relative">
          <img
            src={img3}
            alt=""
            className={currentSlide === 2 ? styles["slider-zoom"] : ""}
          />
          <div className={`${styles.above_layer}`}>
            <div className={`${styles.inner_layer} flex-column `}>
              <p>SALE! UP TO 50% OFF!</p>
              <h1>
                Accessories For <br />
                Every Occassion
              </h1>
              <Link to="/allProduct">
                <button className={`${styles.style_button}`}>SHOP NOW</button>
              </Link>{" "}
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
