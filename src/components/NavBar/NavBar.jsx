import React, { useContext, useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";
import FilterProduct from "../FilterProduct/FilterProduct";
import { BsClockHistory } from 'react-icons/bs';

function NavBar() {
  const [layerVisible, setLayerVisible] = useState(false);
  const [layerVisibleWishList, setLayerVisibleWishList] = useState(false);
  const [layerVisibleSearch, setLayerVisibleSearch] = useState(false);
  let { token, setToken } = useContext(TokenContext);
  const [userData, setData] = useState(null);
  const { total_items_count } = useContext(CartContext);
  const { total_items_FAV } = useContext(FavoriteContext);

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
    // getcartDetails()
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
  }, []);
  const userType = userData?.data.message.usertype;
  const firstName = userData?.data.message.first_name;
  const lastName = userData?.data.message.last_name;
  const userName = firstName + " " + lastName;

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
      <nav
        className={`navbar navbar-expand-lg py-4 px-2 d-flex justify-content-between align-items-center ${styles.nav_style}`}
      >
        <div className="container ">
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
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

              {token ? (
                <>
                  {userType === "customer" ? null : (
                    <>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${styles.Link_style}`}
                          to="/allProduct"
                        >
                          SHOP
                        </Link>
                      </li>
                    </>
                  )}
                </>
              ) : null}

              <li>
                <Link
                  to="/category"
                  className={`nav-link ${styles.Link_style}`}
                >
                  CATEGORIES
                </Link>
              </li>
              {token ? (
                <>
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
                </>
              ) : null}
            </ul>
          </div>

          {token ? (
            <>
              {userType === "customer" ? (
                <>
                  {<Link to="/orderHistory" className={`${styles.cursor_pointer} me-3`}>
                    <BsClockHistory className="fs-3 position-relative text-dark" />
                  </Link>}
                  {
                    <Link to="/favorite" className={`${styles.cursor_pointer}`}>
                      <i className="fa-regular fa-heart fs-3 position-relative text-dark">
                        {/* {total_items_FAV > 0 && (
                          <span className={`${styles.cart_count} me-1`}>
                            {total_items_FAV}
                          </span>
                        )} */}
                      </i>
                    </Link>
                  }

                  {
                    <Link to="/cart" className={`${styles.cursor_pointer}`}>
                      <i className="fa-solid fa-cart-shopping fs-3 position-relative ms-3 text-dark">
                        {total_items_count > 0 && (
                          <span className={`${styles.cart_count} me-1`}>
                            {total_items_count}
                          </span>
                        )}
                      </i>
                    </Link>
                  }
                </>
              ) : null}
              <div className={`${styles.cursor_pointer} ps-2 navbar-brand`}>
                <i
                  class="fa-solid fa-magnifying-glass fs-4 ms-1"
                  onClick={() => viewSearch()}
                ></i>
              </div>
            </>
          ) : null}
          <div className={`${styles.cursor_pointer} navbar-brand`}>
            <i
              class="fa-regular fa-user fs-3 ms-2"
              onClick={() => viewAuth()}
            ></i>
            {token ? (
              <span style={{ fontWeight: "bold" }} className="ms-1">
                {userName}{" "}
              </span>
            ) : null}
          </div>
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
                    View Profile{" "}
                    <span style={{ fontWeight: "bold" }}>{userName} </span>
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

            <FilterProduct />
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
