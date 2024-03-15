import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
// import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";
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

  let { addToFavorite, deleteFavoriteProduct, getFavorite } =
    useContext(FavoriteContext);
  async function addfavorite(id) {
    let res = await addToFavorite(id);
    console.log("heloo add to favorite ", res);
    if (res?.data?.message === "Product was added to favorites.") {
      toast.success("Product Added Favorite Successfully");
      getfavorite();
    } else {
      toast.error(res.data.message);
    }
  }

  async function deletefavorite(id) {
    let res = await deleteFavoriteProduct(id);
    console.log("heloo remove to favorite ", res);
    if (res?.data?.message === "Product was removed from favorites.") {
      toast.success("Product Removed Favorite Successfully");
      getfavorite();
    } else {
      toast.error("ERROR");
    }
  }
  const [dataFavorite, setDataFavorite] = useState(null);

  async function getfavorite() {
    try {
      let res = await getFavorite();
      console.log("hello all to favorite", res);
      setDataFavorite(res.data.favorite_products);
      console.log("dataFavoeite", dataFavorite);
    } catch (error) {
      console.error("Error while fetching favorite:", error);
    }
  }
  useEffect(() => {
    getfavorite();
  }, []);

let [avgRate,setAvgRate] =useState(null)
  async function getAvgRate() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/product/product_r/${id}/`, {
      
      });
      setAvgRate( response?.data?.average_Rate)
     
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }
  useEffect(() => {
    getAvgRate();
  }, []);

  
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
            <div className="col-md-6 offset-md-1 py-3 px-2 my-4">
              <div className="w-100 py-3 px-2 my-5">
                <div className="mx-4 my-3 ">
                  {userType === "vendor" ? null : (
                    <>
         
                      <div  className="d-flex justify-content-end mx-4 my-3"> 
                        {dataFavorite?.find(
                          (favProduct) => favProduct.id === detailPro?.id
                        ) ? (
                          <div
                            className={`${styles.wish_style} bg-danger`}
                            onClick={() => deletefavorite(detailPro?.id)}
                          >
                            <i  class={`fa-regular fa-heart fs-2 text-white  ${styles.wish_icon}`}></i>
                          </div>
                        ) : (
                          <div
                            className={`${styles.wish_style}`}
                            onClick={() => addfavorite(detailPro?.id)}
                          >
                            <i  class={`fa-regular fa-heart fs-2  ${styles.wish_icon}`}></i>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <h5 className="pb-2">
                    {detailPro?.prodSubCategory.subCateName}
                  </h5>
                  <h3 className=" pb-3">{detailPro?.prodName}</h3>
                  {avgRate?
                  <p>
                  <i className="fa-solid fa-star text-warning pe-2 fs-4"></i>
                  <span className="fs-4">{avgRate}</span>
                </p>
                
                :null}
                  
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
                  <Link
                    to={`/vendorProduct/${detailPro?.prodVendor.id}/${detailPro?.prodVendor.shopname}`}
                  >
                    <button
                      className={` my-4 w-100 fs-4 py-3 ${styles.cart_button_style}`}
                    >
                      View Product Vendor {detailPro?.prodVendor.shopname}
                    </button>
                  </Link>
                  <Link
                    to={`/rateProduct/${detailPro?.id}/${detailPro?.prodName}`}
                  >
                    <button
                      className={` my-4 w-100 fs-4 py-3 ${styles.cart_button_style}`}
                    >
                     Rate Product {detailPro?.prodName}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
