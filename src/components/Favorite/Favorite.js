import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./Favorite.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { FavoriteContext } from "../../Context/FavoriteContext";
import FavoriteUser from "../FavoriteUser/FavoriteUser";
import { Helmet } from "react-helmet";

export default function Favorite() {

    return (
        <>
         <Helmet>
            Favorite
         </Helmet>
                <>
                    <div className={`${styles.header_product} py-5 mb-5 text-center `}>
                        <h1>Favorite</h1>

                        <Link to="/" className="text-decoration-none ">
                            <span className={`${styles.link_home} pe-1 `}>HomePage</span>
                        </Link>

                        <span className={`${styles.span_profile}`}>&gt;Favorite</span>
                    </div>
           
                    <FavoriteUser />
                </>
        </>
    );
}
