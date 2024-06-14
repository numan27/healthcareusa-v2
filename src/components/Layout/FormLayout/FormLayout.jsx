import React from "react";
import PropTypes from "prop-types";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

const FormLayout = ({ children, nextStep, prevStep, step }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <FormHeader />
      <main style={{ flex: "1", overflow: "hidden" }}>{children}</main>
      <FormFooter nextStep={nextStep} prevStep={prevStep} step={step} />
    </div>
  );
};

FormLayout.propTypes = {
  children: PropTypes.node.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

export default FormLayout;
