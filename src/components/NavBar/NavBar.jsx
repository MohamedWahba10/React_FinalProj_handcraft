import React, { useContext, useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token";
import Cookies from "js-cookie";

function NavBar() {
  const [layerVisible, setLayerVisible] = useState(false);
  const [layerVisibleWishList, setLayerVisibleWishList] = useState(false);
  let { token, setToken, setUserData, userData } = useContext(TokenContext);
  // const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    setUserData(localStorage.getItem("userData"));
  }, []);

  // userData = JSON.parse(localStorage.getItem("userData"));
  // userData = localStorage.getItem("userData");
  var userDataString = localStorage.getItem("userData");
  userData = JSON.parse(userDataString);

  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    Cookies.remove("userToken");
    // Cookies.remove('userToken', { path: '/login' });
    setToken(null);
    setUserData(null);
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
  function closeLayerWishList() {
    setLayerVisibleWishList(false);
  }
  function handleInnerLayerClick(e) {
    e.stopPropagation();
  }

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
            className={`${styles.Link_style} navbar-brand fw-bold pe-3 fs-4`}
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
                  <Link className={`nav-link ${styles.Link_style}`} to="/">
                    FEATURE
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${styles.Link_style}`} to="/">
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${styles.Link_style}`} to="/">
                    PRODUCT
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${styles.Link_style}`} to="/">
                    BLOG
                  </Link>
                </li>

                <li class={`${styles.submenu} nav-item`}>
                  <Link
                    to="javascript:;"
                    className={`${styles.Link_style} text-black text-decoration-none nav-link`}
                  >
                    PAGES
                  </Link>
                  <ul>
                    <li>
                      <Link to="/about" className={`${styles.Link_style}`}>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/detail" className={`${styles.Link_style}`}>
                        Products
                      </Link>
                    </li>
                    {userData.usertype === "customer" ? null : (
                      <>
                        <li>
                          <Link
                            to="/addProduct"
                            className={`${styles.Link_style}`}
                          >
                            Add Product
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/updateProduct"
                            className={`${styles.Link_style}`}
                          >
                            Update Product
                          </Link>
                        </li>
                        <li>
                          <Link to="/detail" className={`${styles.Link_style}`}>
                            Detail
                          </Link>
                        </li>
                      </>
                    )}

                    <li>
                      <Link to="/" className={`${styles.Link_style}`}>
                        Single Product
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : null}
          <div className={`${styles.cursor_pointer} navbar-brand`}>
            <i class="fa-regular fa-user fs-3" onClick={() => viewAuth()}></i>
          </div>
          {token ? (
            <>
              <div className={`${styles.cursor_pointer} navbar-brand`}>
                <i
                  class="fa-regular fa-heart fs-3"
                  onClick={() => viewWishList()}
                ></i>
              </div>
              <div className={`${styles.cursor_pointer}`}>
                <i class="fa-solid fa-cart-shopping fs-3"></i>
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

      {layerVisibleWishList && (
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
      )}
    </>
  );
}

export default NavBar;
