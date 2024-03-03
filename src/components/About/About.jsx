import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";
import { TokenContext } from "../../Context/Token";

export default function About() {
  const userToken = localStorage.getItem("userToken");
  const userId = jwtDecode(userToken).id;
  let {userData,setUserData} = useContext(TokenContext)


  useEffect(() => {
    setUserData(localStorage.getItem("userData"));
  }, []);
  
   userData = JSON.parse(localStorage.getItem("userData"));

  
  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>
      <div className="container mb-5 pb-5 overflow-hidden">
        <h1 className="text-main mb-5 fw-bold text-center" style={{ fontSize: "4rem" }}>
          User
        </h1>
        <h1>
          {userId}
        </h1>
        <h1>
          {userData.usertype}
        </h1>

          <div className="row gy-5">
            <div className="col-md-4 cursor-pointer">
              <div>
                <div className="text-center fw-bold py-4">
                  <p className="fs-3"> Name : {userData.first_name} {userData.last_name}</p>
                  <p className="fs-3">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        
      </div>
    </>
  );
}
