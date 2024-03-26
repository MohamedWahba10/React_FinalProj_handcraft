import React, { useEffect, useState } from "react";
import styles from "./AddUser.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function AddUser() {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  async function callAddUser(values) {
    setisLoading(true);
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("usertype", values.usertype);
    formData.append("shopname", values.shopname);
    formData.append("ssn", values.ssn);
    formData.append("phone", values.phone);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("image", values.image);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/panel/addUser/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if ((response.data.error)) {
        // navigate("/adminPanel/adminUser");
        setError(response.data.error);
        console.log("response tehe user",response)
        setisLoading(false);
      } else {
        console.log("response tehe user",response)

        navigate("/adminPanel/adminUser");
      }
    } catch (error) {
      setError(error.response.data.error);

      setisLoading(false);
      console.error("Error during AddUser:", error);
    }
  }
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .matches(/^[a-zA-Z]{3,10}$/, "name must be from 3 to 10 letters")
      .required("Required"),
    last_name: Yup.string()
      .matches(/^[a-zA-Z]{3,10}$/, "name must be from 3 to 10 letters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.?[A-Z])(?=.?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password must contain at least  8 characters , one uppercase , letters and digits"
      )
      .required("Password is required"),
    usertype: Yup.string()
      .oneOf(["customer", "vendor"], "Please select a valid user type")
      .required("User type is required"),
    shopname: Yup.string().when("usertype", {
      is: "vendor",
      then: () => Yup.string().required("Shop name is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    ssn: Yup.string().when("usertype", {
      is: "vendor",
      then: () =>
        Yup.string()
          .matches(/^\d{14}$/, "SSN must be a 14-digit number")
          .required("SSN is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    phone: Yup.string()
      .matches(/^01[1250]\d{8}$/, "invalid Number Phone")
      .required("Phone is required"),
    address: Yup.string().required("Address is required"),
    image: Yup.string().required("Image is Required"),
  });

  const AddUserForm = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      usertype: "",
      address: "",
      shopname: "",
      ssn: "",
      image: "",
    },
    validationSchema,
    onSubmit: (values) => callAddUser(values),
  });

  return (
    <>
      <div className={`${styles.header_AddUser} py-5 mb-5 mx-5 `}>
        <Link to="/adminPanel/adminUser" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Users</span>
        </Link>

        <span className={`${styles.span_AddUser}`}>/ Add User</span>

        <div className="container py-5">
          <div>
            <h2 className="text-center my-3">Add User</h2>

            <div className={`${styles.form_AddUser}`}>
              {error ? <div className="alert alert-danger"> {error}</div> : ""}

              <form
                onSubmit={AddUserForm.handleSubmit}
                encType="multipart/form-data"
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="form-group my-3">
                      <input
                        type="text"
                        className="w-100"
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                        onChange={AddUserForm.handleChange}
                        onBlur={AddUserForm.handleBlur}
                        value={AddUserForm.values.first_name}
                      />
                      {AddUserForm.touched.first_name &&
                      AddUserForm.errors.first_name ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddUserForm.errors.first_name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group my-3">
                      <input
                        type="text"
                        className="w-100"
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={AddUserForm.handleChange}
                        onBlur={AddUserForm.handleBlur}
                        value={AddUserForm.values.last_name}
                      />
                      {AddUserForm.touched.last_name &&
                      AddUserForm.errors.last_name ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddUserForm.errors.last_name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group my-3">
                      <input
                        type="email"
                        className="w-100"
                        id="email"
                        name="email"
                        placeholder="Enter Your Email"
                        onChange={AddUserForm.handleChange}
                        onBlur={AddUserForm.handleBlur}
                        value={AddUserForm.values.email}
                      />
                      {AddUserForm.touched.email && AddUserForm.errors.email ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddUserForm.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group my-3">
                      <input
                        type="password"
                        className="w-100"
                        id="password"
                        name="password"
                        placeholder="Enter Your Password"
                        onChange={AddUserForm.handleChange}
                        onBlur={AddUserForm.handleBlur}
                        value={AddUserForm.values.password}
                      />
                      {AddUserForm.touched.password &&
                      AddUserForm.errors.password ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddUserForm.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group my-3">
                      <input
                        type="text"
                        className="w-100"
                        id="address"
                        name="address"
                        placeholder="Enter Your Address"
                        onChange={AddUserForm.handleChange}
                        onBlur={AddUserForm.handleBlur}
                        value={AddUserForm.values.address}
                      />
                      {AddUserForm.touched.address &&
                      AddUserForm.errors.address ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddUserForm.errors.address}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group my-3">
                      <input
                        type="text"
                        className="w-100"
                        id="phone"
                        name="phone"
                        placeholder="Enter Your Phone"
                        onChange={AddUserForm.handleChange}
                        onBlur={AddUserForm.handleBlur}
                        value={AddUserForm.values.phone}
                      />
                      {AddUserForm.touched.phone && AddUserForm.errors.phone ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddUserForm.errors.phone}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="file"
                        className="w-100 border"
                        id="image"
                        name="image"
                        onChange={(event) => {
                          AddUserForm.setFieldValue(
                            "image",
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={AddUserForm.handleBlur}
                      />

                      {AddUserForm.errors.image && AddUserForm.touched.image ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddUserForm.errors.image}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group my-3">
                      <select
                        className="w-100"
                        id="usertype"
                        name="usertype"
                        onChange={AddUserForm.handleChange}
                        onBlur={AddUserForm.handleBlur}
                        value={AddUserForm.values.usertype}
                      >
                        <option value="">Select User Role</option>
                        <option value="customer">Customer</option>
                        <option value="vendor">Vendor</option>
                      </select>
                      {AddUserForm.touched.usertype &&
                      AddUserForm.errors.usertype ? (
                        <div className="text-danger fs-5 mt-3">
                          {AddUserForm.errors.usertype}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {AddUserForm.values.usertype === "vendor" ? (
                    <div className="col-md-6">
                      <div className="form-group my-3">
                        <input
                          type="text"
                          className="w-100"
                          id="shopname"
                          name="shopname"
                          placeholder="Shop Name"
                          onChange={AddUserForm.handleChange}
                          onBlur={AddUserForm.handleBlur}
                          value={AddUserForm.values.shopname}
                        />
                        {AddUserForm.touched.shopname &&
                        AddUserForm.errors.shopname ? (
                          <div className="text-danger fs-5 mt-3">
                            {AddUserForm.errors.shopname}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {AddUserForm.values.usertype === "vendor" && (
                    <div className="col-md-6">
                      <div className="form-group my-3">
                        <input
                          type="text"
                          className="w-100"
                          id="ssn"
                          name="ssn"
                          placeholder="Social Security Number"
                          onChange={AddUserForm.handleChange}
                          onBlur={AddUserForm.handleBlur}
                          value={AddUserForm.values.ssn}
                        />
                        {AddUserForm.touched.ssn && AddUserForm.errors.ssn ? (
                          <div className="text-danger fs-5 mt-3">
                            {AddUserForm.errors.ssn}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>

                <div className={`d-flex justify-content-between my-3`}>
                  {isLoading ? (
                    <button
                      type="submit"
                      className={`${styles.AddUser_button}`}
                    >
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`${styles.AddUser_button}`}
                    >
                      Add User
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
