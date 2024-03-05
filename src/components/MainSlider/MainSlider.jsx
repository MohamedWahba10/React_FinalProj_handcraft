import React, { useState } from 'react';
import styles from "./MainSlider.module.css";
import img1 from '../../assets/images/mainSlider/image5.jpg';
import img2 from '../../assets/images/mainSlider/image4.jpg';
import img3 from '../../assets/images/mainSlider/image2.avif';
import Slider from "react-slick";

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
        appendDots: dots => (
            <div
                style={{
                    bottom: '20px',
                    textAlign: 'center',
                }}
            >
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        beforeChange: (current, next) => setCurrentSlide(next)
    };

    return (
      
                <div className="w-100 overflow-hidden">
                    <Slider {...settings} >
                        <div>
                            <img src={img1} alt="" className={currentSlide === 0 ? styles["slider-zoom"] : ""} />
                        </div>
                        <div>
                            <img src={img2} alt="" className={currentSlide === 1 ? styles["slider-zoom"] : ""} />
                        </div>
                        <div>
                            <img src={img3} alt="" className={currentSlide === 2 ? styles["slider-zoom"] : ""} />
                        </div>
                    </Slider>
                </div>
         
    );
}
