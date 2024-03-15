import React, { useContext, useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";
import FilterProduct from "../FilterProduct/FilterProduct";

function NavBar() {
  const [layerVisible, setLayerVisible] = useState(false);
  const [layerVisibleWishList, setLayerVisibleWishList] = useState(false);
  const [layerVisibleSearch, setLayerVisibleSearch] = useState(false);
  let { token, setToken } = useContext(TokenContext);
  const [userData, setData] = useState(null);

  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
      if (error.response.data.data === "expired_token.") {
        toast(`Please Login Agin`);
        localStorage.removeItem("userToken");
        navigate("/login");
      }
    }
  }

  // useEffect(() => {
  //   ProfileData();
  // }, []);

  useEffect(() => {
    ProfileData();
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
  }, []);
  const userType = userData?.data.message.usertype;

  console.log(userType);

  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }
  setToken(localStorage.getItem("userToken"));

  function viewAuth() {
    setLayerVisible(!layerVisible);
  }
  function closeLayer() {
    setLayerVisible(false);
  }
  function viewWishList() {
    setLayerVisibleWishList(!layerVisibleWishList);
  }
  function viewSearch() {
    setLayerVisibleSearch(!layerVisibleSearch);
  }
  function closeLayerWishList() {
    setLayerVisibleWishList(false);
  }
  function closeLayerSearch() {
    setLayerVisibleSearch(false);
  }
  function handleInnerLayerClick(e) {
    e.stopPropagation();
  }
  // ---------------------------------- search ---------------------------------

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isFetched } = useQuery({
    queryKey: "products",
    queryFn: getProduct,
  });
  useEffect(() => {
    if (isFetched) {
      console.log("Data fetching is completed");
    }
  }, [isFetched]);

  useEffect(() => {
    if (Products) {
      const filtered = Products.filter((product) =>
        product.product.prodName.includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [data, searchQuery]);

  const Products = data?.data?.results;
  function getProduct() {
    let response = axios.get(`http://127.0.0.1:8000/api/product/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
    });
    return response;
  }
  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };
  // ------------------------------------favorite ------------------------------------------------------------------
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

  return (
    <>
      <nav className={`navbar navbar-expand-lg  py-4 px-2 ${styles.nav_style}`}>
        <div className="container">
          {token ? (
            <button
              className={`navbar-toggler border-0 ${styles.icon_button_menue}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          ) : null}
          <Link
            className={`${styles.handcrafted} navbar-brand fw-bold pe-3 fs-4`}
            to="/"
          >
            HandCrafted Marketplace
          </Link>
          {token ? (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`${styles.Link_style} nav-link active`}
                    aria-current="page"
                    to="/"
                  >
                    HOME
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className={`nav-link ${styles.Link_style}`}>
                    ABOUT US
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${styles.Link_style}`}
                    to="/allProduct"
                  >
                    SHOP
                  </Link>
                </li>

                {/* <li class={`${styles.submenu} nav-item`}>
                  <Link
                    to="javascript:;"
                    className={`${styles.Link_style} text-black text-decoration-none nav-link`}
                  >
                    PAGES
                  </Link>
                  <ul> */}

                <li>
                  <Link
                    to="/category"
                    className={`nav-link ${styles.Link_style}`}
                  >
                    CATEGORIES
                  </Link>
                </li>
                {/* <li>
                      <Link to="/allProduct" className={`${styles.Link_style}`}>
                        Products
                      </Link>
                    </li> */}
                {userType === "customer" ? null : (
                  <>
                    <li>
                      <Link
                        to="/addProduct"
                        className={`nav-link ${styles.Link_style}`}
                      >
                        ADD PRODUCT
                      </Link>
                    </li>
                  </>
                )}
                {/* </ul>
                </li> */}
              </ul>
            </div>
          ) : null}
          <div className={`${styles.cursor_pointer} navbar-brand`}>
            <i class="fa-regular fa-user fs-3" onClick={() => viewAuth()}></i>
          </div>
          {token ? (
            <>
              {userType === "customer" ? (
                <>
                  <div className={`${styles.cursor_pointer} navbar-brand`}>
                    <Link to="/favorite" className="text-black">
                      <i
                        class="fa-regular fa-heart fs-3"
                        // onClick={() => viewWishList()}
                      ></i>
                    </Link>
                  </div>
                  <Link to="/cart" className={`${styles.cursor_pointer}`}>
                    <i class="fa-solid text-dark fa-cart-shopping fs-3"></i>
                  </Link>
                </>
              ) : null}
              <div className={`${styles.cursor_pointer} ps-2 navbar-brand`}>
                <i
                  class="fa-solid fa-magnifying-glass fs-4"
                  onClick={() => viewSearch()}
                ></i>
              </div>
            </>
          ) : null}
        </div>
      </nav>
      {layerVisible && (
        <div className={`${styles.above_layer}`} onClick={closeLayer}>
          <div
            className={`${styles.inner_layer} py-5 px-5`}
            onClick={handleInnerLayerClick}
          >
            {token ? (
              <>
                <div className="mb-3">
                  <button
                    className={`${styles.login_style_button} py-3`}
                    onClick={() => {
                      logOut();
                      closeLayer();
                    }}
                  >
                    LOGOUT
                  </button>
                </div>

                <div>
                  <Link
                    className={`${styles.view_profile} ps-1 text-center d-block `}
                    to="/profile"
                    onClick={closeLayer}
                  >
                    View Profile
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <button className={`${styles.login_style_button}`}>
                    <Link
                      className={`${styles.login_style_link}`}
                      to="/login"
                      onClick={closeLayer}
                    >
                      LOGIN
                    </Link>
                  </button>
                </div>

                <div>
                  <span className="fs-4">Don't have an account?</span>
                  <Link
                    className={`${styles.register_style_link} ps-1`}
                    to="/register"
                    onClick={closeLayer}
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* .................... wish list ....................... */}
      {/* {layerVisibleWishList && (
        <div
          className={`${styles.above_layer_wish}`}
          onClick={closeLayerWishList}
        >
          <div
            className={`${styles.inner_layer_wish} py-5 px-5 position-relative `}
            onClick={handleInnerLayerClick}
          >
            <div className="d-flex justify-content-end ">
              <i
                class={`fa-solid fa-xmark fs-3 ${styles.cursor_pointer}`}
                onClick={closeLayerWishList}
              ></i>
            </div>
            <div>
              <h1 className="fw-bold">Wish List</h1>
            </div>
            <div className={`${styles.wish_list_buttons}   `}>
              <button className={`${styles.wish_style_button} d-block`}>
                <Link
                  className={`${styles.wish_style_link}`}
                  to="/"
                  onClick={closeLayer}
                >
                  Wish List
                </Link>
              </button>
              <span
                className={`${styles.cursor_pointer} fs-4`}
                onClick={closeLayerWishList}
              >
                OR CONTINUE SHOPPING
              </span>
            </div>
          </div>
        </div>
      )} */}

      {/* ......................search............................ */}

      {layerVisibleSearch && (
        <div
          className={`${styles.above_layer_wish}`}
          onClick={closeLayerSearch}
        >
          <div
            className={`${styles.inner_layer_search} pt-5 position-relative `}
            onClick={handleInnerLayerClick}
          >
            <div className="d-flex justify-content-end ">
              <i
                class={`fa-solid fa-xmark px-5  fs-3 ${styles.cursor_pointer}`}
                onClick={closeLayerSearch}
              ></i>
            </div>
            {/* <div className="container">
              <input
                type="text"
                className={`${styles.search_input}`}
                placeholder="Search By Name Product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="container my-4">
              <div className="row gy-5 ">
                {filteredProducts?.map((pro) => (
                  <div key={pro.product.id} className="col-md-3 cursor-pointer">
                    <div className="product ">
                      <div className={`${styles.product_info}`}>
                        <img
                          src={`${pro.product.prodImageUrl}`}
                          className="w-100"
                          alt={pro.product.prodName}
                        />
                        <Link
                          to={`/detail/${pro.product.id}`}
                          className="text-decoration-none text-dark "
                        >
                          <div
                            className={`${styles.above_layer} p-3 d-flex flex-column justify-content-between align-items-end `}
                          >
                            <div className="d-flex justify-content-start align-items-end">
                              {userType === "vendor" ? null : (
                                <div
                                  // className={`${styles.wish_list}`}
                                  onClick={handleAddToCartClick}
                                >
                                  {dataFavorite?.find(
                                    (favProduct) =>
                                      favProduct.id === pro.product.id
                                  ) ? (
                                    <div
                                      className={`${styles.wish_list} bg-danger`}
                                      onClick={() =>
                                        deletefavorite(pro.product.id)
                                      }
                                    >
                                      <i className="fa-regular fa-heart text-white"></i>
                                    </div>
                                  ) : (
                                    <div
                                      className={`${styles.wish_list}`}
                                      onClick={() =>
                                        addfavorite(pro.product.id)
                                      }
                                    >
                                      <i className="fa-regular fa-heart"></i>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                              <div>
                                <button className={`${styles.button_style}`}>
                                  QUICK VIEW
                                </button>
                              </div>

                              <div>
                                {userType === "vendor" ? null : (
                                  <button
                                    className={`${styles.button_style}`}
                                    onClick={handleAddToCartClick}
                                  >
                                    ADD TO CART
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <h4 className="pb-2 pt-2">{pro.product.prodName}</h4>
                      <p>{pro.product.prodPrice} EGP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <FilterProduct/>

            {/* <div className={`${styles.wish_list_buttons}  `}>
              <button
                className={`${styles.wish_style_button} d-block  fixed-bottom `}
              >
                <Link
                  className={`${styles.wish_style_link}`}
                  to="/"
                  onClick={closeLayer}
                >
                  View Result Search
                </Link>
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
