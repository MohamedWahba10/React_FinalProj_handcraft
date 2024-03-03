import React, { useEffect, useState } from "react";
import styles from "./Loading.module.css";

import { TailSpin } from "react-loader-spinner";

export default function Loading() {




  return (
    <>
    <div className={`${styles.loading} d-flex justify-content-center align-items-center`}>
    <TailSpin 
  visible={true}
  height="80"
  width="80"
  color="black"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
 
    </div>

  
    </>
  );
}
