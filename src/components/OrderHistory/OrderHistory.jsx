import { React, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";



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

  async function isDelivered(order_id) {
    let { data } = await axios.put(`http://127.0.0.1:8000/api/order/delivered_order/${order_id}/`, {}, {
      headers: headers
    }).then((res) => res).catch((err) => err);
    order_History()
    console.log("isDelivered ===>", data);
  }

  async function cancelOrder(order_id) {
    let { data } = await axios.put(`http://127.0.0.1:8000/api/order/delete_order/${order_id}/`, {}, {
      headers: headers
    }).then((res) => res).catch((err) => err);
    order_History()
    console.log("cancelOrder ===>", data);
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
                          ele.status === 'C' ?
                            <span style={{ backgroundColor: 'lightcoral', padding: '0.5rem 1rem', borderRadius: '5px' }}>Canceled</span> :
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

                      <img src={`http://localhost:8000${item.product_image_thumbnail}`} className="border rounded me-3" style={{ width: '8rem', height: '8rem' }} alt="Product" />
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
                <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                  {ele.status === 'D' ? (
                    <Link
                      key={item.item_id}
                      to={`/rateProduct/${item.item_id}/${item.product_name}`}
                    >
                      <button
                        className={`btn btn-light border text-light bg-dark icon-hover-danger ms-5`}
                      >
                        Rate
                      </button>
                    </Link>
                  ) : (
                    <Link
                      key={item.item_id}
                      to={`/rateProduct/${item.item_id}/${item.product_name}`}
                    >
                      <button
                        className={`btn btn-light border text-light bg-dark icon-hover-danger d-none ms-5`}
                      >
                        Rate
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))}

            <hr />
            <button
              onClick={() => cancelOrder(ele.order_id)}
              className="btn btn-light border text-light bg-danger icon-hover-danger ms-5"
              disabled={ele.status === 'D' || ele.status === 'S'}
            >
              Cancel Order
            </button>
            <button onClick={() => isDelivered(ele.order_id)} className="btn btn-light border text-light bg-success icon-hover-danger ms-5">Dilevered</button>



          </div>

        ))}

      </div>
    </div>
  );
}

