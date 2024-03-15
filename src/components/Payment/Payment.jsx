import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
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
                    <div className="text-center">
                        <Link to="/cart" className="btn btn-black bg-black btn-rounded text-white back-button">Go back</Link>
                    </div>
                </div>
                {/* ------------------------------------------------------------------------------------------------------------------ ----------*/}


                {cartDetails.cart_items && cartDetails.cart_items.map((ele) => (

                    <div className="row gy-3 col-lg-8 mx-auto mb-4 mt-3 col-md-6">
                        <div className="card border shadow-0">
                            <div className="text-center fs-3 pb-2 mt-3 ">
                                <h4 style={{ color: '#495057' }}>Cart summary</h4>
                            </div>
                            <hr />
                            <div className="col-lg-12 d-flex justify-content-between ">
                                <div className=" ms-3 d-flex align-items-center">
                                    <img src={ele.item_image} className="border rounded me-3" style={{ width: '10rem', height: '10rem' }} alt="Product" />
                                    <div>
                                        <p href="#" className="h3 ">{ele.item_name}</p>
                                        <p className="h6 text-muted"><span className='fw-bold'>Description:</span> {ele.item_description}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="h5 mt-2">{ele.item_price} <span className='h6'>  EGP/ per item</span> </p>
                                </div>
                            </div>


                            <div className="card-body">

                                <div className="d-flex justify-content-between">
                                    <p className="h5">Quantitiy:</p>
                                    <p className="h5"> {cartDetails.total_items_count} </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="h5">Delivery:</p>
                                    <p className="h5">50 EGP</p>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <p className="h4">Total:</p>
                                    <p className="h4">{cartDetails.total_items_price} EGP</p>
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
                ))}















            </div>
        </>

    );
}
