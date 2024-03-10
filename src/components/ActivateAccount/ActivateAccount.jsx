import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams

const VerifyEmailComponent = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    const { token } = useParams(); // Extract the token from the URL

    useEffect(() => {
        const handleVerifyEmail = async () => {
            try {
                const response = await axios.get(`/verify-email/${token}/`);
                setMessage(response.data.message);
                // Redirect to the login page after successful email verification
                navigate('/login');
            } catch (error) {
                console.error('Error verifying email:', error);
            }
        };

        if (token) {
            handleVerifyEmail();
        }
    }, [token, navigate]);

    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default VerifyEmailComponent;
