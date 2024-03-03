
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedLogin = (props) => {

    if (localStorage.getItem("userToken") != null) {
        return <Navigate to={'/about'} />

    } else {
        return props.children
    }


}

export default ProtectedLogin;