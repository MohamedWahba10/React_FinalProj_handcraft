import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
// import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link, useParams } from "react-router-dom";

export default function ProductDetail() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
  };
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["detailProduct"],
    queryFn: getDetailProduct,
  });
  function getDetailProduct() {
    return axios.get(`http://127.0.0.1:8000/api/product/details/${id}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    });
  }

  const detailPro = data?.data?.data;
  console.log("dataProoooo", detailPro);

 
  const [dataUser, setData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("responsee user type", response);
      setUserLoading(false);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    ProfileData();
  }, []);
  const userType = dataUser?.data.message.usertype;
  console.log("userData", userType);

 

  return (
    <>
      <div className="container mb-5 pb-5 overflow-hidden">
        {isLoading && userLoading ? (
          <Loading />
        ) : (
          <div className="row gy-5" key={detailPro?.id}>
            <div className="col-md-5 cursor-pointer">
              <div className="py-3 px-2 my-4">
                <Slider {...settings} className="w-100">
                  {[
                    detailPro?.prodImageOne,
                    detailPro?.prodImageTwo,
                    detailPro?.prodImageThree,
                    detailPro?.prodImageFour,
                  ].map((ele) => (
                    <img
                      src={`http://127.0.0.1:8000${ele}`}
                      className={`w-100 ${styles.img_style}`}
                      alt={detailPro?.prodName}
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
                <h5 className="pb-2">{detailPro?.prodSubCategory.subCateName}</h5>
                <h3 className=" pb-3">{detailPro?.prodName}</h3>
                {/* <p>
                  <i className="fa-solid fa-star text-warning pe-2 fs-4"></i>
                  <span className="fs-4">{detailPro.ratingsAverage}</span>
                </p> */}
                <h5 className="pb-2">
                  Created By {detailPro?.prodVendor.shopname}
                </h5>

                <p className="fs-4">{detailPro?.prodPrice}EGP </p>

                <p>{detailPro?.prodDescription}</p>
                {userType === "vendor" ? (
                  <Link to="/addProduct">
                    <button
                      className={` my-4 w-100 fs-4 py-3 ${styles.cart_button_style}`}
                    >
                      ADD PROUDUCT
                    </button>
                  </Link>
                ) : (
                  <button
                    className={` my-4 w-100 fs-4 py-3 ${styles.cart_button_style}`}
                  >
                    ADD TO CART
                  </button>
                )}
                <Link to={`/vendorProduct/${detailPro?.prodVendor.id}/${detailPro?.prodVendor.shopname}`}>
                  <button
                    className={` my-4 w-100 fs-4 py-3 ${styles.cart_button_style}`}
                  >
                    View Product Vendor {detailPro?.prodVendor.shopname}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
