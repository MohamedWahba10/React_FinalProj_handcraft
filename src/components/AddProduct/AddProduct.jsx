import React, { useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/product/subcategory/`
        );
        setCategories(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCategories();
  }, []);

  async function callAddProduct(values) {
    setisLoading(true);
    const formData = new FormData();
    formData.append("prodName", values.prodName);
    formData.append("prodPrice", values.prodPrice);
    formData.append("prodStock", values.prodStock);
    formData.append("prodSubCategory", values.prodSubCategory);
    formData.append("prodDescription", values.prodDescription);
    formData.append("prodStock", values.prodStock);
    formData.append("prodImageThumbnail", values.prodImageThumbnail);
    formData.append("prodImageOne", values.prodImageOne);
    formData.append("prodImageTwo", values.prodImageTwo);
    formData.append("prodImageThree", values.prodImageThree);
    formData.append("prodImageFour", values.prodImageFour);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/product/create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.data != "") {
        toast.success("Product Added successfully");
        navigate("/profile");
        setisLoading(false);
      } else {
        console.log("data is ", response.data);
      }
    } catch (error) {
      setisLoading(false);
      console.error("Error during AddProduct:", error);
    }
  }
  const validationSchema = Yup.object({
    prodName: Yup.string()
      .matches(
        /^[a-zA-Z0-9]{3,35}$/,
        "product Name must be from 3 to 10 letters"
      )
      .required("Required"),
    prodPrice: Yup.string()
      .matches(/^[1-9][0-9]{0,6}$/, "'product Price must be only digits'")
      .required("product Price is Required"),
    prodStock: Yup.string()
      .matches(/^[1-9][0-9]{0,3}$/, "'product Stock must be only digits'")
      .required("Product Stock is Required"),
    prodSubCategory: Yup.string().required("Category is Required"),
    prodDescription: Yup.string().required("Description is Required"),
    prodImageThumbnail: Yup.mixed().required("Image Is Required"),
    prodImageOne: Yup.mixed().required("Image Is Required"),
    prodImageTwo: Yup.mixed().required("Image Is Required"),
    prodImageThree: Yup.mixed().required("Image Is Required"),
    prodImageFour: Yup.mixed().required("Image Is Required"),
  });

  const AddProductForm = useFormik({
    initialValues: {
      prodName: "",
      prodPrice: "",
      prodStock: "",
      prodSubCategory: "",
      prodDescription: "",
      prodStock: "",
      prodImageThumbnail: "",
      prodImageOne: "",
      prodImageTwo: "",
      prodImageThree: "",
      prodImageFour: "",
    },
    validationSchema,
    onSubmit: (values) => callAddProduct(values),
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
            {error ? <div className="alert alert-danger"> {error}</div> : ""}
            <form
              onSubmit={AddProductForm.handleSubmit}
              encType="multipart/form-data"
            >
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
                    <label htmlFor="prodSubCategory" className="fs-4 fw-bold">
                      Product Category
                    </label>

                    <select
                      className="w-100 "
                      id="prodSubCategory"
                      value={AddProductForm.values.prodSubCategory}
                      name="prodSubCategory"
                      onChange={AddProductForm.handleChange}
                      onBlur={AddProductForm.handleBlur}
                    >
                      <option value="">Select Category</option>
                      {Array.isArray(categories) &&
                        categories.map((category) => (
                          <option value={category.id} key={category.id}>
                            {category.subCateName}
                          </option>
                        ))}
                    </select>
                    {AddProductForm.errors.prodSubCategory &&
                      AddProductForm.touched.prodSubCategory && (
                        <div className="text-danger fs-5 mt-3">
                          {AddProductForm.errors.prodSubCategory}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="prodStock" className="fs-4 fw-bold">
                      Product Stock
                    </label>
                    <input
                      type="number"
                      className="w-100 "
                      id="prodStock"
                      value={AddProductForm.values.prodStock}
                      name="prodStock"
                      placeholder="Enter The Product Stock"
                      onChange={AddProductForm.handleChange}
                      onBlur={AddProductForm.handleBlur}
                    />
                    {AddProductForm.errors.prodStock &&
                    AddProductForm.touched.prodStock ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodStock}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="prodDescription" className="fs-4 fw-bold">
                      Product Description
                    </label>
                    <textarea
                      className="w-100 "
                      id="prodDescription"
                      value={AddProductForm.values.prodDescription}
                      name="prodDescription"
                      placeholder="Enter The Product Description"
                      onChange={AddProductForm.handleChange}
                      onBlur={AddProductForm.handleBlur}
                    ></textarea>
                    {AddProductForm.errors.prodDescription &&
                    AddProductForm.touched.prodDescription ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodDescription}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label
                      htmlFor="prodImageThumbnail"
                      className="fs-4 fw-bold"
                    >
                      Image Cover
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImageThumbnail"
                      name="prodImageThumbnail"
                      onChange={(event) => {
                        AddProductForm.setFieldValue(
                          "prodImageThumbnail",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={AddProductForm.handleBlur}
                    />

                    {AddProductForm.errors.prodImageThumbnail &&
                    AddProductForm.touched.prodImageThumbnail ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodImageThumbnail}
                      </div>
                    ) : null}
                  </div>
                </div>
                {/* //----------------list images ---------------------------------------------- */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="prodImageOne"
                      className="fs-4 fw-bold"
                    >
                      Image Number One
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImageOne"
                      name="prodImageOne"
                      onChange={(event) => {
                        AddProductForm.setFieldValue(
                          "prodImageOne",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={AddProductForm.handleBlur}
                    />

                    {AddProductForm.errors.prodImageOne &&
                    AddProductForm.touched.prodImageOne ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodImageOne}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="prodImageTwo"
                      className="fs-4 fw-bold"
                    >
                      Image Number Two
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImageTwo"
                      name="prodImageTwo"
                      onChange={(event) => {
                        AddProductForm.setFieldValue(
                          "prodImageTwo",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={AddProductForm.handleBlur}
                    />

                    {AddProductForm.errors.prodImageTwo &&
                    AddProductForm.touched.prodImageTwo ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodImageTwo}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="prodImageThree"
                      className="fs-4 fw-bold"
                    >
                      Image Number Three
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImageThree"
                      name="prodImageThree"
                      onChange={(event) => {
                        AddProductForm.setFieldValue(
                          "prodImageThree",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={AddProductForm.handleBlur}
                    />

                    {AddProductForm.errors.prodImageThree &&
                    AddProductForm.touched.prodImageThree ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodImageThree}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="prodImageFour"
                      className="fs-4 fw-bold"
                    >
                      Image Number Four
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImageFour"
                      name="prodImageFour"
                      onChange={(event) => {
                        AddProductForm.setFieldValue(
                          "prodImageFour",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={AddProductForm.handleBlur}
                    />

                    {AddProductForm.errors.prodImageFour &&
                    AddProductForm.touched.prodImageFour ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodImageFour}
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
                    // disabled={!(AddProductForm.isValid && AddProductForm.dirty)}
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
