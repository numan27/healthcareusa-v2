import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FormSubmission from "./components/FormSubmission";
import FormLayout from "../../components/Layout/FormLayout/FormLayout";
import ProfileCardListingSubmission from "./components/ProfileCardListingSubmission";

const ListingSubmission = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const nextStep = () => {
    if (step === 9) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);
  const handleSubmit = () => {
    // Handle form submission (e.g., send data to an API)
    alert("Form submitted!");
  };

  return (
    <FormLayout nextStep={nextStep} prevStep={prevStep} step={step}>
      <div
        style={{ flex: "1", overflow: "hidden" }}
        className="overflow-hidden"
      >
        <div className="form-top-gradient" />
        <Row className="h-100">
          <Col lg={6} className="d-flex justify-content-center mt-5 pt-5">
            <Row className="w-100 h-100">
              <Col md={8} className="mx-auto">
                <FormSubmission
                  step={step}
                  formData={formData}
                  setFormData={setFormData}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleSubmit={handleSubmit}
                />
              </Col>
            </Row>
          </Col>
          <Col
            lg={6}
            className="live-preview-form d-flex align-items-center justify-content-center"
          >
            <Row className="w-100">
              <Col md={10} className="mx-auto">
                <ProfileCardListingSubmission formData={formData} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </FormLayout>
  );
};

export default ListingSubmission;
