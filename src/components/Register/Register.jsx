import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from "./Register.module.css";


export default function Register() {

  let validationSchema = Yup.object({
    first_name: Yup.string().matches(/^[a-zA-Z]{3,10}$/, "name must be from 3 to 10 letters").required('Required'),
    last_name: Yup.string().matches(/^[a-zA-Z]{3,10}$/, "name must be from 3 to 10 letters").required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must be at least 8 characters , letters and digits').required('Password is required'),
    usertype: Yup.string().oneOf(['customer', 'vendor'], 'Please select a valid user type').required('User type is required'),
    shopname: Yup.string().when('usertype', {
      is: 'vendor',
      then: () => Yup.string().required('Shop name is required'),
      otherwise: () => Yup.string().notRequired()
    }),
    ssn: Yup.string().when('usertype', {
      is: 'vendor',
      then: () => Yup.string().matches(/^\d{14}$/, 'SSN must be a 14-digit number').required('SSN is required'),
      otherwise: () =>Yup.string().notRequired()    
    }),
    
    
    
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: "",
      usertype: '',
      address: '',
      shopname: '',
      ssn: ''
    },
    validationSchema: validationSchema,


    onSubmit: (values) => {
      if (values.usertype === 'customer') {
        values.shopname = ""; // Set shopname to null for customer
      }
      console.log(values);
    }
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className={`${styles.header_register} py-5 mb-5 text-center`}>
        <h1>Register</h1>
        <Link to="/">
          <span className={`${styles.link_home} pe-1`}>HomePage</span>
        </Link>
        <span className={`${styles.span_register}`}>&gt; Register</span>
      </div>
      <div className="container my-5 py-5">
        <div className="row gy-5">
          <div className={`col-md-6 ${styles.form_register}`}>
            <h2>Register</h2>
            {/* onSubmit automatic will connect with onSubmit function (values) */}

            <form onSubmit={formik.handleSubmit}>
              <div className="form-group my-3">
                <input
                  type="text"
                  className="w-100"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div className="text-danger fs-5 mt-3">{formik.errors.first_name}</div>
                ) : null}
              </div>

              <div className="form-group my-3">
                <input
                  type="text"
                  className="w-100"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div className="text-danger fs-5 mt-3">{formik.errors.last_name}</div>
                ) : null}
              </div>
              <div className="form-group my-3">
                <input
                  type="email"
                  className="w-100"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger fs-5 mt-3">{formik.errors.email}</div>
                ) : null}
              </div>




              <div className="form-group my-3">
                <input
                  type="password"
                  className="w-100"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger fs-5 mt-3">{formik.errors.password}</div>
                ) : null}
              </div>



              <div className="form-group my-3">
                <select
                  className="form-select w-100"
                  id="usertype"
                  name="usertype"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.usertype}
                >
                  <option value="">Select User Role</option>
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                </select>
                {formik.touched.usertype && formik.errors.usertype ? (
                  <div className="text-danger fs-5 mt-3">{formik.errors.usertype}</div>
                ) : null}
              </div>
              {
                formik.values.usertype === 'vendor' ? (
                  <div className="form-group my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="shopname"
                      name="shopname"
                      placeholder="Shop Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.shopname}
                    />
                    {formik.touched.shopname && formik.errors.shopname ? (
                      <div className="text-danger fs-5 mt-3">{formik.errors.shopname}</div>
                    ) : null}
                  </div>
                ) : null

              }

              {
                formik.values.usertype === 'vendor' && (
                  <div className="form-group my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="ssn"
                      name="ssn"
                      placeholder="Social Security Number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ssn}
                    />
                    {formik.touched.ssn && formik.errors.ssn ? (
                      <div className="text-danger fs-5 mt-3">{formik.errors.ssn}</div>
                    ) : null}
                  </div>
                )
              }




              <div className={`d-flex justify-content-between my-3`}>
                <button type="submit" className={`${styles.register_button}`}>
                  REGISTER
                </button>
              </div>
            </form>


          </div>
          <div className={`col-md-5 ${styles.new_account} offset-md-1 d-flex align-items-center`}>
            <div className="d-flex flex-column">
              <h3>Already have an account?</h3>
              <p>Welcome Back Sign in to access your personalized experience ,saved perefernces ,  and more we 're thrilled to have you with us again</p>
              <Link className='text-decoration-none' to="/login">
                <span className={`${styles.register_button}`} >Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



