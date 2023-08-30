import React, { useState, useEffect } from 'react'
import { Button, Box, Grid, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import { useDispatch, useSelector } from 'react-redux'

import { signUpSchema } from "../../utils/schemas/auth"
import { fetchAuthData } from '../../features/auth/authSlice'
import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import Alert from '../Alert'
import { verifyUser } from '../../utils/functions/verifyUser'
import axios from 'axios'


const apiUrl = `/auth/signup`
const urlForAgentList = import.meta.env.VITE_API_URL + '/users/agentslist'

const roles = [
    {
        label: "Agent",
        value: "2"
    },
    {
        label: "Field Agent",
        value: "3"
    }
]
const userRoleOp = [{ label: "User", value: "user" }]
const fieldRoleOp = [{ label: "Field User", value: "fielduser" }]



const CreateUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data, error, loading, msg, token } = useSelector(state => state.auth)

    const [userRole, setUserRole] = useState("")
    const [agentsList, setAgentsList] = useState([])
    const [alert, setAlert] = useState(false);

    const alertfn = () => {
        setTimeout(() => setAlert(true), 1000);
    }
    useEffect(() => {
        const { userRole } = verifyUser(token)
        setUserRole(userRole)
    }, [userRole])

    useEffect(() => {
        allAgents()
    }, [])
    console.log("create user , UserRole", userRole);



    const allAgents = async () => {
        const resp = await axios.get(urlForAgentList)
        const data = resp.data.data
        const newArr = data.map(obj => {
            return { label: obj.displayName, value: obj._id }
        })
        setAgentsList(newArr)
    }

    const initialValues = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: "",
        userRole: "2",
        reportingAgent: ""
    }

    return (
        <>
            <Alert open={alert} type={error ? "error" : "info"} msg={msg} onClose={() => setAlert(false)} />

            <Formik
                initialValues={initialValues}
                validationSchema={signUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (userRole!=='admin') {
                        values.userRole='3'
                    } 
                    console.log(values);

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
                {(formik) => (
                    <Box
                        sx={{
                            my: 1,
                            mx: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                        }}
                    >
                        <h6 style={{ fontSize: "20px", fontWeight: "bold" }} >Users</h6>
                        {console.log("formik ", formik)}

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
                                        {userRole === 'admin' ?
                                            <SelectInput
                                                label="Choose Role"
                                                title="Choose Role for the new user"
                                                name="userRole"
                                                id="userRole"
                                                options={roles}
                                            /> :
                                            <SelectInput
                                                label="Choose Role"
                                                title="Choose Role for the new user"
                                                name="userRole"
                                                id="userRole"
                                                options={roles}
                                                value='3'
                                                disabled={true}
                                            />
                                        }
                                    </Grid>

                                    {userRole === 'admin' && formik.values.userRole === '3' && <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Choose Agent"
                                            name="reportingAgent"
                                            id="reportingAgent"
                                            options={agentsList}
                                        />
                                    </Grid>}
                                </Grid>
                                <Button variant='contained' type='submit' sx={{ mt: 3, mb: 2, mr: 2 }} >Create</Button>
                                <Button variant='contained' type='button' onClick={() => navigate("/allusers")} sx={{ mt: 3, mb: 2 }} >Cancel</Button>
                            </Form>
                        </Box>
                    </Box>
                )}
            </Formik >
        </>
    )
}

export default CreateUser

