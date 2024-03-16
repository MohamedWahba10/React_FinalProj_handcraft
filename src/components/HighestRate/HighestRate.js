import React, { useState, useEffect, useContext } from "react";
import styles from "./HighestRate.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";
import { CartContext } from "../../Context/CartContext";

export default function HighestRate() {
    const [dataUser, setData] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    async function ProfileData() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("userToken")}`,
                },
            });
            console.log("response", response);
            setUserLoading(false);
            setData(response);
        } catch (error) {
            console.error("Failed to fetch profile data", error);
        }
    }

    useEffect(() => {
        ProfileData();
    }, []);
    const imageUrl = dataUser?.data.message.imageUrl;
    const userType = dataUser?.data.message.usertype;
    const userData = dataUser?.data?.message;
    console.log("userData", userData);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const { data, isLoading, isFetched } = useQuery({
        queryKey: "products",
        queryFn: getProduct,
    });

    // -------------------------- product Name --------------------------
    const [searchQuery, setSearchQuery] = useState("");

    // // -------categoryyyyyyyyyyyyy Name -----------------------------------
    const [searchQueryCategory, setSearchQueryCategory] = useState("");

    const [searchVendorShopName, setSearchVendorShopName] = useState("");

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const filterByPrice = (product) => {
        if (minPrice && maxPrice) {
            return (
                product.product.prodPrice >= parseInt(minPrice) &&
                product.product.prodPrice <= parseInt(maxPrice)
            );
        } else if (minPrice) {
            return product.product.prodPrice >= parseInt(minPrice);
        } else if (maxPrice) {
            return product.product.prodPrice <= parseInt(maxPrice);
        }
        return true;
    };

    // ////////////////////////////////

    const [highestData, setHighestData] = useState([]);

    const [isLoadingHighestData, setIsLoadingHighestData] = useState(true)
    // //////////////////////////////////////////////////////////////////////////////////
    async function getProduct() {
        setIsLoadingHighestData(true)
        let response = await axios.get(`http://127.0.0.1:8000/api/product/top_rating/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("userToken")}`,
            },
        });
        setIsLoadingHighestData(false)
        setHighestData(response?.data?.top_rated_products)
        console.log("heighestRate.........................", response)
        return response;
    }
    const handleAddToCartClick = (e) => {
        e.preventDefault();
    };
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

    let { addToCart } = useContext(CartContext);

    async function addcart(id) {
        let res = await addToCart(id);
        console.log("heloo add to cart ", res);
        if (res.data.msg === "added") {
            toast.success("product added Successfully");
        } else {
        }
    }

    return (
        <>
            {/* --------------------------------------------------------------------------------------- */}

            {isLoading && isLoadingHighestData ? (
                <Loading />
            ) : (
                <>
                    <div className={`${styles.Section_new}`}>
                        <div className="container py-3">

                            <div className="row gy-5">
                                {highestData ? (

                                    <>
                                        <h1 className={`${styles.sales_product_word}`}>
                                            HIGHEST PRODUCT RATE
                                        </h1>
                                        {highestData?.map((pro) => (
                                            <div
                                                key={pro.product_id}
                                                className={`col-md-4 cursor-pointer`}
                                            >
                                                <div className={` ${styles.product}`}>
                                                    <div
                                                        className={`${styles.product_info} ${styles.product} w-100`}
                                                    >
                                                        <img
                                                            src={`${pro.prodImageUrl}`}
                                                            className="w-100"
                                                            alt={pro.product_name}
                                                        />
                                                        <Link
                                                            to={`/detail/${pro.product_id}`}
                                                            className="text-decoration-none text-dark"
                                                        >
                                                            <div
                                                                className={`${styles.above_layer}  p-3 d-flex  justify-content-between align-items-start  `}
                                                            >
                                                                {pro.prodOnSale ? (
                                                                    <span className={`${styles.sale_product}`}>
                                                                        Sales
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className={`px-2 `}>
                                                        <h4 className={`pb-1 pt-2 ${styles.pro_name}`}>
                                                            {pro.product_name}
                                                        </h4>
                                                        <div className="d-flex justify-content-between align-content-center">
                                                            {/* <h5 className="pb-1">
  {pro.prodSubCategory.subCateName}
</h5> */}
                                                        </div>
                                                        <div>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p>
                                                                    <i className="fa-solid fa-star text-warning pe-2 fs-4"></i>
                                                                    <span className="fs-4">{pro.average_rating}</span>
                                                                </p>

                                                                <p className="fs-5">
                                                                    {pro.product_price} EGP
                                                                </p>




                                                            </div>
                                                        </div>
                                                        <p>
                                                            {pro.prodDescription}
                                                        </p>
                                                        <div className="my-2">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    {userType === "vendor" ? null : (
                                                                        <div onClick={handleAddToCartClick}>
                                                                            {dataFavorite?.find(
                                                                                (favProduct) =>
                                                                                    favProduct.id === pro.product_id
                                                                            ) ? (
                                                                                <div
                                                                                    className={`${styles.wish_list} bg-danger`}
                                                                                    onClick={() =>
                                                                                        deletefavorite(pro.product_id)
                                                                                    }
                                                                                >
                                                                                    <i className="fa-regular fa-heart text-white"></i>
                                                                                </div>
                                                                            ) : (
                                                                                <div
                                                                                    className={`${styles.wish_list} `}
                                                                                    onClick={() =>
                                                                                        addfavorite(pro.product_id)
                                                                                    }
                                                                                >
                                                                                    <i className="fa-regular fa-heart "></i>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    {userType === "vendor" ? null : (
                                                                        <div onClick={handleAddToCartClick}>
                                                                            <button
                                                                                className={`${styles.button_style} ${styles.cart}`}
                                                                                onClick={() => addcart(pro.product_id)}
                                                                            >
                                                                                <i className="fa-solid fa-cart-shopping cart"></i>
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )
                                    : null}

                            </div>
                        </div>
                    </div>

                </>

            )}
        </>
    );
}

