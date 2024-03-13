import React, { useContext, useEffect, useState } from 'react'
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";



export default function Cart() {


    let [cartDetails, setcartDetails] = useState({})

    let { getCart, deleteCartProduct, increaseCartProduct, decreaseCartProduct, clearCart } = useContext(CartContext)


    async function getcartDetails() {
        let { data } = await getCart()

        console.log(data);
        setcartDetails(data)
    }

    async function removeProduct(id, e) {
        e.preventDefault();
        let { data } = await deleteCartProduct(id)
        console.log("remove my prod", data);
        setcartDetails(data)
        getcartDetails()
    }
    async function clearallCart(e) {
        e.preventDefault();
        let { data } = await clearCart()
        setcartDetails(data)
        getcartDetails()
    }
    async function increase(id, e) {
        e.preventDefault();
        let data = await increaseCartProduct(id);
        console.log("increase,", data);
        setcartDetails(data);
        getcartDetails();
    }
    
    async function decrease(id, e) {
        e.preventDefault();
        let { data } = await decreaseCartProduct(id);
        setcartDetails(data);
        getcartDetails();
    }
    
    
    
    // function updateProduct(id,count){
    //     let {data}= updateCartProduct(id,count)
    //      setcartDetails(data)
    // }

    useEffect(() => {

        getcartDetails()

    }, [])

    return (
        <>
            <div>


                {cartDetails ? <section className="bg-light my-5">
                    <div className="container">

                        <div className="row">

                            <div className="col-lg-9">
                                <div className="card border shadow-0">
                                    <div className="m-4">
                                        <div className='d-flex mb-2'>
                                            <h4 className="card-title mb-4">Your shopping cart</h4>
                                            <div>
                                            <button onClick={(e) => clearallCart(e)} type="button" className="btn btn-light border text-danger bg-light icon-hover-danger ms-3">Clear All</button>

                                            </div>

                                        </div>

                                        {cartDetails.cart_items && cartDetails.cart_items.map((ele) => <div className="row gy-3 mb-4 mt-3">

                                            <div className="col-lg-5">
                                                <div className="me-lg-5">
                                                    <div className="d-flex">
                                                        <img src={ele.item_image} className="border rounded me-3" style={{ width: '96px', height: '96px' }} alt="Product" />
                                                        <div className="">
                                                            <a href="#" className="nav-link">{ele.item_name}</a>
                                                            <p className="text-muted"><span className='fw-bold'>Description :</span> {ele.item_description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Cart item quantity and price */}
                                            <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                                <div className="me-4 d-flex">
                                                    <div><button onClick={(e) => decrease(ele.id, e)} className="btn btn-outline-secondary me-2">-</button></div>
                                                    <div className='mt-1'><span>{ele.quantity}</span></div>
                                                    <div><button onClick={(e) => increase(ele.id, e)} className="btn btn-outline-secondary ms-2">+</button></div>
                                                </div>

                                                <div>
                                                    <p className="h6 mt-2"> {ele.item_price} EGP/ per item </p>

                                                </div>
                                            </div>

                                            {/* Cart item actions */}
                                            <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                <div className="float-md-end">
                                                    <button className="btn btn-light border px-2 icon-hover-primary"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></button>
                                                    <button onClick={(e) => removeProduct(ele.id, e)} className="btn btn-light border text-danger icon-hover-danger ms-3">Remove</button>
                                                </div>
                                            </div>

                                        </div>)}









                                        {/* Cart item details */}
                                        {/* Repeat for other cart items */}
                                    </div>
                                    {/* Cart total and shipping details */}
                                    <div className="border-top pt-4 mx-4 mb-4">

                                        <div className="d-flex justify-content-between">
                                            <p className="h5">Total: <span className="text-primary">{cartDetails.total_items_price} EGP</span></p>
                                            <a href="checkout" className="btn text-light bg-dark "> Proceed to checkout</a>
                                        </div>
                                    </div>
                                    {/* Cart total and shipping details */}
                                </div>
                            </div>
                            {/* Cart item 1 */}

                            {/* Cart summary */}
                            <div className="col-lg-3">
                                <div className="card border shadow-0">
                                    <div className="card-body">
                                        <h6 className="card-title">Cart summary</h6>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <p className="h6">Quantitiy:</p>
                                            <p className="h6"> {cartDetails.total_items_count} </p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="h6">Delivery:</p>
                                            <p className="h6">50 EGP</p>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <p className="h5">Total:</p>
                                            <p className="h5">{cartDetails.total_items_price} EGP</p>
                                        </div>
                                        <a href="/checkout" className="btn text-light bg-dark mt-3">Proceed to checkout</a>
                                    </div>
                                </div>
                            </div>
                            {/* Cart summary */}
                        </div>
                        {/* Cart items */}
                    </div>
                </section> : <Loading />}


            </div>
        </>
    )
}
