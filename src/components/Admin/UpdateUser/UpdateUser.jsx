import React, { useEffect, useState } from "react";
import styles from "./UpdateUser.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateUser() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();
  const [dataUser, setData] = useState(null);

  async function UserDetail(id) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/panel/specific_user/${id}/`
      );
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  useEffect(() => {
    UserDetail(id);
  }, []);
  const UserData = dataUser?.data.user;
  console.log("dataUser................", UserData);
  //  --------------- call api Update Category ----------------------

  async function callUpdateUser(values) {
    setisLoading(true);
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("phone", values.phone);
    // formData.append("address", values.address);
    if (values.image && values.image instanceof File) {
      formData.append("image", values.image);
    } else if (!values.image && UserData && UserData.Photo_URL) {
      formData.append("image", UserData.Photo_URL);
    }


    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/panel/updateUser/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if ((response.data.message = "User updated successfully")) {
        navigate("/adminPanel/adminUser");
        setisLoading(false);
      } 
    } catch (error) {
      setError(error.response.data.message);

      setisLoading(false);
      console.error("Error during UpdateUser:", error);
    }
  }
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .matches(/^[a-zA-Z]{3,10}$/, "name must be from 3 to 10 letters")
      .required("Required"),
    last_name: Yup.string()
      .matches(/^[a-zA-Z]{3,10}$/, "name must be from 3 to 10 letters")
      .required("Required"),
    phone: Yup.string().matches(/^01[1250]\d{8}$/, "invalid Number Phone"),
    // address: Yup.string(),
  });

  const UpdateUserForm = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      image: "",
      imageUrl: "",
    //   address: "",
    },
    validationSchema,
    onSubmit: (values) => callUpdateUser(values),
  });
  useEffect(() => {
    if (UserData) {
      UpdateUserForm.setValues({
        first_name: UserData.first_name || "",
        last_name: UserData.last_name || "",
        phone: UserData.phone || "",
        image: UserData.Photo_URL || "",
        // imageUrl: userData.imageUrl || "",
        // address: userData.address || "",
      });
    }
  }, [UserData]);
  // ---------------------------------------------

  return (
    <>
      <div className={`${styles.header_UpdateUser} py-5 mb-5 mx-5 `}>
        <Link to="/adminPanel/adminUser" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Users</span>
        </Link>

        <span className={`${styles.span_UpdateUser}`}>/ Update User</span>

        <div className="container my-5 py-5">
          <div>
            <h2 className="text-center my-3">Update User</h2>

            <div className={`${styles.form_UpdateUser}`}>
              {error ? <div className="alert alert-danger"> {error}</div> : ""}

              <form
                onSubmit={UpdateUserForm.handleSubmit}
                encType="multipart/form-data"
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="first_name" className="fs-4 fw-bold">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-100"
                        id="first_name"
                        name="first_name"
                        value={UpdateUserForm.values.first_name}
                        onChange={UpdateUserForm.handleChange}
                        onBlur={UpdateUserForm.handleBlur}
                        placeholder="Enter The First Name"
                      />
                      {UpdateUserForm.errors.first_name &&
                      UpdateUserForm.touched.first_name ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateUserForm.errors.first_name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="last_name" className="fs-4 fw-bold">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-100"
                        id="last_name"
                        name="last_name"
                        value={UpdateUserForm.values.last_name}
                        onChange={UpdateUserForm.handleChange}
                        onBlur={UpdateUserForm.handleBlur}
                        placeholder="Enter The Last Name"
                      />
                      {UpdateUserForm.errors.last_name &&
                      UpdateUserForm.touched.last_name ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateUserForm.errors.last_name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="phone" className="fs-4 fw-bold">
                       Phone
                      </label>
                      <input
                        type="text"
                        className="w-100"
                        id="phone"
                        name="phone"
                        value={UpdateUserForm.values.phone}
                        onChange={UpdateUserForm.handleChange}
                        onBlur={UpdateUserForm.handleBlur}
                        placeholder="Enter The Phone Number"
                      />
                      {UpdateUserForm.errors.phone &&
                      UpdateUserForm.touched.phone ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateUserForm.errors.phone}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="image" className="fs-4 fw-bold">
                        User Image
                      </label>
                      <input
                        type="file"
                        className="w-100 border"
                        id="image"
                        name="image"
                        onChange={(event) => {
                          UpdateUserForm.setFieldValue(
                            "image",
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={UpdateUserForm.handleBlur}
                      />

                      {UpdateUserForm.errors.image &&
                      UpdateUserForm.touched.image ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateUserForm.errors.image}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className={`d-flex justify-content-between my-3`}>
                  {isLoading ? (
                    <button
                      type="submit"
                      className={`${styles.UpdateUser_button}`}
                    >
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`${styles.UpdateUser_button}`}
                    >
                      Update User
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
