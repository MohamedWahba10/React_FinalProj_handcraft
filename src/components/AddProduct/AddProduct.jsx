import React, { useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

export default function AddProduct() {
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const userToken = localStorage.getItem("userToken");
  const userData = localStorage.getItem("userData")
  // console.log(userData)
  // const userId = jwtDecode(userToken).id;
  // const [prodImageCoverFile, setProdImageCoverFile] = useState(null);
  // const [prodImagesArray, setProdImagesArray] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/subcategory/`
        );
        setCategories(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCategories();
  }, []);

//   useEffect(() => {
//     async function fetchCategoriesSpecific(id) {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/api/subcategory/${id}`
//         );
//         setCategories(response.data.data);
//       } catch (error) {
//         setError(error.message);
//       }
//     }

//     fetchCategoriesSpecific(id);
//   }, [id]);
// }


  // console.log("userToken:", userToken);
  async function callAddProduct(values) {
    setisLoading(true);
    // const formData = new FormData();
    // formData.append("prodName",values.prodName);
    // formData.append("prodPrice", values.prodPrice);
    // formData.append("prodQuantity",values.prodQuantity);
    // formData.append("prodSubCategory",values.prodSubCategory);
    // formData.append("prodVendor",userData);
    // formData.append("prodDescription",values.prodDescription);
    // formData.append("prodImageThumbnail",values.prodImageThumbnail);

    // prodImagesArray.forEach((image, index) => {
    //   formData.append(`prodImages[${index}]`, image);
    // });
    try {
      console.log("MERRRRRRRRRRRRRRRRRRRRRR")
      const response = await axios.post(
        `http://127.0.0.1:8000/api/product/create/`,
        values,
        {
          headers: {
            userToken: `${userToken}`,
            
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response : ", response);

      if (response.data != "") {
        navigate("/");
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
    prodQuantity: Yup.string()
      .matches(/^[1-9][0-9]{0,6}$/, "'product Quantity must be only digits'")
      .required("product Quantity is Required"),
    prodSubCategory: Yup.string().required("Category is Required"),
    prodDescription: Yup.string().required("Description is Required"),
    // prodImageCover: Yup.mixed()
    //   .test("fileType", "Please select a valid file", (value) => {
    //     return value instanceof File;
    //   })
    //   .required("Image Cover is required"),
    // prodImages: Yup.array()
    //   .min(1, "Please upload at least one image")
    //   .of(
    //     Yup.mixed().test("fileType", "Please select valid files", (value) => {
    //       return value instanceof File;
    //     })
    //   )
    //   .required("Product Images are required"),
      // prodImages: Yup.array().required("Product Images are required"),
  });

  const AddProductForm = useFormik({
    initialValues: {
      prodName: "",
      prodPrice: "",
      prodQuantity: "",
      prodSubCategory: "",
      prodVendor: userData,
      prodDescription: "",
      prodImageThumbnail: "",
      prodImages: [],
    },
    validationSchema,
    onSubmit: (values) => callAddProduct(values),
  });

  // const handleImageCoverChange = (event) => {
  //   setProdImageCoverFile(event.currentTarget.files[0]);
  // };

  // const handleImagesChange = (event) => {
  //   setProdImagesArray(Array.from(event.currentTarget.files));
  // };
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
                    <label htmlFor="prodQuantity" className="fs-4 fw-bold">
                      Product Quantity
                    </label>
                    <input
                      type="number"
                      className="w-100 "
                      id="prodQuantity"
                      value={AddProductForm.values.prodQuantity}
                      name="prodQuantity"
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="prodImageCover" className="fs-4 fw-bold">
                      Image Cover
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImageCover"
                      name="prodImageCover"
                      // onChange={handleImageCoverChange}
                      onChange={AddProductForm.handleChange}

                      onBlur={AddProductForm.handleBlur}
                    />

                    {AddProductForm.errors.prodImageCover &&
                    AddProductForm.touched.prodImageCover ? (
                      <div className="text-danger fs-5 mt-3">
                        {AddProductForm.errors.prodImageCover}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="prodImages" className="fs-4 fw-bold">
                      Product Images
                    </label>
                    <input
                      type="file"
                      className="w-100 border"
                      id="prodImages"
                      name="prodImages"
                      multiple
                      // onChange={handleImagesChange}
                      onChange={AddProductForm.handleChange}

                      onBlur={AddProductForm.handleBlur}
                    />
                    {AddProductForm.errors.prodImages &&
                      AddProductForm.touched.prodImages && (
                        <div className="text-danger fs-5 mt-3">
                          {AddProductForm.errors.prodImages}
                        </div>
                      )}
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
