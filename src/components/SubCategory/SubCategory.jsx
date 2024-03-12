import React, { useState, useEffect } from "react";
import styles from "./SubCategory.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function SubCategory() {
  const navigate = useNavigate();
  const { categoryId, categoryName } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: "subCategory",
    queryFn: getSubCategory,
  });

  const subCategory = data?.data?.data;

  function getSubCategory() {
    let response = axios.get(
      `http://127.0.0.1:8000/api/product/subcategory/`
    );
    return response;
  }

  return (
    <>
      <Helmet>
        <title>SubCategory</title>
      </Helmet>
      <div className={`${styles.header_profile} py-5 mb-5 text-center `}>
        <h1>SubCategory</h1>

        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>
        <Link to="/category" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>&gt;Category</span>
        </Link>
        <span className={`${styles.span_profile}`}>&gt;{categoryName}</span>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container my-5">
            <div className="row gy-4">
              {subCategory?.filter((subCategoryItem) => 
                  subCategoryItem.subCateParent==categoryId).map((subCategoryItem) =>(
                    <div className="col-md-4" key={subCategoryItem.id}>
                    <Link to={`/productinsubcategory/${categoryId}/${categoryName}/${subCategoryItem.id}/${subCategoryItem.subCateName}`}>
                      <div className={`${styles.info_category}`}>
                        <img
                          src={`http://127.0.0.1:8000${subCategoryItem.subCateImage}`}
                          alt={subCategoryItem.subCateName}
                          className={`${styles.img_category}`}
                        />
                        <div className={`${styles.category_name}`}>
                          <h6 className={`${styles.name_of_category}`}>
                            {subCategoryItem.subCateName}
                          </h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                  )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
