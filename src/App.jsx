import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import SurveyForm from './pages/SurveyForm'
import ProtectedRoute from "./components/ProtectedRoute"
import LoginSignUp from './pages/LoginSignUp'
import SignIn from './components/forms/LoginForm'
import SignUp from './components/forms/SignUp'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<SurveyForm />}>
            <Route index element={<SignIn />} />
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>
          <Route path='/form' element={<ProtectedRoute><SurveyForm /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
