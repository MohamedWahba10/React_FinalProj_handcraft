import React, { useEffect, useState, useContext } from 'react';
import styles from "./Checkout.module.css";
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";
import Payment from '../Payment/Payment';

const Checkout = () => {

    let [cartDetails, setcartDetails] = useState({})
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    let { getCart, order } = useContext(CartContext)
    let [cartID, setcartID] = useState()

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

    async function payment(values) {
        await order(values);
        navigate("/payment");
    }
    
    // async function order(values) {
    //     let data = await axios.post(`http://127.0.0.1:8000/api/order/new/`, values, {
    //         headers: headers
    //     }).then((res) => res).catch((err) => err);

    //     console.log("=>>>", data.data.id);
    //     setcartID(data.data.id) 

    // }

    let validationSchema = Yup.object({
        phone_number: Yup.string().matches(/^(011|010|012|015)\d{8}$/, "Phone number is invalid").required('Required'),
        address: Yup.string().required('Required')
    });

    const formik = useFormik({
        initialValues: {
            phone_number: '',
            address: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => payment(values)
    });

    // useEffect(() => {
    //     getcartDetails()

    // }, [])
    return (
        <>
            <Helmet>
                <title>Checkout</title>
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
                <div className="col-md-9 justify-content-center">
                    <div className={`card ${styles.cardCustom} pb-4`}>
                        <div className="card-body mt-0 mx-5">
                            <div className="text-center mb-3 pb-2 mt-3">
                                <h4 style={{ color: '#495057' }}>Delivery Details</h4>
                            </div>
                            <form onSubmit={formik.handleSubmit} className="mb-0" action={``}
                                method="POST">
                                <div className="row mb-4"></div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="input-group form-outline">
                                            <span className="input-group-text"><i className="fas fa-phone"></i></span>
                                            <input
                                                type="text"
                                                id="phone_number"
                                                name="phone_number"
                                                className="form-control input-custom"
                                                placeholder="Phone"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.phone_number}
                                            />
                                        </div>
                                        {formik.touched.phone_number && formik.errors.phone_number ? (
                                            <div className="text-danger fs-5 mt-3">{formik.errors.phone_number}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="input-group form-outline">
                                            <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                className="form-control input-custom"
                                                placeholder="Address"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.address}
                                            />
                                        </div>
                                        {formik.touched.address && formik.errors.address ? (
                                            <div className="text-danger fs-5 mt-3">{formik.errors.address}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="float-end">
                                    <button type="submit" className="btn btn-primary btn-rounded bg-black">Place order</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
          
        </>
    );
};

export default Checkout;
