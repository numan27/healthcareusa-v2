import React, { useState } from "react";
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
  const [isProfilePictureSelected, setIsProfilePictureSelected] =
    useState(false);

  const handleProfilePictureSelection = (selected) => {
    setIsProfilePictureSelected(selected);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormHeader />
      <main style={{ flex: "1" }}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              handleProfilePictureSelection,
            });
          }
          return child;
        })}
      </main>
      {step < 9 && (
        <FormFooter
          nextStep={nextStep}
          prevStep={prevStep}
          step={step}
          loading={loading}
          handleSubmit={handleSubmit}
          isProfilePictureSelected={isProfilePictureSelected}
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
