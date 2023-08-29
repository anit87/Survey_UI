import React, { useState, useEffect } from 'react'
import { Button, Box, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { Formik, Form } from "formik"
import { useDispatch, useSelector } from 'react-redux'

import { signUpSchema } from "../../utils/schemas/auth"
import { fetchAuthData } from '../../features/auth/authSlice'
import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import Alert from '../Alert'
import { verifyUser } from '../../utils/functions/verifyUser'

const apiUrl = `/auth/signup`

const roles = [
    {
        label: "Admin",
        value: "user"
    },
    {
        label: "Field User",
        value: "fielduser"
    }
]
const userRoleOp = [{ label: "User", value: "user" }]
const fieldRoleOp = [{ label: "Field User", value: "fielduser" }]

const initialValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userRole: "fielduser"
}

const CreateUser = () => {
    const dispatch = useDispatch()
    const [userRole, setUserRole] = useState(" ")
    const [alert, setAlert] = useState(false);

    const alertfn = () => {
        setTimeout(() => setAlert(true), 1000);
    }
    useEffect(() => {
        const {userRole} = verifyUser()
        setUserRole(userRole)     
    }, [userRole])
    
    console.log(userRole);

    const { data, error, loading, msg } = useSelector(state => state.auth)

    return (
        <>
            <Alert open={alert} type={error ? "error" : "info"} msg={msg} onClose={() => setAlert(false)} />

            <Formik
                initialValues={initialValues}
                validationSchema={signUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(fetchAuthData(
                        {
                            apiUrl: import.meta.env.VITE_API_URL + apiUrl,
                            bodyOfRequest: values,
                            method: "POST"
                        }
                    ));
                    alertfn()
                    setSubmitting(false);
                }}
            >
                <Box
                    sx={{
                        my: 1,
                        mx: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                >
                    <h6  style={{fontSize:"20px", fontWeight:"bold"}} >Users</h6>
                   
                    <Box sx={{ mt: 1 }} >
                        <Form>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        label="Name"
                                        name="displayName"
                                        type="text"
                                        placeholder="Enter Your Name"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>

                                    <TextInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter Your Email"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="*******"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="*******"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        label="Phone Number"
                                        name="phoneNumber"
                                        type="text"
                                        placeholder="Enter Phone Number"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <SelectInput
                                        label="Choose Role"
                                        title="Choose Role for the new user"
                                        name="userRole"
                                        id="userRole"
                                        options={roles}
                                    // disabled={userRole !== 'admin'}
                                    // disabled={true}
                                    // value={userRole === 'admin'? 'user': 'fielduser'}
                                    />
                                </Grid>
                            </Grid>
                            <Button variant='contained' type='submit' sx={{ mt: 3, mb: 2,mr:2 }} >Create</Button>
                            <Button variant='contained' type='button' sx={{ mt: 3, mb: 2 }} >Cancel</Button>
                        </Form>
                    </Box>
                </Box>
            </Formik >
        </>
    )
}

export default CreateUser

