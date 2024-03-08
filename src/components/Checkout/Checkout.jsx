import React from 'react';
import styles from "./Checkout.module.css";


const Checkout = () => {
  return (
    <>
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
            <button type="submit" className="btn btn-black bg-black btn-rounded text-white back-button">Go back</button>
          </div>
        </div>
        <div className="col-md-9 justify-content-center">
          <div className={`card ${styles.cardCustom} pb-4`}>
            <div className="card-body mt-0 mx-5">
              <div className="text-center mb-3 pb-2 mt-3">
                <h4 style={{ color: '#495057' }}>Delivery Details</h4>
              </div>
              <form className="mb-0">
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input type="text" id="form9Example1" className="form-control input-custom" />
                      <label className="form-label" htmlFor="form9Example1">First name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input type="text" id="form9Example2" className="form-control input-custom" />
                      <label className="form-label" htmlFor="form9Example2">Last name</label>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input type="text" id="form9Example3" className="form-control input-custom" />
                      <label className="form-label" htmlFor="form9Example3">City</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input type="text" id="form9Example4" className="form-control input-custom" />
                      <label className="form-label" htmlFor="form9Example4">phone</label>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input type="text" id="form9Example6" className="form-control input-custom" />
                      <label className="form-label" htmlFor="form9Example6">Address</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input type="email" id="typeEmail" className="form-control input-custom" />
                      <label className="form-label" htmlFor="typeEmail">Email</label>
                    </div>
                  </div>
                </div>
                <div className="float-end">
                  <button type="submit" className="btn btn-primary btn-rounded" style={{ backgroundColor: '#0062CC' }}>Place order</button>
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
