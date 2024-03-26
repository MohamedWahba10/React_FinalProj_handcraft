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
    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("usertype", values.usertype);
    // if (values.shopname) {
    //   formData.append("shopname", values.shopname);
    // } else if (!values.shopname && UserData && UserData.shopname) {
    //   formData.append("shopname", UserData.shopname);
    // }
    // if (values.ssn) {
    //   formData.append("ssn", values.ssn);
    // } else if (!values.ssn && UserData && UserData.ssn) {
    //   formData.append("ssn", UserData.ssn);
    // }
    formData.append("shopname", values.shopname || UserData.shopname || "");
    formData.append("ssn", values.ssn || UserData.ssn || "");
    if (values.image && values.image instanceof File) {
      formData.append("image", values.image);
    } else if (!values.image && UserData && UserData.ImageUrl) {
      formData.append("image", UserData.ImageUrl);
    }
    formData.append("password", UserData.password);

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
      console.log("responsedddddddd", response);

      if ((response.data.message = "User updated successfully")) {
        navigate("/adminPanel/adminUser");
        setisLoading(false);
      }
    } catch (error) {
      setError(error.response.data.error);

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
    address: Yup.string(),

    email: Yup.string().email("Invalid email address").required("Required"),
    usertype: Yup.string()
      .oneOf(["customer", "vendor"], "Please select a valid user type")
      .required("User type is required"),
    shopname: Yup.string().when("usertype", {
      is: "vendor",
      then: () => Yup.string().required("shopname is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    ssn: Yup.string().when("usertype", {
      is: "vendor",
      then: () =>
        Yup.string().matches(/^\d{14}$/, "SSN must be a 14-digit number").required("ssn is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
  });

  const UpdateUserForm = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      usertype: "",
      ssn: "",
      password: "",
      shopname: "",
      image: "",
      address: "",
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
        image: UserData.ImageUrl || "",
        password: UserData.password || "",
        address: UserData.address || "",
        email: UserData.email || "",
        shopname: UserData.shopname || "",
        usertype: UserData.usertype || "",
        ssn: UserData.ssn || "",
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

        <div className="container py-5">
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email" className="fs-4 fw-bold">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-100"
                        id="email"
                        name="email"
                        value={UpdateUserForm.values.email}
                        onChange={UpdateUserForm.handleChange}
                        onBlur={UpdateUserForm.handleBlur}
                        placeholder="Enter The Email"
                      />
                      {UpdateUserForm.errors.email &&
                      UpdateUserForm.touched.email ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateUserForm.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="address" className="fs-4 fw-bold">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-100"
                        id="address"
                        name="address"
                        value={UpdateUserForm.values.address}
                        onChange={UpdateUserForm.handleChange}
                        onBlur={UpdateUserForm.handleBlur}
                        placeholder="Enter The Address"
                      />
                      {UpdateUserForm.errors.address &&
                      UpdateUserForm.touched.address ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateUserForm.errors.address}
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
                    <div className="form-group my-3">
                      <label htmlFor="usertype" className="fs-4 fw-bold">
                        User Type
                      </label>
                      <select
                        className="w-100"
                        id="usertype"
                        name="usertype"
                        onChange={UpdateUserForm.handleChange}
                        onBlur={UpdateUserForm.handleBlur}
                        value={UpdateUserForm.values.usertype}
                      >
                        <option
                          value=""
                          selected={UpdateUserForm.values.usertype}
                        >
                          Select User Role
                        </option>
                        <option value="customer">Customer</option>
                        <option value="vendor">Vendor</option>
                      </select>
                      {UpdateUserForm.touched.usertype &&
                      UpdateUserForm.errors.usertype ? (
                        <div className="text-danger fs-5 mt-3">
                          {UpdateUserForm.errors.usertype}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {UpdateUserForm.values.usertype === "vendor" ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="ssn" className="fs-4 fw-bold">
                          SSN
                        </label>
                        <input
                          type="text"
                          className="w-100"
                          id="ssn"
                          name="ssn"
                          value={UpdateUserForm.values.ssn}
                          onChange={UpdateUserForm.handleChange}
                          onBlur={UpdateUserForm.handleBlur}
                          placeholder="Enter The SNN"
                        />
                        {UpdateUserForm.errors.ssn &&
                        UpdateUserForm.touched.ssn ? (
                          <div className="text-danger fs-5 mt-3">
                            {UpdateUserForm.errors.ssn}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  {UpdateUserForm.values.usertype === "vendor" ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="shopname" className="fs-4 fw-bold">
                          Shop Name
                        </label>
                        <input
                          type="text"
                          className="w-100"
                          id="shopname"
                          name="shopname"
                          value={UpdateUserForm.values.shopname}
                          onChange={UpdateUserForm.handleChange}
                          onBlur={UpdateUserForm.handleBlur}
                          placeholder="Enter The Shop Nane"
                        />
                        {UpdateUserForm.errors.shopname &&
                        UpdateUserForm.touched.shopname ? (
                          <div className="text-danger fs-5 mt-3">
                            {UpdateUserForm.errors.shopname}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
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
