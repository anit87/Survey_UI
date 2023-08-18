import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { reset } from "../features/auth/authSlice"

const Navbar = () => {
    const dispatch = useDispatch()
    const status = useSelector(state=>state.auth.status) 
    const token = localStorage.getItem("surveyApp")
    return (
        <AppBar sx={{ boxShadow: 0 }} color="transparent" position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                     
                </Typography>

                {!status && <Link to="/" >
                    <Button> SignIn </Button>
                </Link>}

                {!status && <Link to="/signup">
                    <Button> SignUp </Button>
                </Link>}

                {(status || token) && <Link to="/" onClick={async () => (localStorage.removeItem("surveyApp"), dispatch(reset()))} >
                    <Button> SignOut </Button>
                </Link>}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
