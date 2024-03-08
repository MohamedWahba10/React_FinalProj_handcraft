import React, { useEffect, useState } from "react";
import styles from "./UpdateProduct.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";


export default function UpdateProduct() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
          try {
            const response = await axios.get(
              `http://127.0.0.1:8000/api/subcategory/`,
            );
            setCategories(response.data.data);
          } catch (error) {
            setError(error.message);
          }
        }
    
        fetchCategories();
      }, []);
  return (
    <>
      <Helmet>
        <title>UpdateProduct</title>
      </Helmet>
      <div className={`${styles.header_UpdateProduct} py-5 mb-5 text-center `}>
        <h1>Update Product</h1>

        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>

        <span className={`${styles.span_UpdateProduct}`}>&gt; Update Product</span>
      </div>
      <div className="container my-5 py-5">
        <div>
          <div className={`${styles.form_UpdateProduct}`}>
          
            <form
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
                      placeholder="Enter The Product Name"
                      
                      
                    />
                   
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
                    />
                   
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
                      name="prodQuantity"
                      placeholder="Enter The Product Quantity"
                    />
                  
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
                    >
                      <option value="">Select Category</option>
                      {Array.isArray(categories) &&
                        categories.map((category) => (
                          <option value={category.id} key={category.id}>
                            {category.subCateName}
                          </option>
                        ))}
                    </select>
                   
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
                    ></textarea>
                 
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
                    />

                 
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
                    />
             
                  </div>
                </div>
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
