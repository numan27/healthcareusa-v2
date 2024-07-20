import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Wrapper = styled(Box)`
  width: 100%;

  // .MuiStepLabel-iconContainer {
  //   background-color: #023047;
  // }
  .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root {
    color: #eaffff;
    width: 33px !important;
    height: 33px !important;
  }
  .MuiStepLabel-iconContainer
    .Mui-disabled
    .css-vnkopk-MuiStepLabel-iconContainer {
    color: #023047 !important;
  }
  .css-117w1su-MuiStepIcon-text {
    fill: #023047;
  }
  .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active {
    color: #00c1b6 !important;
  }
`;

const NavigationButton = styled(Button)`
  margin-right: 8px;
`;

const CustomStep = styled(Step)`
  &.MuiStep-root {
    ${({ customStyles }) => customStyles}
  }
`;

const CustomStepLabel = styled(StepLabel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  ${({ customStyles }) => customStyles}
`;

const LabelText = styled(Typography)`
  margin-top: 8px;
  text-align: center;
`;

const GenericStepper = ({
  steps = [],
  optionalSteps = [],
  stepLabels = steps,
  stepContent = [],
  stepStyles = [],
  labelStyles = [],
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => optionalSteps.includes(step);

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Wrapper>
      <Stepper activeStep={activeStep}>
        {stepLabels.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <CustomStep
              key={label}
              {...stepProps}
              customStyles={stepStyles[index]}
              className=""
            >
              <CustomStepLabel
                {...labelProps}
                customStyles={labelStyles[index]}
              >
                <Box>
                  {/* You can place any custom step icon or indicator here */}
                </Box>
                <LabelText>{label}</LabelText>
              </CustomStepLabel>
            </CustomStep>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>{stepContent[activeStep]}</Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <NavigationButton
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </NavigationButton>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <NavigationButton color="inherit" onClick={handleSkip}>
                Skip
              </NavigationButton>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default GenericStepper;
