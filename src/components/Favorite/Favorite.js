import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./Favorite.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";

export default function Favorite() {
    let { addToCart } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(true);
    let { deleteFavoriteProduct, getFavorite } =
        useContext(FavoriteContext);


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
        setIsLoading(true)
        try {

            let res = await getFavorite();
            console.log("hello all to favorite", res);
            setDataFavorite(res?.data?.favorite_products);
            console.log("dataFavoeite", dataFavorite);
            setIsLoading(false)
        } catch (error) {
            console.error("Error while fetching favorite:", error);
        }
    }
    useEffect(() => {
        getfavorite();
    }, []);

    async function addcart(id) {
        let res = await addToCart(id);
        console.log("heloo add to cart ", res);
        if (res.data.msg === "added") {
            toast.success("product added Successfully");
        } else {
        }
    }


    // --------------- userData ------------------------
    const [dataUser, setData] = useState(null);

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
                        <h1>Favorite</h1>

                        <Link to="/" className="text-decoration-none ">
                            <span className={`${styles.link_home} pe-1 `}>HomePage</span>
                        </Link>

                        <span className={`${styles.span_profile}`}>&gt;Favorite</span>
                    </div>
                    <div className="container mb-5 pb-5 overflow-hidden">
                        <div className="row gy-5">
                            {dataFavorite?.map((pro) => (
                                <div key={pro.id} className="col-md-3 cursor-pointer">
                                    <div className="product py-3 px-2">
                                        <div className={`${styles.product_info}`}>
                                            <img
                                                src={`${pro.prodImageUrl}`}
                                                className="w-100"
                                                alt={pro.name}
                                            />

                                            <Link
                                                to={`/detail/${pro.id}`}
                                                className="text-decoration-none text-dark"
                                            >
                                                <div
                                                    className={`${styles.above_layer} p-3 d-flex flex-column justify-content-between `}
                                                >
                                                    <div className="d-flex justify-content-end">
                                                        {userType === "vendor" ? null : (
                                                            <div onClick={handleAddToCartClick}>

                                                                <div
                                                                    className={`${styles.wish_list} bg-danger`}
                                                                    onClick={() =>
                                                                        deletefavorite(pro.id)
                                                                    }
                                                                >
                                                                    <i className="fa-regular fa-heart text-white"></i>
                                                                </div>

                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <button className={`${styles.button_style}`}>
                                                            QUICK VIEW
                                                        </button>
                                                        {userType === "vendor" ? null : (
                                                            <div onClick={handleAddToCartClick}>
                                                                <button
                                                                    className={`${styles.button_style}`}
                                                                    onClick={() => addcart(pro.id)}
                                                                >
                                                                    ADD TO CART
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                        <h4 className="pb-2 pt-2">{pro.name}</h4>
                                        <p>{pro.price} EGP</p>
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
