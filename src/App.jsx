import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import SurveyForm from './pages/SurveyForm'
import ProtectedRoute from "./components/ProtectedRoute"
import LoginSignUp from './pages/LoginSignUp'
import SignIn from './components/forms/LoginForm'
import SignUp from './components/forms/SignUp'
import ResetPassword from './components/forms/ResetPassword'
import Navbar from './components/Navbar'
import Layout from './components/admin/Layout'
import CreateUser from './components/forms/CreateUser'
import SurveyMultiStepForm from './components/forms/surveyForm/SurveyMultiSteps'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={<ProtectedRoute><LoginSignUp /></ProtectedRoute>}>
            <Route index element={<SignIn />} />
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/reset' element={<ResetPassword />} />
          </Route> */}
          <Route path='/' element={<SurveyMultiStepForm />} />
          {/* <Route path='/form' element={<ProtectedRoute><SurveyMultiStepForm /></ProtectedRoute>} /> */}
          <Route path='/createuser' element={<ProtectedRoute><Layout><CreateUser/></Layout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
