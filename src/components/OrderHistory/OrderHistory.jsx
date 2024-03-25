import {  React, useEffect, useState } from "react";
import axios from 'axios';
import { BsClockHistory } from 'react-icons/bs';


export default function OrderHistory() {

  let [orderHistory, setorderHistory] = useState([])

  const headers = {
    Authorization: `Token ${localStorage.getItem("userToken")}`
  };


  async function order_History() {

    let { data } = await axios.get(`http://127.0.0.1:8000/api/order/customer/`,
      {
        headers: headers
      }).then((res) => res).catch((err) => err);

    console.log("order history ==>", data);
    setorderHistory(data)
  }


  useEffect(() => {
    order_History()
  }, [])                                   

  return (
    <div className="card border shadow-0">
      <div className="m-4">
        <div className="d-flex mb-2">
          <h1 className="card-title mb-4 fas ms-2 " style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Orders History</h1>
        </div>
        {orderHistory.orders && orderHistory.orders.map((ele) => (
          <div key={ele.order_id} className="bg-light p-4 shadow-lg mt-4">
            <table className="table">
              <thead>
                <tr className="fs-5 text-center fs-sm-3">
                <th scope="col">Order ID</th>
                  <th scope="col">Created</th>
                  <th scope="col">Address</th>
                  <th scope="col">Total Price</th>


                  <th scope="col">Status</th>

                </tr>
              </thead>
              <tbody>
                <tr className="fs-5 text-dark text-center fs-sm-3">
                  <td>{ele.order_id}</td>
                  <td>{ele.created_at}</td>
                  <td>{ele.address}</td>
                  <td>{ele.total_price} $</td>


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
                </tr>
              </tbody>
            </table>
            {ele.order_items.map((item) => (
              <div key={item.id} className="row gy-3 mb-4 mt-3 ms-5">
                <div className="col-lg-5">
                  <div className="me-lg-5">
                    <div className="d-flex">
                      <img src={item.product_image_thumbnail} className="border rounded me-3" style={{ width: '8rem', height: '8rem' }} alt="Product" />
                      <div className="">
                        <a href="#" className="nav-link fs-5"> <span className="fw-bold fs-5">Product name :</span> {item.product_name}</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">

                  <div>
                    <p className="h6 mt-2 fs-5 "> <span className="fw-bold">Quantity: </span>{item.quantity} </p>
                    <p className="fs-5"> <span className="fw-bold fs-5"> Price/item : </span> {item.product_price} $</p>
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
