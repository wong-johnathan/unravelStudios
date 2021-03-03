import React from "react";
import { Stepper, Step } from "react-form-stepper";

const FormProgress = ({ activeStep = 1, steps = [] }) => {
  return (
    <Stepper activeStep={activeStep} styleConfig={{ completedBgColor: "#505e84", activeBgColor: "#4965ac" }}>
      {steps.map((step, index) => (
        <Step label={step.label} key={index} />
      ))}
    </Stepper>
  );
};

export default FormProgress;
