import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import FormSubmission from "./components/FormSubmission";
import FormLayout from "../../components/Layout/FormLayout/FormLayout";
import ProfileCardListingSubmission from "./components/ProfileCardListingSubmission";
import { toast } from "react-toastify";

const ListingSubmission = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    primaryCategory: [],
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    // qualifications: "",
    // specializations: "",
    // languages: "",
    // address: "",
    // lat: "",
    // lng: "",
    // taxonomies: [],
    // Add other necessary fields here
  });

  const nextStep = () => {
    if (step === 9) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      const payload = {
        title: formData.firstName,
        cubewp_post_meta: {
          "fc-phone": { meta_value: formData.businessPhone },
          "fc-website": { meta_value: formData.website },
          cwp_field_69043287672: { meta_value: formData.primaryCategory },
          // cwp_field_930729608352: { meta_value: formData.qualifications },
          // cwp_field_136461069401: { meta_value: formData.specializations },
          // "fc-languages": { meta_value: formData.languages },
          // "fc-google-address": {
          //   meta_value: {
          //     address: formData.address,
          //     lat: formData.lat,
          //     lng: formData.lng,
          //   },
          // },
        },
        // status: "publish",
        // taxonomies: formData.taxonomies.map((taxonomy) => taxonomy.value),
      };

      const credentials = btoa("numan27:findhealthcareusa");

      const response = await fetch(
        "https://jsappone.demowp.io/wp-json/wp/v2/listing",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create listing on WordPress");
      }

      // Reset form on successful submission
      setFormData({
        primaryCategory: [],
        subCategory: [],
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        website: "",
        // qualifications: "",
        // specializations: "",
        // languages: "",
        // address: "",
        // lat: "",
        // lng: "",
        // taxonomies: [],
        // Reset other fields as needed
      });

      toast.success("Doctor added successfully!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to add doctor");
    } finally {
      console.error("Form submitted successfully");
    }
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
