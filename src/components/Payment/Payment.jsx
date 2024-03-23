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
                <div className="col-md-3 col-lg-7">
                    <div className="text-center" style={{ marginTop: '50px', marginLeft: '10px' }}>
                        <i
                            id="animationDemo"
                            data-mdb-animation="slide-right"
                            data-mdb-toggle="animation"
                            data-mdb-animation-reset="true"
                            data-mdb-animation-start="onScroll"
                            data-mdb-animation-on-scroll="repeat"
                            className="fas fa-5x fa-shipping-fast text-black" // Increased the size of the icon
                        ></i>
                        <h3 className="mt-3 text-black" style={{ fontSize: '2rem' }}>Welcome</h3> {/* Increased the font size of the heading */}
                        <p className="white-text" style={{ fontSize: '1.5rem' }}>You are 30 seconds away from completing your order!</p> {/* Increased the font size of the text */}
                    </div>
                    <div className="text-center mb-5">
                        <Link to="/cart" className="btn btn-black bg-black btn-rounded text-white back-button">Go back</Link>
                    </div>
                </div>
    
                <div className="col-lg-4">
                    <div className="card border shadow-0">
                        <div className="card-body">
                            <h2 className="card-title">Cart summary</h2>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="h4 m-0">Quantity:</p>
                                <p className="h4 m-0">{cartDetails.total_items_count}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="h4 m-0">Delivery:</p>
                                <p className="h4 m-0">10 $</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="h2 m-0">Total:</p>
                                <p className="h2 m-0 text-primary">{cartDetails.total_items_price} $</p>
                            </div>
                           
                        </div>
                        
                    </div>
                    {cartID === undefined && <Navigate to="/checkout" />}
                            <form action={`http://127.0.0.1:8000/api/order/create-checkout-session/${cartID}/`} method="POST">
                                <div className="float-end mt-3 mb-3">
                                    <button type="submit" className="btn btn-primary btn-rounded bg-black">Process payment</button>
                                </div>
                            </form>
                </div>
            </div>
        </>
    );
    
}








