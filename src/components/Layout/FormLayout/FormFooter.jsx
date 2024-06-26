import React from "react";
import PropTypes from "prop-types";
import { GenericButton } from "../../GenericComponents";
import { LoaderCenter } from "../../../assets";

const FormFooter = ({
  nextStep,
  prevStep,
  step,
  loading,
  handleSubmit,
  isProfilePictureSelected,
}) => {
  const handleNextClick = () => {
    if (step === 8) {
      handleSubmit();
    } else {
      nextStep();
    }
  };

  return (
    <footer className="w-100 bg-white p-3 border-top">
      <div className="form-navigation d-flex justify-content-between w-100">
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
        {step < 8 && (
          <GenericButton
            height="46px"
            width="216px"
            className=""
            onClick={nextStep}
          >
            Next
          </GenericButton>
        )}
        {step === 8 && (
          <GenericButton
            height="46px"
            width="216px"
            className=""
            onClick={handleNextClick}
            disabled={loading}
          >
            {loading ? <LoaderCenter /> : "Submit"}
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
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isProfilePictureSelected: PropTypes.bool.isRequired,
};

export default FormFooter;
