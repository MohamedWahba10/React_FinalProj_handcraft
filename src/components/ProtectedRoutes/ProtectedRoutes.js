
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {

  if(localStorage.getItem("userToken")!= null){
    return props.children
  }else{
   return <Navigate to={'/login'} />
  }


}

export default ProtectedRoutes;