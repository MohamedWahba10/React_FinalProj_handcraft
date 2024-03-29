import React, { useEffect, useState } from "react";
import styles from "./AddSubCategory.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function AddSubCategory() {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  let navigate = useNavigate();
  let [categoryData, setCategoryData] = useState([]);

  async function AllCategory() {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/product/category/`
      );
      console.log("response data", response.data.data);
      setCategoryData(response.data.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }

  useEffect(() => {
    AllCategory();
  }, []);
  async function callAddSubCategory(values) {
    setisLoading(true);
    const formData = new FormData();
    formData.append("subCateName", values.subCateName);
    formData.append("subCateDescription", values.subCateDescription);
    formData.append("subCateParent", values.subCateParent);

    formData.append("subCateImage", values.subCateImage);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/panel/addsub_category/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if ((response.data.message = "Sub Category added successfully")) {
        navigate("/adminPanel/adminSubCategory");
        setisLoading(false);
      } else {
      }
    } catch (error) {
      setError(error.response.data.message);

      setisLoading(false);
      console.error("Error during AddSubCategory:", error);
    }
  }
  const validationSchema = Yup.object({
    subCateName: Yup.string()
      .matches(
        /^(?!\s)(?!.*\s$)[a-zA-Z0-9\s]{3,40}$/,
        "Category Name must be from 3 to 35 letters"
      )
      .required("Required"),

    subCateDescription: Yup.string().required(
      "Category Description is Required"
    ),
    subCateImage: Yup.string().required("Image is Required"),
    subCateParent: Yup.string().required("Category Parent is Required"),
  });

  const AddSubCategoryForm = useFormik({
    initialValues: {
      subCateName: "",
      subCateDescription: "",
      subCateParent: "",
      subCateImage: "",
    },
    validationSchema,
    onSubmit: (values) => callAddSubCategory(values),
  });

  return (
    <>
      <div className={`${styles.header_AddSubCategory} py-5 mb-5 mx-5 `}>
        <Link
          to="/adminPanel/adminSubCategory"
          className="text-decoration-none "
        >
          <span className={`${styles.link_home} pe-1 `}>SubCategory</span>
        </Link>

        <span className={`${styles.span_AddSubCategory}`}>
          / Add SubCategory
        </span>

        <div className="container my-5 py-5">
          <div>
            <h2 className="text-center my-3">Add SubCategory</h2>

            <div className={`${styles.form_AddSubCategory}`}>
              {error ? <div className="alert alert-danger"> {error}</div> : ""}

              <form
                onSubmit={AddSubCategoryForm.handleSubmit}
                encType="multipart/form-data"
              >
                <div className="row gy-4">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="subCateName" className="fs-4 fw-bold">
                        SubCatgeory Name
                      </label>
                      <input
                        type="text"
                        className="w-100"
                        id="subCateName"
                        name="subCateName"
                        value={AddSubCategoryForm.values.subCateName}
                        onChange={AddSubCategoryForm.handleChange}
                        onBlur={AddSubCategoryForm.handleBlur}
                        placeholder="Enter The SubCategory Name"
                      />
                      {AddSubCategoryForm.errors.subCateName &&
                      AddSubCategoryForm.touched.subCateName ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddSubCategoryForm.errors.subCateName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="subCateParent" className="fs-4 fw-bold">
                      Parenr Category
                    </label>

                    <select
                      className="w-100 "
                      id="subCateParent"
                      value={AddSubCategoryForm.values.subCateParent}
                      name="subCateParent"
                      onChange={AddSubCategoryForm.handleChange}
                      onBlur={AddSubCategoryForm.handleBlur}
                    >
                      <option value="">Select Category</option>
                      {Array.isArray(categoryData) &&
                        categoryData.map((category) => (
                          <option value={category.id} key={category.id}>
                            {category.cateName}
                          </option>
                        ))}
                    </select>
                    {AddSubCategoryForm.errors.subCateParent &&
                      AddSubCategoryForm.touched.subCateParent && (
                        <div className="text-danger fs-5 mt-3">
                          {AddSubCategoryForm.errors.subCateParent}
                        </div>
                      )}
                  </div>
                </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="subCateDescription"
                        className="fs-4 fw-bold"
                      >
                        SubCategory Description
                      </label>
                      <textarea
                        className="w-100 "
                        id="subCateDescription"
                        name="subCateDescription"
                        placeholder="Enter The SubCategory Description"
                        value={AddSubCategoryForm.values.subCateDescription}
                        onChange={AddSubCategoryForm.handleChange}
                        onBlur={AddSubCategoryForm.handleBlur}
                      ></textarea>
                      {AddSubCategoryForm.errors.subCateDescription &&
                      AddSubCategoryForm.touched.subCateDescription ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddSubCategoryForm.errors.subCateDescription}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="subCateImage" className="fs-4 fw-bold">
                        SubCategory Image
                      </label>
                      <input
                        type="file"
                        className="w-100 border"
                        id="subCateImage"
                        name="subCateImage"
                        onChange={(event) => {
                          AddSubCategoryForm.setFieldValue(
                            "subCateImage",
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={AddSubCategoryForm.handleBlur}
                      />

                      {AddSubCategoryForm.errors.subCateImage &&
                      AddSubCategoryForm.touched.subCateImage ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddSubCategoryForm.errors.subCateImage}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className={`d-flex justify-content-between my-3`}>
                  {isLoading ? (
                    <button
                      type="submit"
                      className={`${styles.AddSubCategory_button}`}
                    >
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`${styles.AddSubCategory_button}`}
                    >
                      Add SubCategory
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
