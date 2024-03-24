import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./ProductVendor.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FavoriteContext } from "../../Context/FavoriteContext";

export default function ProductVendor() {
  let { addToCart } = useContext(CartContext);
  const { vendorid, shopname } = useParams();

  async function addcart(id) {
    let res = await addToCart(id);
    console.log("heloo add to cart ", res);
    if (res.data.msg === "Quantity updated in cart") {
      toast.success("product added Successfully");
    } else {
    }
  }

  const [Products, setDataProsuct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function getProduct() {
    setIsLoading(true);
    let response = await axios.get(
      `http://127.0.0.1:8000/api/product/vendor/${vendorid}/`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      }
    );
    setDataProsuct(response?.data?.data);
    console.log("my respone==>>", response);

    setIsLoading(false);
    return response;
  }
  useEffect(() => {
    getProduct();
  }, []);

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

  // --------------- userData ------------------------
  const [dataUser, setData] = useState(null);

  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });

      console.log("response111", response);

      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    ProfileData();
  }, []);
  const userType = dataUser?.data.message.usertype;

  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={`${styles.header_product} py-5 mb-5 text-center `}>
            <h1>Products Vendor {shopname}</h1>

            <Link to="/" className="text-decoration-none ">
              <span className={`${styles.link_home} pe-1 `}>HomePage</span>
            </Link>

            <span className={`${styles.span_profile}`}>/product</span>
          </div>
          <div className="container mb-5 pb-5 overflow-hidden">
            <div className="row gy-5">
              {Products?.map((pro) => (
                // <div key={pro.id} className="col-md-3 cursor-pointer">
                //   <div className="product py-3 px-2">
                //     <div className={`${styles.product_info}`}>
                //       <img
                //         src={`${pro.prodImageUrl}`}
                //         className="w-100"
                //         alt={pro.prodName}
                //       />

                //       <Link
                //         to={`/detail/${pro.id}`}
                //         className="text-decoration-none text-dark"
                //       >
                //         <div
                //           className={`${styles.above_layer} p-3 d-flex flex-column justify-content-between `}
                //         >
                //           <div className="d-flex justify-content-end">
                //             <div
                //               className={`${styles.above_layer} p-3 d-flex flex-column justify-content-between `}
                //             >
                //               <div className="d-flex justify-content-end">
                //                 {userType === "vendor" ? null : (
                //                   <div onClick={handleAddToCartClick}>
                //                     {dataFavorite?.find(
                //                       (favProduct) =>
                //                         favProduct.id === pro.id
                //                     ) ? (
                //                       <div
                //                         className={`${styles.wish_list} bg-danger`}
                //                         onClick={() =>
                //                           deletefavorite(pro.id)
                //                         }
                //                       >
                //                         <i className="fa-regular fa-heart text-white"></i>
                //                       </div>
                //                     ) : (
                //                       <div
                //                         className={`${styles.wish_list}`}
                //                         onClick={() =>
                //                           addfavorite(pro.id)
                //                         }
                //                       >
                //                         <i className="fa-regular fa-heart"></i>
                //                       </div>
                //                     )}
                //                   </div>
                //                 )}
                //               </div>

                //               <div className="d-flex justify-content-center align-items-center">
                //                 <button className={`${styles.button_style}`}>
                //                   QUICK VIEW
                //                 </button>
                //                 {userType === "vendor" ? null : (
                //                   <div onClick={handleAddToCartClick}>
                //                     <button
                //                       className={`${styles.button_style}`}
                //                       onClick={() => addcart(pro.product.id)}
                //                     >
                //                       ADD TO CART
                //                     </button>
                //                   </div>
                //                 )}
                //               </div>
                //             </div>
                //           </div>

                //           <div className="d-flex justify-content-center align-items-center">
                //             <button className={`${styles.button_style}`}>
                //               QUICK VIEW
                //             </button>
                //             {userType === "vendor" ? null : (
                //               <div onClick={handleAddToCartClick}>
                //                 <button
                //                   className={`${styles.button_style}`}
                //                   onClick={() => addcart(pro.id)}
                //                 >
                //                   ADD TO CART
                //                 </button>
                //               </div>
                //             )}
                //           </div>
                //         </div>
                //       </Link>
                //     </div>

                //     <h4 className="pb-2 pt-2">{pro.prodName}</h4>
                //     <p>{pro.prodPrice} $</p>
                //   </div>
                // </div>
                <div key={pro.id} className={`col-md-3 cursor-pointer`}>
                  <div>
                    <div className={` ${styles.product}`}>
                      <div
                        className={`${styles.product_info} ${styles.product} w-100`}
                      >
                        <img
                          src={`http://127.0.0.1:8000${pro.prodImageThumbnail}`}
                          className="w-100"
                          alt={pro.prodName}
                        />
                        <Link
                          to={`/detail/${pro.id}`}
                          className="text-decoration-none text-dark "
                        >
                          <div
                            className={`${styles.above_layer}  p-3 d-flex  justify-content-between align-items-start  `}
                          >
                            {pro.prodOnSale ? (
                              <span className={`${styles.sale_product}`}>
                                On Sales
                              </span>
                            ) : null}
                            {pro.prodStock > 0 ? (
                              <span
                                className={`${styles.sale_product} bg-light text-dark`}
                              >
                                In Stock
                              </span>
                            ) : (
                              <span
                                className={`${styles.sale_product} bg-light text-dark`}
                              >
                                Out Stock
                              </span>
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className={`px-2 `}>
                        <h4 className={`pb-1 pt-2 ${styles.pro_name}`}>
                          {pro.prodName}
                        </h4>

                        {/* <div className="d-flex justify-content-between align-content-center">
                        <h5 className="pb-1">
                          {" "}
                          {pro.prodSubCategory.subCateName}
                        </h5>
                        <p className="fs-5">{pro.product.prodPrice} $</p>
                      </div> */}

                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            {pro.prodOnSale ? (
                              <>
                                <p className="fs-5 text-decoration-line-through">
                                  {pro.prodPrice} $
                                </p>
                                <p className="fs-5">{pro.discounted_price} $</p>
                              </>
                            ) : (
                              <p className="fs-5 ">{pro.prodPrice} $</p>
                            )}
                          </div>
                        </div>

                        <p className="pb-1">{pro.prodDescription}</p>
                        <div className="my-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              {userType === "vendor" ? null : (
                                <div
                                  // className={`${styles.wish_list}`}
                                  onClick={handleAddToCartClick}
                                >
                                  {dataFavorite?.find(
                                    (favProduct) => favProduct.id === pro.id
                                  ) ? (
                                    <div
                                      className={`${styles.wish_list} bg-danger`}
                                      onClick={() => deletefavorite(pro.id)}
                                    >
                                      <i className="fa-regular fa-heart text-white"></i>
                                    </div>
                                  ) : (
                                    <div
                                      className={`${styles.wish_list} `}
                                      onClick={() => addfavorite(pro.id)}
                                    >
                                      <i className="fa-regular fa-heart "></i>
                                    </div>
                                  )}{" "}
                                </div>
                              )}
                            </div>
                            <div>
                              {userType === "vendor" ? null : (
                                <div onClick={handleAddToCartClick}>
                                  <button
                                    className={`${styles.button_style} ${styles.cart}`}
                                    onClick={() => addcart(pro.id)}
                                  >
                                    <i class="fa-solid fa-cart-shopping cart"></i>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
