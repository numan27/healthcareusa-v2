import React, { useState } from "react";
import {
  GenericButton,
  GenericInput,
  Typography,
  CheckboxDropdown,
} from "../../components/GenericComponents";
import AppLayout from "../../components/Layout/AppLayout";
import { Col, Container, Row } from "react-bootstrap";
import { LoaderCenter } from "../../assets/Loader";
import { toast } from "react-toastify";

const ClaimListingSubmission = () => {
  const initialFormState = {
    doctorName: "",
    designation: "",
    address: "",
    phone: "",
    website: "",
    description: "",
    profilePicture: null,
    package: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formKey, setFormKey] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const credentials = btoa("numan27:findhealthcareusa");
      if (!formData.profilePicture) {
        throw new Error("Please select a profile picture");
      }
      const uploadFormData = new FormData();
      uploadFormData.append("file", formData.profilePicture);
      const uploadResponse = await fetch(
        "https://jsappone.demowp.io/wp-json/wp/v2/media",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
          },
          body: uploadFormData,
        }
      );

      if (!uploadResponse.ok) {
        const uploadError = await uploadResponse.json();
        console.error("Upload error response:", uploadError);
        throw new Error("Failed to upload media file to WordPress");
      }

      const uploadData = await uploadResponse.json();
      const mediaId = uploadData.id;
      if (!mediaId) {
        throw new Error("Media ID not found in the response");
      }

      const payload = {
        title: formData.doctorName,
        featured_media: mediaId,
        cubewp_post_meta: {
          cwp_field_40228862441: { meta_value: formData.designation },
          cwp_field_288766456392: { meta_value: formData.description },
          "fc-phone": { meta_value: formData.phone },
          "fc-website": { meta_value: formData.website },
          "fc-google-address": {
            meta_value: { address: formData.address },
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
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Container className="my-5 py-4">
        <Typography
          as="h3"
          className="mb-0"
          color="#23262F"
          size="18px"
          lineHeight="27px"
          weight="600"
        >
          Claim Listing Submission
        </Typography>

        <Row className="mt-4">
          <Col md={6}>
            <GenericInput
              type="text"
              name="doctorName"
              label="Doctor Name"
              height="44px"
              value={formData.doctorName}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <GenericInput
              type="text"
              name="designation"
              label="Designation"
              height="44px"
              value={formData.designation}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <GenericInput
              type="tel"
              name="phone"
              label="Phone"
              height="44px"
              value={formData.phone}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <GenericInput
              type="text"
              name="website"
              label="Website"
              height="44px"
              value={formData.website}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <GenericInput
              type="text"
              height="44px"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <GenericInput
              type="file"
              name="profilePicture"
              label="Profile Picture"
              onFileChange={handleProfilePictureChange}
              key={`${formKey}-profilePicture`}
            />
          </Col>

          <Col md={12}>
            <GenericInput
              as="textarea"
              rows="4"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </Col>

          <Col xs={12} className="mt-3">
            <GenericButton
              width="100%"
              height="44px"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoaderCenter /> : "Claim Listing"}
            </GenericButton>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClaimListingSubmission;
