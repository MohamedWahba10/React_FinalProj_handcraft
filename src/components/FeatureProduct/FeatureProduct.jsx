import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function FeatureProduct() {
  const { data, isLoading } = useQuery({
    queryKey: "products",
    queryFn: getProduct,
  });

  console.log("data:", data);
  const Products = data?.data?.data;
  console.log("Products:", Products);

  function getProduct() {
    let response =  axios.get(`http://127.0.0.1:8000/api/product/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    });
   return response;
  }

  return (
    <div className="container mb-5 pb-5 overflow-hidden">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row gy-5">
          {Products?.map((pro) => (
            <div key={pro.id} className="col-md-3 cursor-pointer">
              <div className="product py-3 px-2">
                <Link
                  to={`/detail/${pro.id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={pro.prodImageCover}
                    className="w-100"
                    alt={pro.prodName}
                  />
                  <h5 className="text-center text-main pt-3 pb-2">
                    {pro.prodSubCategory.subCateName}
                  </h5>
                  <h3 className="h6 text-center pb-3">{pro.prodName}</h3>
                  <div className="d-flex justify-content-between mx-5 align-items-center">
                    <p>{pro.prodPrice} EGP</p>
                  </div>
                </Link>
                <div className="d-flex justify-content-end mx-4 my-3">
                  <i className={`fa-solid fa-heart fs-2 heart-icon`}></i>
                </div>
                <button className="btn my-2 w-100 bg-main fs-5 py-2 text-light">
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
