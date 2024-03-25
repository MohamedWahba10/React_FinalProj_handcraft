import { React, useEffect, useState } from "react";
import axios from 'axios';



export default function VendorOrderHistory() {


    let [vendororderHistory, setvendororderHistory] = useState([])


    const headers = {
        Authorization: `Token ${localStorage.getItem("userToken")}`
    };


    async function vendor_order_History() {

        let { data } = await axios.get(`http://127.0.0.1:8000/api/order/vendor/`,
            {
                headers: headers
            }).then((res) => res).catch((err) => err);

        console.log("vendororderHistory ==>", data);

        setvendororderHistory(data)
    }

    useEffect(() => {

        vendor_order_History()

    }, [])


    return (
        <div className="card border shadow-0">
            <div className="m-4">
                <div className="d-flex mb-2">
                    <h1 className="card-title mb-4 fas ms-2 " style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Orders</h1>
                </div>
                {/* Sample order history data */}
                {vendororderHistory.orders && vendororderHistory.orders.map((ele) => (


                    <div key={ele.order_id} className="bg-light p-4 shadow-lg mt-4">
                        <h3 className="ms-3">Order Details</h3>
                        <table className="table">
                            <thead>
                                <tr className="fs-5 text-center fs-sm-3">
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">customer name</th>
                                    <th scope="col"> email</th>
                                    <th scope="col"> phone</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">payment status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="fs-5 text-dark text-center fs-sm-3">
                                    <td>{ele.order_id}</td>
                                    <td>{ele.created_at}</td>
                                    <td>{ele.address}</td>
                                    <td>{ele.total_price}</td>
                                    <td>{ele.user.first_name} {ele.user.last_name}</td>
                                    <td style={{ fontSize: '1rem' }}>{ele.user.email}</td>
                                    <td>{ele.phone_number}</td>
                                    <td style={{ padding: '5px', borderRadius: '10px' }}>
                                        {ele.status === 'P' ?
                                            <span style={{ backgroundColor: 'lightgrey', padding: '0.5rem 1rem', borderRadius: '5px' }}>Pending</span> :
                                            ele.status === 'S' ?
                                                <span style={{ backgroundColor: 'lightblue', padding: '0.5rem 1rem', borderRadius: '5px' }}>Shipped</span> :
                                                ele.status === 'D' ?
                                                    <span style={{ backgroundColor: 'lightgreen', padding: '0.5rem 1rem', borderRadius: '5px' }}>Delivered</span> :
                                                    ele.status
                                        }
                                    </td>
                                    <td>{ele.payment_status}</td>
                                </tr>
                            </tbody>
                        </table>
                        {ele.products.map((item) => (
                            <div className="row gy-3 mb-4 mt-3 ms-5">
                                <div className="col-lg-5">
                                    <div className="me-lg-5">
                                        <div className="d-flex">
                                            <img src={item.product_image_thumbnail} className="border rounded me-3" style={{ width: '8rem', height: '8rem' }} alt="Product" />
                                            <div className="">
                                                <a href="#" className="nav-link fs-5"> <span className="fw-bold fs-5">Product name : </span>{item.product_name}</a>
                                                <p className="fs-5" > <span className="fw-bold fs-5">left on stock :</span> {item.stock}</p>
                                            </div> 
                                          
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                    <div>
                                        <p className="h6 mt-2 fs-5 "> <span className="fw-bold">Quantity: </span>{item.quantity} </p>
                                        <p className="fs-5"> <span className="fw-bold fs-5"> Price/item : </span>{item.product_price} $</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                ))}
            </div>
        </div>
    );
}
