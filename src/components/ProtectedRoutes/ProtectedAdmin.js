
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdmin = (props) => {
    const [dataUser, setDataUser] = useState(null);
    async function ProfileData() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("userToken")}`,
                },
            });
            setDataUser(response.data);
        } catch (error) {
            console.error("Failed to fetch profile data", error);
        }
    }

    useEffect(() => {
        ProfileData();
    }, []);
 
    if (!dataUser) {
        return null;
    }
    const superUser = dataUser?.message.is_superuser;
    if (superUser) {
        return props.children
    } else {
        return <Navigate to={'/profile'} />
    }


}

export default ProtectedAdmin;