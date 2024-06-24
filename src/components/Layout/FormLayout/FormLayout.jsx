import React from "react";
import PropTypes from "prop-types";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

const FormLayout = ({
  children,
  nextStep,
  prevStep,
  step,
  loading,
  handleSubmit,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormHeader />
      <main style={{ flex: "1" }}>{children}</main>
      {step < 9 && (
        <FormFooter
          nextStep={nextStep}
          prevStep={prevStep}
          step={step}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

FormLayout.propTypes = {
  children: PropTypes.node.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormLayout;
