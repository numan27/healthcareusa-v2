import PropTypes from "prop-types";
import BasicInfo from "./BasicInfo";
import BusinessAddress from "./BusinessAddress";
import OperationalHours from "./OperationalHours";
import Languages from "./Languages";
import SocialMedia from "./SocialMedia";
import AdditionalDetails from "./AdditionalDetails";
import UploadMedia from "./UploadMedia";
import SubmittedBy from "./SubmittedBy";
import Review from "./Review";

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
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 9:
      return (
        <Review
          formData={formData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      );
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
};

export default FormSubmission;
