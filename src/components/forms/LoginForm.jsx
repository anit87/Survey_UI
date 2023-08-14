import React, { useState, useEffect } from 'react'
import { Stack, Button, Box, Typography, Grid } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from "formik"

import Alert from '../Alert'
import { verifyUser } from '../../utils/functions/verifyUser'
import TextInput from '../inputs/TextInput'
import { signInSchema } from "../../utils/schemas/auth"
import { fetchAuthData } from '../../features/auth/authSlice'

const apiUrl = `/auth/signin`

const initialValues = {
  email: '',
  password: ''
}

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState("")
  const [alert, setAlert] = useState(false);

  const token = localStorage.getItem("token")

  useEffect(() => {
    verifyUser().then(resp => {
      if (resp.status) {
        navigate("/form ")
      }
    })
  }, [])


  const { data, error, loading, msg } = useSelector(state => state.auth)

  const alertfn = () => {
    setTimeout(() => setAlert(true), 100);
  }
  return (
    <>
      <Alert open={alert} type={error ? "error" : "info"} msg={msg} onClose={() => setAlert(false)} />
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
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
            my: 8,
            mx: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">Sign In</Typography>
          <Box sx={{ mt: 1 }} >
            <Form>
              <TextInput
                label="Email"
                title="Enter your email"
                name="email"
                type="email"
                placeholder="test@email.com"
              />

              <TextInput
                label="Password"
                title="11"
                name="password"
                type="text"
                placeholder="*******"
              />
              <Button variant='contained' type='submit' sx={{ mt: 3, mb: 2 }} fullWidth >SignIn</Button>
            </Form>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {/* Forgot password? */}
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Formik>
    </>
  )
}

export default SignIn