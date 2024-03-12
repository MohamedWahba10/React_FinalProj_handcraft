import React, { useState, useEffect } from "react";
import styles from "./ProductINSubCategory.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function ProductINSubCategory() {
  const { subCategoryId, subCategoryName, categoryName, categoryId } =
    useParams();

  const { data, isLoading } = useQuery({
    queryKey: "product",
    queryFn: getProductINSubCategory,
  });

  const product = data?.data?.results;
  console.log("product........", product);
  function getProductINSubCategory() {
    let response = axios.get(`http://127.0.0.1:8000/api/product/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    });
    return response;
  }
  // -----------------------user data------------------------------
  const [dataUser, setData] = useState(null);

  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("response", response);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    ProfileData();
  }, []);
  const userType = dataUser?.data.message.usertype;

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
        <Link
          to={`/subcategory/${categoryId}/${categoryName}`}
          className="text-decoration-none "
        >
          <span className={`${styles.link_home} pe-1 `}>
            &gt;{categoryName}
          </span>
        </Link>
        <span className={`${styles.span_profile}`}>&gt;{subCategoryName}</span>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container my-5">
            <div className="row gy-4">
              {product
                ?.filter(
                  (productItem) => productItem.prodSubCategory == subCategoryId
                )
                .map((productItem) => (
                  //   <div className="col-md-4" key={productItem.id}>
                  //     <Link to={``}>
                  //       <div className={`${styles.info_category}`}>
                  //         <img
                  //           src={`http://127.0.0.1:8000${productItem.prodImageThumbnail}`}
                  //           alt={productItem.prodName}
                  //           className={`${styles.img_category}`}
                  //         />
                  //         <div className={`${styles.category_name}`}>
                  //           <h6 className={`${styles.name_of_category}`}>
                  //             {productItem.prodName}
                  //           </h6>
                  //         </div>
                  //       </div>
                  //     </Link>
                  //   </div>
                  <div key={productItem.id} className="col-md-3 cursor-pointer">
                    <div className="product py-3 px-2">
                      <Link
                        // to={`/detail/${pro.id}`}

                        className="text-decoration-none text-dark"
                      >
                        <div className={`${styles.product_info}`}>
                          <img
                            src={`${productItem.prodImageUrl}`}
                            className="w-100"
                            alt={productItem.prodName}
                          />
                          <div
                            className={`${styles.above_layer} p-3 d-flex flex-column justify-content-between `}
                          >
                            <div className="d-flex justify-content-end">
                              <div className={`${styles.wish_list}`}>
                                <i class="fa-regular fa-heart"></i>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                              <button className={`${styles.button_style}`}>
                                QUICK VIEW
                              </button>
                              {userType === "vendor" ? null : (
                                <button className={`${styles.button_style}`}>
                                  ADD TO CART
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>

                      <h4 className="pb-2 pt-2">{productItem.prodName}</h4>
                      <p>{productItem.prodPrice} EGP</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
