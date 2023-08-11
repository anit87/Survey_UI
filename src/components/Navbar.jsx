import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <AppBar sx={{ boxShadow: 0 }} color="transparent" position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My App
                </Typography>

                <Link to="/signin" >
                    <Button> SignIn </Button>
                </Link>

                <Link  to="/">
                    <Button> SignUp </Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
