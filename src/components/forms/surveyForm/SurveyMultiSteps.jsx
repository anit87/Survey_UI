import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import SurveyForm from './SurveyForm';
import SurveyFormNoneEdit from "./SurveyFormNoneEdit"
import india from "../../../assets/india1440.png"
import india1 from "../../../assets/india420.png"
import ImageWithText from '../../imageWithText/ImageWithText';
import Navbar from '../../Navbar';
import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL + '/users/record'

const steps = ['Basic Details', 'About Family', 'Qualifications', 'General', 'Family Details']; // Define your steps here

const SurveyMultiSteps = () => {

  const theme = useTheme();
  let { id } = useParams();
  const navigate = useNavigate()

  const [activeStep, setActiveStep] = useState(0);
  const [formsDetail, setFormsDetail] = useState({})
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  console.log("formsDetail  ", formsDetail);
  useEffect(() => {
    getUsers()
  }, [id])

  const getUsers = async () => {
    const response = await axios.post(apiUrl, { id: id })
    setFormsDetail(response.data.data)
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  console.log("id is ", id, "*");

  return (
    <div>
      {/* <ImageWithText image={isSmallScreen ? india1 : india} /> */}
      <Navbar/>
      <Toolbar />
      <h6 style={{ fontSize: "20px", fontWeight: "bold" }} >Survey Form</h6>
      <br />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div >
          {!id && <SurveyForm activeStep={activeStep} setActiveStep={setActiveStep} submitDisabled={Boolean(activeStep === steps.length - 1)} />}
          {id &&
            <SurveyFormNoneEdit
              activeStep={activeStep} submitDisabled={Boolean(activeStep === steps.length - 1)}
              formsDetail={formsDetail}
            />
          }
          <div style={{ margin: activeStep !== steps.length - 1 ? "1.5rem" : "1rem" }}>
            {activeStep !== 0 &&
              <Button disabled={activeStep === 0} onClick={handleBack} variant="contained" color="primary" sx={{ mr: '1rem' }} >
                Back
              </Button>}
            {activeStep !== steps.length - 1 &&
              <Button disabled={activeStep === steps.length - 1} variant="contained" color="primary" sx={{ mr: '1rem' }} onClick={handleNext}>
                Next
              </Button>}
            <Button variant="contained" color="primary" onClick={() =>navigate(-1)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyMultiSteps;

