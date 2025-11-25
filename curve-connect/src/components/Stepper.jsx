"use client";

import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Select Card", "Add Details", "Confirmation"];

export default function StepperComponent({ activeStep = 0 }) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{ width: "100%", maxWidth: 500, mb: 6 }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
