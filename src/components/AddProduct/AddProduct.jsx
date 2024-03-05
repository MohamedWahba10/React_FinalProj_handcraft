import React, { useContext, useState } from "react";
import styles from "./AddProduct.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { TokenContext } from "../../Context/Token";

export default function AddProduct() {
  const [isLoading, setisLoading] = useState(false);
  //   const [error, setError] = useState("");
  let navigate = useNavigate();
  let { setToken, setUserData } = useContext(TokenContext);
  //   async function callAddProduct(reqBody) {
  //     setError("");
  //     setisLoading(true);
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:8000/api/AddProduct/`,
  //         reqBody
  //       );

  //       if (response.status === 200) {
  //         const token = response.data.token;

  //         if (response.data.message == "success" && token && token.length > 0) {
  //           navigate("/");
  //           setisLoading(false);
  //           localStorage.setItem("userToken", token);
  //           localStorage.setItem("userData", JSON.stringify(response.data.user));

  //           // localStorage.setItem("userData", response.data.user);
  //           setToken(token);
  //           setUserData(response.data.user);
  //         } else {
  //           console.log("data", response.data.message);
  //         }
  //       } else {
  //         console.log("Unexpected response status:", response.status);
  //       }
  //     } catch (error) {
  //       setError(error.response.data.detail);
  //       setisLoading(false);
  //       console.error("Error during AddProduct:", error.response.data.detail);
  //     }
  //   }

  const validationSchema = Yup.object({
    prodName: Yup.string()
      .matches(/^[a-zA-Z]{3,10}$/, "product Name must be from 3 to 10 letters")
      .required("Required"),
    prodPrice: Yup.string().matches(
        /^[1-9][0-9]{4}$/,
        "'product Price must be only digits'"
      )
      .required("product Price is Required"),
      prodQuantity: Yup.string().matches(
        /^[1-9][0-9]{3}$/,
        "'product Quantity must be only digits'"
      )
      .required("product Quantity is Required"),
  });

  const AddProductForm = useFormik({
    initialValues: {
      prodName: "",
      prodPrice: "",
      prodQuantity:"",
      prodSubCategory:"",
    },
    validationSchema,
    // onSubmit: callAddProduct,
  });

  return (
    <>
      <Helmet>
        <title>AddProduct</title>
      </Helmet>
      <div className={`${styles.header_AddProduct} py-5 mb-5 text-center `}>
        <h1>Add Product</h1>

        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>

        <span className={`${styles.span_AddProduct}`}>&gt; Add Product</span>
      </div>
      <div className="container my-5 py-5">
        <div>
          <div className={`${styles.form_AddProduct}`}>
            {/* {error ? <div className="alert alert-danger"> {error}</div> : ""} */}
            {/* <form onSubmit={AddProductForm.handleSubmit}> */}
            <form>
              <div className="row gy-4">
                <div className="col-md-6">
                  <div className="form-group">
                  <label htmlFor="prodName" className="fs-4 fw-bold">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-100"
                      id="prodName"
                      value={AddProductForm.values.prodName}
                      name="prodName"
                      placeholder="Enter The Product Name"
                      onChange={AddProductForm.handleChange}
                      onBlur={AddProductForm.handleBlur}
                    />
                    {AddProductForm.errors.prodName &&
                    AddProductForm.touched.prodName ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                  <label htmlFor="prodPrice" className="fs-4 fw-bold">
                      Product Price
                    </label>
                    <input
                      type="number"
                      className="w-100 "
                      id="prodPrice"
                      value={AddProductForm.values.prodPrice}
                      name="prodPrice"
                      placeholder="Enter The Product Price"
                      onChange={AddProductForm.handleChange}
                      onBlur={AddProductForm.handleBlur}
                    />
                    {AddProductForm.errors.prodPrice &&
                    AddProductForm.touched.prodPrice ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodPrice}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                  <label htmlFor="prodQuantity" className="fs-4 fw-bold">
                      Product Quantity
                    </label>
                    <input
                      type="number"
                      className="w-100 "
                      id="prodQuantity"
                      value={AddProductForm.values.prodQuantity}
                      name="prodPrice"
                      placeholder="Enter The Product Quantity"
                      onChange={AddProductForm.handleChange}
                      onBlur={AddProductForm.handleBlur}
                    />
                    {AddProductForm.errors.prodQuantity &&
                    AddProductForm.touched.prodQuantity ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodQuantity}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                  <label htmlFor="prodSubCategory" className="fs-4 fw-bold">
                      Product Category
                    </label>
                    <input
                      type="number"
                      className="w-100 "
                      id="prodSubCategory"
                      value={AddProductForm.values.prodSubCategory}
                      name="prodSubCategory"
                      placeholder="Enter The Product Category"
                      onChange={AddProductForm.handleChange}
                      onBlur={AddProductForm.handleBlur}
                    />
                    {AddProductForm.errors.prodSubCategory &&
                    AddProductForm.touched.prodSubCategory ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodSubCategory}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className={`d-flex justify-content-between my-3`}>
                {isLoading ? (
                  <button
                    type="submit"
                    className={`${styles.AddProduct_button}`}
                  >
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`${styles.AddProduct_button}`}
                    disabled={!(AddProductForm.isValid && AddProductForm.dirty)}
                  >
                    Add Product
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
