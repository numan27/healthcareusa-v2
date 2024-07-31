import PropTypes from "prop-types";
import BasicInfo from "./Step1BasicInfo";
import BusinessAddress from "./Step2BusinessAddress";
import OperationalHours from "./Step3OperationalHours";
import Languages from "./Step4Languages";
import SocialMedia from "./Step5SocialMedia";
import AdditionalDetails from "./Step6AdditionalDetails";
import SubmittedBy from "./Step7SubmittedBy";
import UploadMedia from "./Step8UploadMedia";
import FinalStep from "./FinalStep";

const FormSubmission = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  step,
  handleSubmit,
}) => {
  switch (step) {
    case 1:
      return (
        <BasicInfo
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <BusinessAddress
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <OperationalHours
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 4:
      return (
        <Languages
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 5:
      return (
        <SocialMedia
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 6:
      return (
        <AdditionalDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 7:
      return (
        <SubmittedBy
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 8:
      return (
        <UploadMedia
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      );
    case 9:
      return <FinalStep />;
    default:
      return null;
  }
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
