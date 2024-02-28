import React, { useState } from "react";
import styles from "./ProductDetail.module.css";
import { Link } from "react-router-dom";

export default function ProductDetail() {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
      "https://img.freepik.com/premium-vector/hand-made-icon-logo-vintage-stamp-icon-with-handmade-lettering-with-laurel-wreath-cute-bird_100478-351.jpg?w=740",
      "https://c7.alamy.com/comp/2GY0E9G/handmade-logo-hand-made-bagde-label-isolated-on-white-background-vector-2GY0E9G.jpg",
      "https://cdn2.vectorstock.com/i/1000x1000/83/76/hand-made-logo-design-insignias-vector-7438376.jpg",
    ];
  
    const handleClick = (image) => {
      setSelectedImage(image);
    };

  return (
    <div className={`${styles.slider_container} d-flex justify-content-center align-items-center `}>
      <div className={styles.slider_content}>
        <div className={styles.main_image}>
          <img
            src={selectedImage || images[0]}
            alt="Main"
          />
        </div>
        <div className={styles.sub_images}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Sub ${index}`}
              className={selectedImage === image ? styles.selected : ""}
              onClick={() => handleClick(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
