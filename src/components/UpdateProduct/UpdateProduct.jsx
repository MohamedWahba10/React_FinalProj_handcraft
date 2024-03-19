import React, { useEffect, useState } from "react";
import styles from "./UpdateProduct.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();
  const [dataProduct, setData] = useState(null);

  // --------------- call api subCategory --------------
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

  //  --------------- call api product detail --------------------

  async function ProductDetail(id) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/product/details/${id}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    ProductDetail(id);
  }, []);
  const productData = dataProduct?.data.data;

  //  --------------- call api Update Product ----------------------

  async function callUpdateProduct(values) {
    setisLoading(true);
    const formData = new FormData();
    formData.append("prodName", values.prodName);
    formData.append("prodPrice", values.prodPrice);
    formData.append("prodSubCategory", values.prodSubCategory);
    formData.append("prodDescription", values.prodDescription);
    formData.append("prodStock", values.prodStock);
    formData.append("prodOnSale", values.prodOnSale);
    formData.append(
      "prodDiscountPercentage",
      values.prodDiscountPercentage === "" ? 0 : values.prodDiscountPercentage
    );
    if (
      values.prodImageThumbnail &&
      values.prodImageThumbnail instanceof File
    ) {
      formData.append("prodImageThumbnail", values.prodImageThumbnail);
    } else if (
      !values.prodImageThumbnail &&
      productData &&
      productData.prodImageThumbnail
    ) {
      formData.append("prodImageThumbnail", productData.prodImageThumbnail);
    }

    if (values.prodImageOne && values.prodImageOne instanceof File) {
      formData.append("prodImageOne", values.prodImageOne);
    } else if (
      !values.prodImageOne &&
      productData &&
      productData.prodImageOne
    ) {
      formData.append("prodImageOne", productData.prodImageOne);
    }

    if (values.prodImageTwo && values.prodImageTwo instanceof File) {
      formData.append("prodImageTwo", values.prodImageTwo);
    } else if (
      !values.prodImageTwo &&
      productData &&
      productData.prodImageTwo
    ) {
      formData.append("prodImageTwo", productData.prodImageTwo);
    }
    if (values.prodImageThree && values.prodImageThree instanceof File) {
      formData.append("prodImageThree", values.prodImageThree);
    } else if (
      !values.prodImageThree &&
      productData &&
      productData.prodImageThree
    ) {
      formData.append("prodImageThree", productData.prodImageThree);
    }
    if (values.prodImageFour && values.prodImageFour instanceof File) {
      formData.append("prodImageFour", values.prodImageFour);
    } else if (
      !values.prodImageFour &&
      productData &&
      productData.prodImageFour
    ) {
      formData.append("prodImageFour", productData.prodImageFour);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/product/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.data != "") {
        navigate("/profile");
        setisLoading(false);
      } else {
      }
    } catch (error) {
      setError(error.response.data.prodImageFour||error.response.data.prodImageOne||error.response.data.prodImageTwo||error.response.data.prodImageThumbnail||error.response.data.prodImageThree)

      setisLoading(false);
      console.error("Error during updateProduct:", error);
    }
  }
  const validationSchema = Yup.object({
    prodName: Yup.string()
      .matches(
        /^(?!\s)(?!.*\s$)[a-zA-Z0-9\s]{3,40}$/,
        "product Name must be from 3 to 35 letters"
      )
      .required("Required"),
    prodPrice: Yup.string()
      .matches(/^[1-9][0-9]{0,6}$/, "'product Price must be only digits'")
      .required("product Price is Required"),
    prodSubCategory: Yup.string().required("Category is Required"),
    prodDescription: Yup.string().required("Description is Required"),
    prodStock: Yup.string()
      .matches(/^[1-9][0-9]{0,3}$/, "'product Stock must be only digits'")
      .required("product Stock is Required"),
    prodDiscountPercentage: Yup.string().when("prodOnSale", {
      is: true,
      then: () =>
        Yup.string()
          .matches(
            /^[1-9][0-9]{0,6}$/,
            "'product prodDiscountPercentage must be only digits'"
          )
          .required("Product DiscountPercentage is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
  });

  const UpdateProductForm = useFormik({
    initialValues: {
      prodName: "",
      prodPrice: "",
      prodSubCategory: "",
      prodDescription: "",
      prodImageThumbnail: "",
      prodStock: "",
      prodOnSale: "",
      prodDiscountPercentage: "",
      prodImageOne: "",
      prodImageTwo: "",
      prodImageThree: "",
      prodImageFour: "",
    },
    validationSchema,
    onSubmit: (values) => callUpdateProduct(values),
  });
  useEffect(() => {
    if (productData) {
      UpdateProductForm.setValues({
        prodName: productData.prodName || "",
        prodPrice: productData.prodPrice || "",
        // prodSubCategory: productData.prodSubCategory?.subCateName || "",
        prodSubCategory: productData.prodSubCategory?.id || "", 
        prodDescription: productData.prodDescription || "",
        prodImageThumbnail: productData.prodImageThumbnail || "",
        prodStock: productData.prodStock || "",
        prodOnSale: productData.prodOnSale || "",
        prodDiscountPercentage: productData.prodDiscountPercentage || "",
        prodImageOne: productData.prodImageOne || "",
        prodImageTwo: productData.prodImageTwo || "",
        prodImageThree: productData.prodImageThree || "",
        prodImageFour: productData.prodImageFour || "",
      });
    }
  }, [productData]);
  // ---------------------------------------------

  return (
    <>
      <Helmet>
        <title>UpdateProduct</title>
      </Helmet>
      <div className={`${styles.header_UpdateProduct} py-5 mb-5 text-center `}>
        <h1>Update Product</h1>

        <Link to="/profile" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Profile</span>
        </Link>

        <span className={`${styles.span_UpdateProduct}`}>
          / Update Product
        </span>
      </div>
      <div className="container my-5 py-5">
        <div>
          <div className={`${styles.form_UpdateProduct}`}>
            {error ? <div className="alert alert-danger"> {error}</div> : ""}

            <form
              onSubmit={UpdateProductForm.handleSubmit}
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
                      name="prodName"
                      value={UpdateProductForm.values.prodName}
                      onChange={UpdateProductForm.handleChange}
                      onBlur={UpdateProductForm.handleBlur}
                      placeholder="Enter The Product Name"
                    />
                    {UpdateProductForm.errors.prodName &&
                    UpdateProductForm.touched.prodName ? (
                      <div className="text-danger fs-5 mt-3">
                        {UpdateProductForm.errors.prodName}
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
                      name="prodPrice"
                      placeholder="Enter The Product Price"
                      value={UpdateProductForm.values.prodPrice}
                      onChange={UpdateProductForm.handleChange}
                      onBlur={UpdateProductForm.handleBlur}
                    />
                    {UpdateProductForm.errors.prodPrice &&
                    UpdateProductForm.touched.prodPrice ? (
                      <div className="text-danger fs-5 mt-3">
                        {UpdateProductForm.errors.prodPrice}
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
                      name="prodSubCategory"
                      value={UpdateProductForm.values.prodSubCategory}
                      onChange={UpdateProductForm.handleChange}
                      onBlur={UpdateProductForm.handleBlur}
                    >
                      <option value="">Select Category</option>
                      {Array.isArray(categories) &&
                        categories.map((category) => (
                          <option
                            value={category.id}
                            selected={
                              category.id ===
                              UpdateProductForm.values.prodSubCategory
                            }
                            key={category.id}
                          >
                            {category.subCateName}
                          </option>
                        ))}
                    </select>
                    {UpdateProductForm.errors.prodSubCategory &&
                      UpdateProductForm.touched.prodSubCategory && (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateProductForm.errors.prodSubCategory}
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
                      value={UpdateProductForm.values.prodStock}
                      name="prodStock"
                      placeholder="Enter The Product Stock"
                      onChange={UpdateProductForm.handleChange}
                      onBlur={UpdateProductForm.handleBlur}
                    />
                    {UpdateProductForm.errors.prodStock &&
                    UpdateProductForm.touched.prodStock ? (
                      <div className="text-danger fs-5 mt-3">
                        {UpdateProductForm.errors.prodStock}
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
                      name="prodDescription"
                      placeholder="Enter The Product Description"
                      value={UpdateProductForm.values.prodDescription}
                      onChange={UpdateProductForm.handleChange}
                      onBlur={UpdateProductForm.handleBlur}
                    ></textarea>
                    {UpdateProductForm.errors.prodDescription &&
                    UpdateProductForm.touched.prodDescription ? (
                      <div className="text-danger fs-5 mt-3">
                        {UpdateProductForm.errors.prodDescription}
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
                        UpdateProductForm.setFieldValue(
                          "prodImageThumbnail",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={UpdateProductForm.handleBlur}
                    />

                    {UpdateProductForm.errors.prodImageThumbnail &&
                    UpdateProductForm.touched.prodImageThumbnail ? (
                      <div className="text-danger fs-5 mt-3">
                        {UpdateProductForm.errors.prodImageThumbnail}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="prodImageOne" className="fs-4 fw-bold">
                      Image Number One
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImageOne"
                      name="prodImageOne"
                      onChange={(event) => {
                        UpdateProductForm.setFieldValue(
                          "prodImageOne",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={UpdateProductForm.handleBlur}
                    />

                    {UpdateProductForm.errors.prodImageOne &&
                    UpdateProductForm.touched.prodImageOne ? (
                      <div className="text-danger fs-5 mt-3">
                        {UpdateProductForm.errors.prodImageOne}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="prodImageTwo" className="fs-4 fw-bold">
                      Image Number Two
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImageTwo"
                      name="prodImageTwo"
                      onChange={(event) => {
                        UpdateProductForm.setFieldValue(
                          "prodImageTwo",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={UpdateProductForm.handleBlur}
                    />

                    {UpdateProductForm.errors.prodImageTwo &&
                    UpdateProductForm.touched.prodImageTwo ? (
                      <div className="text-danger fs-5 mt-3">
                        {UpdateProductForm.errors.prodImageTwo}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="prodImageThree" className="fs-4 fw-bold">
                      Image Number Three
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImageThree"
                      name="prodImageThree"
                      onChange={(event) => {
                        UpdateProductForm.setFieldValue(
                          "prodImageThree",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={UpdateProductForm.handleBlur}
                    />

                    {UpdateProductForm.errors.prodImageThree &&
                    UpdateProductForm.touched.prodImageThree ? (
                      <div className="text-danger fs-5 mt-3">
                        {UpdateProductForm.errors.prodImageThree}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="prodImageFour" className="fs-4 fw-bold">
                      Image Number Four
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImageFour"
                      name="prodImageFour"
                      onChange={(event) => {
                        UpdateProductForm.setFieldValue(
                          "prodImageFour",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={UpdateProductForm.handleBlur}
                    />

                    {UpdateProductForm.errors.prodImageFour &&
                    UpdateProductForm.touched.prodImageFour ? (
                      <div className="text-danger fs-5 mt-3">
                        {UpdateProductForm.errors.prodImageFour}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* -------------------on Sales---------------------------- */}
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="prodOnSale" className="fs-4 fw-bold pe-4">
                      Product Sale
                    </label>
                    <input
                      type="checkbox"
                      id="prodOnSale"
                      value={UpdateProductForm.values.prodOnSale}
                      checked={UpdateProductForm.values.prodOnSale}
                      name="prodOnSale"
                      placeholder="Enter The Product On Sale"
                      style={{ width: "25px", height: "30px" }}
                      onChange={UpdateProductForm.handleChange}
                      onBlur={UpdateProductForm.handleBlur}
                    />
                  </div>
                </div>
                {/* ---------------------- */}
                {UpdateProductForm.values.prodOnSale ? (
                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="prodDiscountPercentage"
                        className="fs-4 fw-bold"
                      >
                        Product Discount Percentage
                      </label>
                      <input
                        type="number"
                        className="w-100 "
                        id="prodDiscountPercentage"
                        value={UpdateProductForm.values.prodDiscountPercentage}
                        name="prodDiscountPercentage"
                        placeholder="Enter The Product Discount Precentage"
                        onChange={UpdateProductForm.handleChange}
                        onBlur={UpdateProductForm.handleBlur}
                      />
                      {UpdateProductForm.errors.prodDiscountPercentage &&
                      UpdateProductForm.touched.prodDiscountPercentage ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateProductForm.errors.prodDiscountPercentage}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className={`d-flex justify-content-between my-3`}>
                {isLoading ? (
                  <button
                    type="submit"
                    className={`${styles.UpdateProduct_button}`}
                  >
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`${styles.UpdateProduct_button}`}
                  >
                    Update Product
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
