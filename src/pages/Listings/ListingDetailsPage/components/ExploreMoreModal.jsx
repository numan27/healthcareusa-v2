import { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import GenericModal from "../../../../components/GenericComponents/Modal";
import {
  Box,
  GenericButton,
  GenericInput,
  Typography,
} from "../../../../components/GenericComponents";
import AdsSection from "../../../../components/Shared/AdsSection";
import { LoaderCenter } from "../../../../assets";

const ExploreMoreModal = ({ show, onHide, googleAddress, profileTitle }) => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formKey, setFormKey] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const handleProfilePictureChange = (e) => {
  //     setFormData({ ...formData, profilePicture: e.target.files[0] });
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const credentials = btoa("numan27:findhealthcareusa");
      //   if (!formData.profilePicture) {
      //     throw new Error("Please select a profile picture");
      //   }

      const fullName = `${formData.firstName} ${formData.lastName}`;
      const completeAddress = `${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zip}`;

      const payload = {
        title: fullName,
        cubewp_post_meta: {
          "fc-phone": { meta_value: formData.phone },
          "fc-google-address": {
            meta_value: { address: completeAddress },
            lat: "", // latitude if available
            lng: "", // longitude if available
          },
        },
        status: "publish",
      };

      const response = await fetch(
        "https://jsappone.demowp.io/wp-json/wp/v2/claimed-listing",
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
        const createListingError = await response.json();
        console.error("Create listing error response:", createListingError);
        throw new Error("Failed to create listing on WordPress");
      }

      // Reset form
      setFormData(initialFormState);
      setFormKey(Date.now());

      toast.success("Claim submitted successfully!", {
        autoClose: 1000,
      });
      onHide();
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GenericModal show={show} onHide={onHide} size="lg">
      <Box className="w-100 pt-5 pb-3">
        <div className="px-sm-5 px-3 pt-2">
          <Typography
            color="#070026"
            weight="600"
            size="24px"
            lineHeight="36px"
            as="h2"
            align="center"
            style={{ letterSpacing: "1px", wordSpacing: "5px" }}
          >
            Listing Ownership Claim Request Form
          </Typography>
          <Box
            background="#EAFFFF"
            color="#070026"
            height="44px"
            className="w-100 text-center d-flex align-items-center justify-content-center"
          >
            <Typography
              color="#070026"
              weight="400"
              size="16px"
              lineHeight="24px"
              as="h5"
              align="center"
              className="mb-0"
            >
              For
              <span className="fw-semibold"> {profileTitle} </span>
              located in
              <span className="fw-semibold"> {googleAddress.address}</span>
            </Typography>
          </Box>

          <Row className="mt-4">
            <Col className="pe-md-1" md={6}>
              <GenericInput
                type="text"
                labelWeight="600"
                name="firstName"
                label="First Name"
                height="44px"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Col>
            <Col className="ps-md-1" md={6}>
              <GenericInput
                labelWeight="600"
                type="text"
                name="lastName"
                label="Last Name"
                height="44px"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12}>
              <GenericInput
                labelWeight="600"
                type="text"
                name="email"
                label="Business Email"
                height="44px"
                value={formData.email}
                onChange={handleChange}
              />
            </Col>

            <Col xs={12}>
              <GenericInput
                labelWeight="600"
                type="tel"
                name="phone"
                label="Business Phone"
                height="44px"
                value={formData.phone}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12}>
              <GenericInput
                labelWeight="600"
                type="text"
                name="streetAddress"
                label="Street Address"
                height="44px"
                value={formData.streetAddress}
                onChange={handleChange}
              />
            </Col>
            <Col className="pe-md-1" md={4}>
              <GenericInput
                labelWeight="600"
                type="text"
                height="44px"
                name="city"
                label="City"
                value={formData.city}
                onChange={handleChange}
              />
            </Col>
            <Col className="px-md-1" md={4}>
              <GenericInput
                labelWeight="600"
                type="text"
                height="44px"
                name="state"
                label="State"
                value={formData.state}
                onChange={handleChange}
              />
            </Col>
            <Col className="ps-md-1" md={4}>
              <GenericInput
                labelWeight="600"
                type="text"
                height="44px"
                name="zip"
                label="Zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </Col>

            <Col xs={12} className="my-3">
              <GenericButton
                width="100%"
                height="48px"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoaderCenter /> : "Submit My Claim Request"}
              </GenericButton>
            </Col>
          </Row>
          <div>
            <AdsSection margin={0} padding={3} />
          </div>
        </div>
      </Box>
    </GenericModal>
  );
};

ExploreMoreModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  exploreModalItems: PropTypes.array.isRequired,
};

export default ExploreMoreModal;
