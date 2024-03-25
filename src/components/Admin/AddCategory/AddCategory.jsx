import React, { useEffect, useState } from "react";
import styles from "./AddCategory.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function AddCategory() {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();


  async function callAddCategory(values) {
    setisLoading(true);
    const formData = new FormData();
    formData.append("cateName", values.cateName);
    formData.append("cateDescription", values.cateDescription);

     formData.append("cateImage", values.cateImage);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/panel/categoryadd/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message = "Category added successfully") {
        navigate("/adminPanel/adminCategory");
        setisLoading(false);
      } else {
      }
    } catch (error) {
      setError(error.response.data.message);

      setisLoading(false);
      console.error("Error during AddCategory:", error);
    }
  }
  const validationSchema = Yup.object({
    cateName: Yup.string()
      .matches(
        /^(?!\s)(?!.*\s$)[a-zA-Z0-9\s]{3,40}$/,
        "Category Name must be from 3 to 35 letters"
      )
      .required("Required"),

    cateDescription: Yup.string().required("Category Description is Required"),
    cateImage: Yup.string().required("Image is Required"),
  });

  const AddCategoryForm = useFormik({
    initialValues: {
      cateName: "",
      cateDescription: "",
      cateImage: "",
    },
    validationSchema,
    onSubmit: (values) => callAddCategory(values),
  });

  return (
    <>
      <div className={`${styles.header_AddCategory} py-5 mb-5 mx-5 `}>
        <Link to="/adminPanel/adminCategory" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Category</span>
        </Link>

        <span className={`${styles.span_AddCategory}`}>
          / Add Category
        </span>

        <div className="container my-5 py-5">
          <div>
            <h2 className="text-center my-3">Add Category</h2>

            <div className={`${styles.form_AddCategory}`}>
              {error ? <div className="alert alert-danger"> {error}</div> : ""}

              <form
                onSubmit={AddCategoryForm.handleSubmit}
                encType="multipart/form-data"
              >
                <div className="row gy-4">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="cateName" className="fs-4 fw-bold">
                        Catgeory Name
                      </label>
                      <input
                        type="text"
                        className="w-100"
                        id="cateName"
                        name="cateName"
                        value={AddCategoryForm.values.cateName}
                        onChange={AddCategoryForm.handleChange}
                        onBlur={AddCategoryForm.handleBlur}
                        placeholder="Enter The Category Name"
                      />
                      {AddCategoryForm.errors.cateName &&
                      AddCategoryForm.touched.cateName ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddCategoryForm.errors.cateName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="cateDescription" className="fs-4 fw-bold">
                        Category Description
                      </label>
                      <textarea
                        className="w-100 "
                        id="cateDescription"
                        name="cateDescription"
                        placeholder="Enter The Category Description"
                        value={AddCategoryForm.values.cateDescription}
                        onChange={AddCategoryForm.handleChange}
                        onBlur={AddCategoryForm.handleBlur}
                      ></textarea>
                      {AddCategoryForm.errors.cateDescription &&
                      AddCategoryForm.touched.cateDescription ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddCategoryForm.errors.cateDescription}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="cateImage" className="fs-4 fw-bold">
                        Category Image
                      </label>
                      <input
                        type="file"
                        className="w-100 border"
                        id="cateImage"
                        name="cateImage"
                        onChange={(event) => {
                          AddCategoryForm.setFieldValue(
                            "cateImage",
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={AddCategoryForm.handleBlur}
                      />

                      {AddCategoryForm.errors.cateImage &&
                      AddCategoryForm.touched.cateImage ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddCategoryForm.errors.cateImage}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className={`d-flex justify-content-between my-3`}>
                  {isLoading ? (
                    <button
                      type="submit"
                      className={`${styles.AddCategory_button}`}
                    >
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`${styles.AddCategory_button}`}
                    >
                      Add Category
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
