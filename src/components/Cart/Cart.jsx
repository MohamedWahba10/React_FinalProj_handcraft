import React, { useContext, useEffect, useState } from 'react'
import styles from "./Cart.module.css";
import CartContext from '../../Context/CartContext';



export default function Cart() {

    let [cartDetails, setcartDetails] = useState({})

    // let { getcart, deleteCartProduct,updateCartProduct ,clearCart } = useContext(CartContext)

    // async function getcartDetails() {
    //     let {data} = await getcart()

    //     console.log(data);
    //     setcartDetails(data)
    // }


    // async function removeProduct(id) {
    //     let { data } = deleteCartProduct(id)
    //     setcartDetails(data)
    // }

    //  async function clearCart() {
    //     let { data } = clearCart()
    //     setcartDetails(data)
    // }

    // function updateProduct(id,count){

    //     let {data}= updateCartProduct(id,count)
    //      setcartDetails(data)
    // }

    // useEffect(() => {

    //     getcartDetails()

    // }, [])

    return (
        <>
            <div>


                {/* Cart + Summary */}
                <section className="bg-light my-5">
                    <div className="container">
                        {/* Cart items */}
                        <div className="row">
                            {/* Cart item 1 */}
                            <div className="col-lg-9">
                                <div className="card border shadow-0">
                                    <div className="m-4">
                                        <div className='d-flex mb-2'>
                                            <h4 className="card-title mb-4">Your shopping cart</h4>
                                            <div>
                                                <a href="" className="btn btn-light border text-light bg-danger icon-hover-danger ms-3">Clear All</a>
                                            </div>

                                        </div>

                                        {/* Cart item details */}
                                        <div className="row gy-3 mb-4 mt-3">
                                            {/* Cart item image */}
                                            <div className="col-lg-5">
                                                <div className="me-lg-5">
                                                    <div className="d-flex">
                                                        <img src={require("../../assets/images/mainSlider/image5.jpg")} className="border rounded me-3" style={{ width: '96px', height: '96px' }} alt="Product" />
                                                        <div className="">
                                                            <a href="#" className="nav-link">Winter jacket for men and lady</a>
                                                            <p className="text-muted">Yellow, Jeans</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Cart item quantity and price */}
                                            <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                                <div className="me-4 d-flex">
                                                    <div><button className="btn btn-outline-secondary me-2" >-</button></div>
                                                    <div className='mt-1'>    <span >5</span></div>
                                                    <div>   <button className="btn btn-outline-secondary ms-2" >+</button></div>
                                                </div>
                                                <div>
                                                    <p className="h6 mt-2"> $460.00 / per item </p>

                                                </div>
                                            </div>

                                            {/* Cart item actions */}
                                            <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                <div className="float-md-end">
                                                    <a href="#!" className="btn btn-light border px-2 icon-hover-primary"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></a>
                                                    <a href="#" className="btn btn-light border text-danger icon-hover-danger ms-3"> Remove</a>
                                                </div>
                                            </div>
                                        </div>

                                    

                                      




                                        {/* Cart item details */}
                                        {/* Repeat for other cart items */}
                                    </div>
                                    {/* Cart total and shipping details */}
                                    <div className="border-top pt-4 mx-4 mb-4">

                                        <div className="d-flex justify-content-between">
                                            <p className="h5">Total: <span className="text-primary">$1156.00</span></p>
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
                                            <p className="h6"> 4 </p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="h6">Delivery:</p>
                                            <p className="h6">Free</p>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <p className="h5">Total:</p>
                                            <p className="h5">$1156.00</p>
                                        </div>
                                        <a href="/checkout" className="btn text-light bg-dark mt-3">Proceed to checkout</a>
                                    </div>
                                </div>
                            </div>
                            {/* Cart summary */}
                        </div>
                        {/* Cart items */}
                    </div>
                </section>
                {/* Cart + Summary */}
            </div>
        </>
    )
}
