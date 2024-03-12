import React, { useState, useEffect } from "react";
import styles from "./Category.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function Category() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: "category",
    queryFn: getCategory,
  });

  const category = data?.data?.data;

  function getCategory() {
    let response = axios.get(`http://127.0.0.1:8000/api/product/category/`);
    return response;
  }

  return (
    <>
      <Helmet>
        <title>Category</title>
      </Helmet>
      <div className={`${styles.header_profile} py-5 mb-5 text-center `}>
        <h1>Category</h1>

        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>

        <span className={`${styles.span_profile}`}>&gt;Category</span>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container my-5">
            <div className="row gy-4">
              {category?.map((categoryItem) => (
                <div className="col-md-4" key={categoryItem.id}>
                  <Link to={`/subcategory/${categoryItem.id}/${categoryItem.cateName}`}>
                  <div className={`${styles.info_category}`}>
                    <img
                      src={`http://127.0.0.1:8000${categoryItem.cateImage}`}
                      alt={categoryItem.cateName}
                      className={`${styles.img_category}`}
                    />
                    <div className={`${styles.category_name}`}>
                      <h6 className={`${styles.name_of_category}`}>
                        {categoryItem.cateName}
                      </h6>
                    </div>
                  </div>
                  
                  </Link>
            
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
