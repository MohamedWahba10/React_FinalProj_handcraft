import React, { useContext, useState } from "react";
import styles from "./Rating.module.css";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";

import toast from "react-hot-toast";
export default function RatingProduct() {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const { id ,prodName} = useParams();

  let navigate = useNavigate();
  //   let { setToken, setUserData } = useContext(TokenContext);
  async function callRatingProduct(reqBody) {
    setError("");
    setisLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/product/submit_review/${id}/`,
        reqBody,{
            headers: {
                Authorization: `Token ${localStorage.getItem("userToken")}`,
              },
        }
      );

      if (response?.data?.Message==="Product Rate was added succesfully"||response?.data?.Message==="Product Rate was Updated") {
        navigate(`/comment/${id}/${prodName}`);
        setisLoading(false);
        toast.success(response.data.Message);
      } else {
        setError(response.data.message);
        console.log("data", response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
      setisLoading(false);
      console.error("Error during Rate:", error);
    }
  }

  const validationSchema = Yup.object({
    rateRating: Yup.string()
      .matches(
        /^[1-5]$/,
        "'product Rating must be only digits and range from 1 to 5'"
      )
      .required("Product Stock is Required"),
    rateSubject: Yup.string().matches(
      /^(?!\s)(?!.*\s$)[a-zA-Z0-9\s]{3,800}$/,
      "Subject Rate must be from 3 to 35 letters"
    ),
    rateReview: Yup.string().matches(
        /^(?!\s)(?!.*\s$)[a-zA-Z0-9\s]{3,2000}$/,
      "product Commint  must be from 3 to 2000 letters cannot special charcter"
    ),
  });

  const RatingForm = useFormik({
    initialValues: {
      rateRating: "",
      rateSubject: "",
      rateReview: "",
    },
    validationSchema,
    onSubmit: callRatingProduct,
  });

  return (
    <>
      <Helmet>
        <title>Rating</title>
      </Helmet>
      <div className={`${styles.header_login} py-5 mb-5 text-center `}>
        <h1>Rating Product {prodName}</h1>

        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>

        <span className={`${styles.span_login}`}>/ Rating</span>
      </div>
      <div className="container my-5 py-5">
        <div className="row gy-5">
          <div className={`col-md-6 ${styles.form_login}`}>
            <h2>Rating The Product</h2>
            {error ? <div className="alert alert-danger"> {error}</div> : ""}
            <form onSubmit={RatingForm.handleSubmit}>
              <div className="form-group my-3">
                <input
                  type="number"
                  className="w-100"
                  id="rateRating"
                  value={RatingForm.values.rateRating}
                  name="rateRating"
                  placeholder="Enter The Subject the product"
                  onChange={RatingForm.handleChange}
                  onBlur={RatingForm.handleBlur}
                />
                {RatingForm.errors.rateRating &&
                RatingForm.touched.rateRating ? (
                  <div className="text-danger fs-5 mt-3">
                    {RatingForm.errors.rateRating}
                  </div>
                ) : null}
              </div>
              <div className="form-group my-3">
              <label htmlFor="rateSubject" className="fs-4 fw-bold">
                      Product Rate Subject
                    </label>
                <input
                  type="text"
                  className="w-100 "
                  id="rateSubject"
                  value={RatingForm.values.rateSubject}
                  name="rateSubject"
                  placeholder="Enter The Subject Rate"
                  onChange={RatingForm.handleChange}
                  onBlur={RatingForm.handleBlur}
                />
                {RatingForm.errors.rateSubject &&
                RatingForm.touched.rateSubject ? (
                  <div className="text-danger fs-5 mt-3">
                    {RatingForm.errors.rateSubject}
                  </div>
                ) : null}
              </div>
           

              <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="rateReview" className="fs-4 fw-bold">
                      Product Commint
                    </label>
                    <textarea
                      className="w-100 "
                      id="rateReview"
                      value={RatingForm.values.rateReview}
                      name="rateReview"
                      placeholder="Enter The Commit of Product"
                      onChange={RatingForm.handleChange}
                      onBlur={RatingForm.handleBlur}
                    ></textarea>
                    {RatingForm.errors.rateReview &&
                    RatingForm.touched.rateReview ? (
                      <div className="text-danger fs-5 mt-3">
                        {RatingForm.errors.rateReview}
                      </div>
                    ) : null}
                  </div>
                </div>









              <div className={`d-flex justify-content-between my-3`}>
                {isLoading ? (
                  <button type="submit" className={`${styles.login_button}`}>
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`${styles.login_button}`}
                    disabled={!(RatingForm.isValid && RatingForm.dirty)}
                  >
                    Send The Rate
                  </button>
                )}
              </div>
            </form>
          </div>
          <div
            className={`col-md-5 ${styles.new_account} offset-md-1   d-flex align-items-center`}
          >
            <div className="d-flex flex-column ">
              <h3>Want The Back Product</h3>
              <p>
                Welcome Back Detail Product {prodName}
              </p>
              <Link to="/detail/${id}" className="text-decoration-none">
                <span className={`${styles.register_button}`}>Back To Product</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
