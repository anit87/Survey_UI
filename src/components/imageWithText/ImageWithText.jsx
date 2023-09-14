// import React, { useState, useEffect } from 'react';
// import { Button } from '@mui/material'
// import './ImageWithText.css'; // Import your CSS file
// import { Link } from 'react-router-dom';
// import { reset } from '../../features/auth/authSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { verifyUser } from '../../utils/functions/verifyUser';

// const ImageWithText = ({ image }) => {
//     const dispatch = useDispatch()
//     const [userDetail, setUserDetail] = useState({})
//     const token = useSelector(state => state.auth.token)
//     useEffect(() => {
//         const user = verifyUser(token)
//         setUserDetail(user)
//     }, [])

//     return (
//         <div className="image-container ">
//             <img style={{ width: "100%" }} src={image} alt="Image" />
//             <div className="overlay d-flex justify-content-evenly">
//                 <div className='' >
//                     <Link to="/surveys" >
//                         <Button> Dashboard </Button>
//                     </Link>
//                     {
//                         userDetail.userRole !== '3' &&
//                         <Link to="/allusers" >
//                             <Button> All Users </Button>
//                         </Link>
//                     }
//                     {
//                         userDetail.userRole !== 'admin' &&
//                         <Link to="/form" >
//                             <Button> Survey Form </Button>
//                         </Link>
//                     }
//                 </div>

//                 <Link to="/" onClick={async () => (localStorage.removeItem("surveyApp"), dispatch(reset()))} >
//                     <Button> SignOut </Button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default ImageWithText; 