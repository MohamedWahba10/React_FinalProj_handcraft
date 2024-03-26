import { React, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";



export default function AdminOrder() {

  let [AdminOrder, setAdminOrder] = useState([])




  async function Admin_Order() {

    let { data } = await axios.get(`http://127.0.0.1:8000/api/panel/get_orders/`,
    ).then((res) => res).catch((err) => err);

    console.log("order Admin_ ==>", data);

    setAdminOrder(data)
  }

  async function shipping_admin(order_id) {
    let { data } = await axios.put(` http://127.0.0.1:8000/api/panel/shipped_order/${order_id}/`, {},
    ).then((res) => res).catch((err) => err);
    Admin_Order()

    console.log("shipping_admin ===>", data);
  }


  useEffect(() => {

    Admin_Order()

  }, [])

  return (
    <div className="card bg-transparent mx-5 border-0">
      <div className="m-4">
        <div className="d-flex mb-2">
          <h1 className="card-title mb-4 fas ms-2 " style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Orders </h1>
        </div>
        {AdminOrder.orders && AdminOrder.orders.map((ele) => (
          <div key={ele.order_id} className=" p-4 shadow-lg mt-4 bg-light">
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

            {ele.products?.map((item) => (
              <div key={item.id} className="row gy-3 mb-4 mt-3 ms-5">
                <div className="col-lg-5">
                  <div className="me-lg-5">
                    <div className="d-flex">


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

            <hr />
            <button
              onClick={() => shipping_admin(ele.order_id)}

              className="btn btn-light border text-light bg-success icon-hover-danger ms-5"
              disabled={ele.status === 'D' || ele.status === 'S'}
            >
              shipping
            </button>




          </div>

        ))}

      </div>
    </div>
  );
}

