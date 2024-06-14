import React from "react";
import PropTypes from "prop-types";
import { GenericButton } from "../../GenericComponents";

const FormFooter = ({ nextStep, prevStep, step }) => {
  return (
    <footer fixed="bottom" className="w-100 bg-white p-3 border-top">
      <div className="form-navigation d-flex justify-content-between">
        <GenericButton
          height="46px"
          width="216px"
          background="#EAFFFE"
          borderColor="#EAFFFE"
          color="#00C1B6"
          className=""
          disabled={step === 1}
          onClick={prevStep}
        >
          Back
        </GenericButton>
        {step < 9 && (
          <GenericButton
            height="46px"
            width="216px"
            className=""
            onClick={nextStep}
          >
            Next
          </GenericButton>
        )}
        {step === 9 && (
          <GenericButton
            height="46px"
            width="216px"
            className=""
            onClick={nextStep}
          >
            Submit
          </GenericButton>
        )}
      </div>
    </footer>
  );
};

FormFooter.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

export default FormFooter;
