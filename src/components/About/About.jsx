import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";
import { TokenContext } from "../../Context/Token";

export default function About() {
  const userToken = localStorage.getItem("userToken");
  const userId = jwtDecode(userToken).id;
  let { userData, setUserData } = useContext(TokenContext);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUserData(localStorage.getItem("userData"));
  }, []);

  userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/subcategory/`
        );
        setCategories(response.data.data);
        console.log('response is .........',response)
        console.log('data is .........',response.data.data)
        console.log("categors is................",categories)
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCategories();
  }, []);
  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>
      <div className="container mb-5 pb-5 overflow-hidden">
        <h1
          className="text-main mb-5 fw-bold text-center"
          style={{ fontSize: "4rem" }}
        >
          User
        </h1>
        <h1>{userId}</h1>
        <h1>{userData.usertype}</h1>

        <div className="row gy-5">
          <div className="col-md-4 cursor-pointer">
            <div>
              <div className="text-center fw-bold py-4">
                <p className="fs-3">
                  {" "}
                  Name : {userData.first_name} {userData.last_name}
                </p>
                <p className="fs-3">{userData.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {Array.isArray(categories) && categories.map((cat) => (
            <div className="col-12" key={cat.id}>
              <p>CategoryName: {cat.subCateName}</p>
            </div>
          ))}
          {error && <p>Error: {error}</p>}
        </div>
      </div>
    </>
  );
}
