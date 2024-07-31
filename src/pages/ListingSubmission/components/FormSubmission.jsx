import PropTypes from "prop-types";
import { useMemo } from "react";
import BasicInfo from "./Step1BasicInfo";
import BusinessAddress from "./Step2BusinessAddress";
import OperationalHours from "./Step3OperationalHours";
import Languages from "./Step4Languages";
import SocialMedia from "./Step5SocialMedia";
import AdditionalDetails from "./Step6AdditionalDetails";
import SubmittedBy from "./Step7SubmittedBy";
import UploadMedia from "./Step8UploadMedia";
import Review from "./Step9Review";
import FinalStep from "./FinalStep";

const FormSubmission = ({
  formData,
  setFormData,
  plan,
  nextStep,
  prevStep,
  step,
  handleSubmit,
}) => {
  const basicPlanSteps = useMemo(
    () => ({
      1: (
        <BasicInfo
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      ),
      2: (
        <BusinessAddress
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      3: (
        <SubmittedBy
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      4: <FinalStep />,
    }),
    [formData, setFormData, nextStep, prevStep]
  );

  const advancedPlanSteps = useMemo(
    () => ({
      1: (
        <BasicInfo
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      ),
      2: (
        <BusinessAddress
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      3: (
        <OperationalHours
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      4: (
        <Languages
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      5: (
        <SocialMedia
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      6: (
        <AdditionalDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      7: (
        <UploadMedia
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      ),
      8: (
        <SubmittedBy
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
      9: <FinalStep />,
    }),
    [formData, setFormData, nextStep, prevStep, handleSubmit]
  );

  const currentSteps = ["basic"].includes(plan)
    ? basicPlanSteps
    : advancedPlanSteps;

  return currentSteps[step] || null;
};

FormSubmission.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormSubmission;
