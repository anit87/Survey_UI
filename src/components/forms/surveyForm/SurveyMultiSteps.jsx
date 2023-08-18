import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import SurveyForm from './SurveyForm';

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
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <p>All steps completed</p>
          </div>
        ) : (
          <div>
            {<SurveyForm activeStep={activeStep} submitDisabled={Boolean(activeStep===steps.length - 1)} />}

            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button disabled={activeStep === steps.length - 1} variant="contained" color="primary" onClick={handleNext}>
              Next
              {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyMultiSteps;

