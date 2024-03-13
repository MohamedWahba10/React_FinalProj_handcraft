import React from "react";
import styles from "./NotFound.module.css";
import error from "../../assets/images/error.png";
export default function NotFound() {
  return (
    <>
      <section className="container my-5 mx-auto">
            <div className="w-100 d-flex justify-content-center align-items-center ">
            <img src={error} alt="pageNotFound w-100"/>
            </div>
      </section>
    </>
  );
}
