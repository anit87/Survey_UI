// import React from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material'
// import { Link } from "react-router-dom"
// import { useDispatch, useSelector } from 'react-redux';
// import { reset } from "../features/auth/authSlice"
// import "./Navbar.css"
// import flag from "../assets/flag.png"
// // import india from "../../assets/india1440.png"

// const Navbar = () => {
//     const dispatch = useDispatch()
//     const status = useSelector(state => state.auth.status)
//     const token = localStorage.getItem("surveyApp")
//     return (
//         <nav className='nav'>
//             <div className="logo">
//                 <img src={flag} alt="Flag Image" />
//             </div>
//             <div className="hamburger">
//                 <div className="line1"></div>
//                 <div className="line2"></div>
//                 <div className="line3"></div>
//             </div>
//             <ul className="nav-links">
//                 <li><a href="#">Home</a></li>
//                 <li><a href="#">Solutions</a></li>
//                 <li><a href="#">Products</a></li>
//                 <li><button className="login-button" href="#">Login</button></li>
//             </ul>
//         </nav >
//     )
// }

// export default Navbar




import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { reset } from "../features/auth/authSlice"
import flag from "../assets/flag.png"
import "./Navbar.css"

const Navbar = () => {
    const dispatch = useDispatch()
    const status = useSelector(state => state.auth.status)
    const token = localStorage.getItem("surveyApp")
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light nav mb-3">
            <div className="container-fluid" >
                <div className="navbar-brand logo">
                    <img src={flag} alt="Flag Image" />
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/surveys" >
                                <div className='nav-link' style={{ color: "#ffffff" }}> Dashboard </div>
                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link to="/allusers" >
                                <div className='nav-link' style={{ color: "#ffffff" }}> All Users </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/form" >
                                <div className='nav-link' style={{ color: "#ffffff" }}> Survey Form </div>
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        


                        <Link to="/" onClick={async () => (localStorage.removeItem("surveyApp"), dispatch(reset()))} >
                            
                            <button style={{ color: "#ffffff" }} className="btn" type="submit">Logout</button>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    )
    // return (
    //     <AppBar style={{background:"#1565c0"}} position="static">
    //         <Toolbar>
    //             <Typography variant="h6" style={{ flexGrow: 1 }}>

    //             </Typography>

    //             {(status || token) && <Link to="/" onClick={async () => (localStorage.removeItem("surveyApp"), dispatch(reset()))} >
    //                 <Button> SignOut </Button>
    //             </Link>}
    //         </Toolbar>
    //     </AppBar>
    // )

}

export default Navbar
