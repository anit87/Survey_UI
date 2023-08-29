import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import './ImageWithText.css'; // Import your CSS file
import { useNavigate, Link } from 'react-router-dom';
import { reset } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const ImageWithText = ({ image }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className="image-container ">
            <img style={{ width: "100%" }} src={image} alt="Image" />
            <div className="overlay d-flex justify-content-evenly">
                <div className='' >
                    <Link to="/surveys" >
                        <Button> Dashboard </Button>
                    </Link>
                    <Link to="/allusers" >
                        <Button> All Users </Button>
                    </Link>
                    <Link to="/form" >
                        <Button> Survey Form </Button>
                    </Link>
                </div>
              
                <Link to="/" onClick={async () => (localStorage.removeItem("surveyApp"), dispatch(reset()))} >
                    <Button> SignOut </Button>
                </Link>
            </div>
        </div>
    );
};

export default ImageWithText;