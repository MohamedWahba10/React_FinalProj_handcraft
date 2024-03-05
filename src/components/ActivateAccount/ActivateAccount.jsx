// import { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// function ActivateAccount() {
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const uid = params.get('uid');
//         const token = params.get('token');

//         axios.get(`http://localhost:8000/api/activate/?uid=${uid}&token=${token}`)
//             .then(response => {
//                 console.log(response.data); // Log the response data
//                 if (response.data && response.data.message) {
//                     alert(response.data.message); // Show a success message
//                     navigate('/login'); // Redirect to the login page
//                 } else {
//                     throw new Error('Invalid response');
//                 }
//             })
//             .catch(error => {
//                 console.error(error); // Log the error
//                 alert(error.response ? error.response.data.error : 'An error occurred');
//                 navigate('/'); // Redirect to the home page or another appropriate page
//             });
//     }, [navigate, location.search]);

//     return null; // You can render a loading spinner or message here
// }

// export default ActivateAccount;
