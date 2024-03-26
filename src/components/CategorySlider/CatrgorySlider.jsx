import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./CategorySlider.module.css";
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
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
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

  const [layerVisible, setLayerVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  function viewDetail(category) {
    setSelectedBrand(category);
    setLayerVisible(true);
  }

  function closeLayer() {
    setLayerVisible(false);
    setSelectedBrand(null);
  }

  function handleInnerLayerClick(e) {
    e.stopPropagation();
  }

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="container mb-5 pb-5 overflow-hidden ">
          <div className="mb-4">
            <h2 className={`my-5 text-center fs-1 ${styles.categoryName}`}>
              Sub Category
            </h2>
            <Slider {...settings} className="w-100">
              {subCategory?.map((category) => (
                <div className={`${styles.category_slider}`}>
                  <div key={category.id}>
                    <img
                      className={`${styles.image_category}`}
                      src={`http://localhost:8000${category.subCateImage}`}
                      width={"100%"}
                      alt={category.subCateName}
                      onClick={() => viewDetail(category)}
                    />
                    <div className="d-flex justify-content-center">
                      <span
                        className={`text-center fs-4 my-2 ${styles.subName}`}
                      >
                        {category.subCateName}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {layerVisible && (
        <div className={`${styles.above_layer}`} onClick={closeLayer}>
          <div
            className={`${styles.inner_layer}`}
            onClick={handleInnerLayerClick}
          >
            <div>
              <div className="d-flex justify-content-end">
                <i
                  class="fa-solid fa-xmark fs-2 cursor-pointer"
                  onClick={closeLayer}
                ></i>
              </div>
              <hr className="my-3" />
              <div className="row">
                <div className="col-6 d-flex flex-column justify-content-center ps-4  align-content-center ">
                  <h2
                    className={`${styles.NameCategory} pb-3`}
                    style={{ fontSize: "3.5rem" }}
                  >
                    {selectedBrand.subCateName}
                  </h2>
                  <p className="fs-4">{selectedBrand.subCateDescription}
                  </p>
                </div>
                <div className="col-6">
                  <img
                   src={`http://localhost:8000${selectedBrand.subCateImage}`}
                    alt=""
                    width={"100%"}
                  />
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-end ">
                <button className={`${styles.btn} fs-3`} onClick={closeLayer}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
