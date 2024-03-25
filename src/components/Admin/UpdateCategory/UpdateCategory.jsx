import React, { useEffect, useState } from "react";
import styles from "./UpdateCategory.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateCategory() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();
  const [dataCategory, setData] = useState(null);

  async function CategoryDetail(id) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/panel/specific_category/${id}/`
      );
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    CategoryDetail(id);
  }, []);
  const categoryData = dataCategory?.data.Category;
  console.log("dataCategory................", categoryData);
  //  --------------- call api Update Category ----------------------

  async function callUpdateCategory(values) {
    setisLoading(true);
    const formData = new FormData();
    formData.append("cateName", values.cateName);
    formData.append("cateDescription", values.cateDescription);

    if (values.cateImage && values.cateImage instanceof File) {
      formData.append("cateImage", values.cateImage);
    } else if (!values.cateImage && categoryData && categoryData.cateImage) {
      formData.append("cateImage", categoryData.cateImage);
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/panel/updatecategory/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message = "Category updated successfully") {
        navigate("/adminPanel/adminCategory");
        setisLoading(false);
      } else {
      }
    } catch (error) {
      setError(error.response.data.message);

      setisLoading(false);
      console.error("Error during UpdateCategory:", error);
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

  const UpdateCategoryForm = useFormik({
    initialValues: {
      cateName: "",
      cateDescription: "",
      cateImage: "",
    },
    validationSchema,
    onSubmit: (values) => callUpdateCategory(values),
  });
  useEffect(() => {
    if (categoryData) {
      UpdateCategoryForm.setValues({
        cateName: categoryData.cateName || "",

        cateDescription: categoryData.cateDescription || "",
        cateImage: categoryData.cateImage || "",
      });
    }
  }, [categoryData]);
  // ---------------------------------------------

  return (
    <>
      <div className={`${styles.header_UpdateCategory} py-5 mb-5 mx-5 `}>
        <Link to="/adminPanel/adminCategory" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Category</span>
        </Link>

        <span className={`${styles.span_UpdateCategory}`}>
          / Update Category
        </span>

        <div className="container my-5 py-5">
          <div>
            <h2 className="text-center my-3">Update Category</h2>

            <div className={`${styles.form_UpdateCategory}`}>
              {error ? <div className="alert alert-danger"> {error}</div> : ""}

              <form
                onSubmit={UpdateCategoryForm.handleSubmit}
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
                        value={UpdateCategoryForm.values.cateName}
                        onChange={UpdateCategoryForm.handleChange}
                        onBlur={UpdateCategoryForm.handleBlur}
                        placeholder="Enter The Category Name"
                      />
                      {UpdateCategoryForm.errors.cateName &&
                      UpdateCategoryForm.touched.cateName ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateCategoryForm.errors.cateName}
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
                        value={UpdateCategoryForm.values.cateDescription}
                        onChange={UpdateCategoryForm.handleChange}
                        onBlur={UpdateCategoryForm.handleBlur}
                      ></textarea>
                      {UpdateCategoryForm.errors.cateDescription &&
                      UpdateCategoryForm.touched.cateDescription ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateCategoryForm.errors.cateDescription}
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
                          UpdateCategoryForm.setFieldValue(
                            "cateImage",
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={UpdateCategoryForm.handleBlur}
                      />

                      {UpdateCategoryForm.errors.cateImage &&
                      UpdateCategoryForm.touched.cateImage ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateCategoryForm.errors.cateImage}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className={`d-flex justify-content-between my-3`}>
                  {isLoading ? (
                    <button
                      type="submit"
                      className={`${styles.UpdateCategory_button}`}
                    >
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`${styles.UpdateCategory_button}`}
                    >
                      Update Category
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
