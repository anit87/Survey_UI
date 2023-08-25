import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import SurveyForm from './SurveyForm';
import india from "../../../assets/india.jpg"

const steps = ['Basic Details', 'About Family', 'Qualifications', 'General', 'Family Details']; // Define your steps here

const SurveyMultiSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <div className='d-flex align-items-center' style={{ backgroundColor: 'grey' }} >
        <img width='100px' src={india} />
        <Typography variant="h6" color='primary' gutterBottom
          style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}
        >
          Survey Form
        </Typography>
      </div>
      
      <br/>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div >
          {<SurveyForm activeStep={activeStep} submitDisabled={Boolean(activeStep === steps.length - 1)} />}
          <div style={{ margin: activeStep !== steps.length - 1 ? "1.5rem" : "0px" }}  >
            {activeStep !== 0 &&
              <Button disabled={activeStep === 0} onClick={handleBack} variant="contained" color="primary" sx={{ mr: '1rem' }} >
                Back
              </Button>}
            {activeStep !== steps.length - 1 &&
              <Button disabled={activeStep === steps.length - 1} variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyMultiSteps;

