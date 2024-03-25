import React, { useEffect, useState } from "react";
import styles from "./UpdateSubCategory.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateSubCategory() {
  //   const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();
  const [dataSubCategory, setData] = useState(null);

  let [ParentcategoryData, setCategoryData] = useState([]);

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





  async function SubCategoryDetail(id) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/panel/spcific_subcategory/${id}/`
      );
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    SubCategoryDetail(id);
  }, []);
  const categoryData = dataSubCategory?.data.sub_category;
  console.log("dataSubCategory................", categoryData);
  //  --------------- call api Update Category ----------------------

  async function callUpdateSubCategory(values) {
    setisLoading(true);
    const formData = new FormData();
    formData.append("subCateName", values.subCateName);
    formData.append("subCateDescription", values.subCateDescription);
    formData.append("subCateParent", values.subCateParent);

    if (values.subCateImage && values.subCateImage instanceof File) {
      formData.append("subCateImage", values.subCateImage);
    } else if (
      !values.subCateImage &&
      categoryData &&
      categoryData.subCateImage
    ) {
      formData.append("subCateImage", categoryData.subCateImage);
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/panel/updatesub_CateName/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if ((response.data.message = "Category updated successfully")) {
        navigate("/adminPanel/adminSubCategory");
        setisLoading(false);
      } else {
      }
    } catch (error) {
      setError(error.response.data.message);

      setisLoading(false);
      console.error("Error during UpdateSubCategory:", error);
    }
  }
  const validationSchema = Yup.object({
    subCateName: Yup.string()
      .matches(
        /^(?!\s)(?!.*\s$)[a-zA-Z0-9\s]{3,40}$/,
        "SubCategory Name must be from 3 to 35 letters"
      )
      .required("Required"),
    subCateParent: Yup.string().required("Category Parent is Required"),

    subCateDescription: Yup.string().required(
      "SubCategory Description is Required"
    ),
    subCateImage: Yup.string().required("Image is Required"),
  });

  const UpdateSubCategoryForm = useFormik({
    initialValues: {
      subCateName: "",
      subCateDescription: "",
      subCateImage: "",
      subCateParent: "",
    },
    validationSchema,
    onSubmit: (values) => callUpdateSubCategory(values),
  });
  useEffect(() => {
    if (categoryData) {
      UpdateSubCategoryForm.setValues({
        subCateName: categoryData.subCateName || "",

        subCateDescription: categoryData.subCateDescription || "",
        subCateParent: categoryData.subCateParent || "",
        subCateImage: categoryData.subCateImage || "",
      });
    }
  }, [categoryData]);
  // ---------------------------------------------

  return (
    <>
      <div className={`${styles.header_UpdateSubCategory} py-5 mb-5 mx-5 `}>
        <Link
          to="/adminPanel/adminSubCategory"
          className="text-decoration-none "
        >
          <span className={`${styles.link_home} pe-1 `}>SubCategory</span>
        </Link>

        <span className={`${styles.span_UpdateSubCategory}`}>
          / Update SubCategory
        </span>

        <div className="container my-5 py-5">
          <div>
            <h2 className="text-center my-3">Update SubCategory</h2>

            <div className={`${styles.form_UpdateSubCategory}`}>
              {error ? <div className="alert alert-danger"> {error}</div> : ""}

              <form
                onSubmit={UpdateSubCategoryForm.handleSubmit}
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
                        value={UpdateSubCategoryForm.values.subCateName}
                        onChange={UpdateSubCategoryForm.handleChange}
                        onBlur={UpdateSubCategoryForm.handleBlur}
                        placeholder="Enter The SubCategory Name"
                      />
                      {UpdateSubCategoryForm.errors.subCateName &&
                      UpdateSubCategoryForm.touched.subCateName ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateSubCategoryForm.errors.subCateName}
                        </div>
                      ) : null}
                    </div>
                  </div>



                  <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="subCateParent" className="fs-4 fw-bold">
                      Product Category
                    </label>

                    <select
                      className="w-100 "
                      id="subCateParent"
                      name="subCateParent"
                      value={UpdateSubCategoryForm.values.subCateParent}
                      onChange={UpdateSubCategoryForm.handleChange}
                      onBlur={UpdateSubCategoryForm.handleBlur}
                    >
                      <option value="">Select Category</option>
                      {Array.isArray(ParentcategoryData) &&
                        ParentcategoryData.map((category) => (
                          <option
                            value={category.id}
                            selected={
                              category.id ===
                              UpdateSubCategoryForm.values.subCateParent
                            }
                            key={category.id}
                          >
                            {category.cateName}
                          </option>
                        ))}
                    </select>
                    {UpdateSubCategoryForm.errors.subCateParent &&
                      UpdateSubCategoryForm.touched.subCateParent && (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateSubCategoryForm.errors.subCateParent}
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
                        value={UpdateSubCategoryForm.values.subCateDescription}
                        onChange={UpdateSubCategoryForm.handleChange}
                        onBlur={UpdateSubCategoryForm.handleBlur}
                      ></textarea>
                      {UpdateSubCategoryForm.errors.subCateDescription &&
                      UpdateSubCategoryForm.touched.subCateDescription ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateSubCategoryForm.errors.subCateDescription}
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
                          UpdateSubCategoryForm.setFieldValue(
                            "subCateImage",
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={UpdateSubCategoryForm.handleBlur}
                      />

                      {UpdateSubCategoryForm.errors.subCateImage &&
                      UpdateSubCategoryForm.touched.subCateImage ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateSubCategoryForm.errors.subCateImage}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className={`d-flex justify-content-between my-3`}>
                  {isLoading ? (
                    <button
                      type="submit"
                      className={`${styles.UpdateSubCategory_button}`}
                    >
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`${styles.UpdateSubCategory_button}`}
                    >
                      Update SubCategory
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
