import React from 'react'
import { Outlet } from 'react-router-dom';
import { Grid, Paper, CssBaseline } from "@mui/material"

const backgroundImage = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1102&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}

const LoginSignUp = () => {

    return (
        // <Grid container component="main" sx={{ height: '90vh' }}>
        //     <CssBaseline />
        //     <Grid
        //         item
        //         xs={false}
        //         sm={4}
        //         md={7}
        //         // sx={backgroundImage}
        //     />
        //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        //     </Grid>
        // </Grid>
        <Outlet />
    )
}

export default LoginSignUp