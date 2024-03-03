// import React, { useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';

// const ActivateAccount = () => {
//  const navigate = useNavigate();
//  const [searchParams] = useSearchParams();
//  const uid = searchParams.get('uid');
//  const token = searchParams.get('token');

//  useEffect(() => {
//     // Perform the activation logic here (e.g., send a request to your Django API)
//     // Here's an example using fetch:
//     fetch(`http://localhost:8000/api/activate/?uid=${uid}&token=${token}`)
//       .then(response => {
//         if (response.ok) {
//           // Redirect to the login page after successful activation
//           navigate('/login');
//         } else {
//           // Handle activation failure (e.g., display an error message)
//           console.error('Activation failed');
//         }
//       })
//       .catch(error => {
//         console.error('Error activating account:', error);
//       });
//  }, [uid, token, navigate]); // Dependencies array updated

//  return (
//     <div>
//       <p>Activating your account...</p>
//     </div>
//  );
// };

// export default ActivateAccount;
