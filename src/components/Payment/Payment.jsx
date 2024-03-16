import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./Payment.module.css";
import { Helmet } from 'react-helmet';
import { CartContext } from "../../Context/CartContext";


export default function Payment() {
    let [cartDetails, setcartDetails] = useState({})
    let { cartID, getCart } = useContext(CartContext)
    async function getcartDetails() {
        try {
            let { data } = await getCart()

            if (data) {
                setcartDetails(data)

            }
        } catch (error) {
            console.error("Error fetching cart details:", error);
        }
    }
    useEffect(() => {
        getcartDetails()

    }, [])
    return (
        <>
            <Helmet>
                <title>Payment</title>
            </Helmet>
            <div className={`row mt-5 shadow mx-3 ${styles.gradientCustom}`}>
                <div className="col-md-3">
                    <div className="text-center" style={{ marginTop: '50px', marginLeft: '10px' }}>
                        <i
                            id="animationDemo"
                            data-mdb-animation="slide-right"
                            data-mdb-toggle="animation"
                            data-mdb-animation-reset="true"
                            data-mdb-animation-start="onScroll"
                            data-mdb-animation-on-scroll="repeat"
                            className="fas fa-3x fa-shipping-fast text-black"
                        ></i>
                        <h3 className="mt-3 text-black">Welcome</h3>
                        <p className="white-text">You are 30 seconds away from completing your order!</p>
                    </div>
                    <div className="text-center mb-5">
                        <Link to="/cart" className="btn btn-black bg-black btn-rounded text-white back-button">Go back</Link>
                    </div>
                </div>
                {/* ------------------------------------------------------------------------------------------------------------------ ----------*/}





                <div className="col-lg-9">
                    <div className="card border shadow-0">
                        <div className="card-body">
                            <h2 className="card-title">Cart summary</h2>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p className="h4">Quantitiy:</p>
                                <p className="h4"> {cartDetails.total_items_count} </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="h4">Delivery:</p>
                                <p className="h4">10 $</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p className="h2">Total:</p>
                                <p className="h2">{cartDetails.total_items_price} $</p>
                            </div>
                            {cartID === undefined && <Navigate to="/checkout" />}
                            <form action={`http://127.0.0.1:8000/api/order/create-checkout-session/${cartID}/`} method="POST">
                                <div className="float-end">
                                    <button type="submit" className="btn btn-primary btn-rounded bg-black">Process payment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </>

    );
}








