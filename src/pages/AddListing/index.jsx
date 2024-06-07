import React, { useState } from "react";
import {
  CheckboxDropdown,
  GenericButton,
  GenericInput,
  GenericSelect,
  Typography,
} from "../../components/GenericComponents";
import AppLayout from "../../components/Layout/AppLayout";
import { Col, Container, Form, Row } from "react-bootstrap";

const AddListing = () => {
  const initialFormState = {
    doctorName: "",
    designation: "",
    address: "",
    phone: "",
    website: "",
    languages: [],
    qualifications: [],
    specializations: [],
    description: "",
    profilePicture: null,
    package: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formKey, setFormKey] = useState(Date.now());
  // const [languages, setLanguages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log("Media upload response:", uploadData);

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
          cwp_field_631649982329: { meta_value: formData.package },
          cwp_field_930729608352: {
            meta_value: formData.qualifications.join(", "),
          },
          cwp_field_136461069401: {
            meta_value: formData.specializations.join(", "),
          },
          "fc-phone": { meta_value: formData.phone },
          "fc-website": { meta_value: formData.website },
          "fc-languages": {
            meta_value: formData.languages.join(", "),
          },
          "fc-google-address": {
            meta_value: { address: formData.address },
            lat: "", // latitude if available
            lng: "", // longitude if available
          },
        },
        status: "publish",
        taxonomies: formData.specializations,
      };

      console.log("languages", formData.languages);

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
        const createListingError = await response.json();
        console.error("Create listing error response:", createListingError);
        throw new Error("Failed to create listing on WordPress");
      }

      console.log("Form submitted successfully", response);

      // Reset form
      setFormData(initialFormState);
      setFormKey(Date.now()); // Force re-render of CheckboxDropdown components
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  // const languagesData = [
  //   {
  //     value: 1,
  //     label: "English",
  //   },
  //   {
  //     value: 2,
  //     label: "French",
  //   },
  //   {
  //     value: 3,
  //     label: "Spanish",
  //   },
  //   {
  //     value: 4,
  //     label: "German",
  //   },
  // ];

  const languagesData = [
    { id: "1", label: "English" },
    { id: "2", label: "French" },
    { id: "3", label: "Spanish" },
    { id: "4", label: "German" },
  ];
  const qualificationsData = [
    { id: "1", label: "M.B.B.S" },
    { id: "2", label: "M.R.C.P" },
    { id: "3", label: "D.M.R.D" },
    { id: "4", label: "F.C.P.S" },
  ];
  const specializationsData = [
    { id: "1", label: "Neurologist" },
    { id: "2", label: "Psychologist" },
    { id: "3", label: "Dermatologist" },
    { id: "4", label: "Oncologist" },
    { id: "5", label: "Cardiologist" },
  ];

  return (
    <AppLayout>
      <Container className="my-5 py-4">
        <Typography
          as="h3"
          className="mb-0"
          color="#23262F"
          size="18px"
          lineHeight="27px"
          weight="600"
        >
          Add New Doctor
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
            <CheckboxDropdown
              key={`${formKey}-languages`}
              title="Languages"
              height="44px"
              width="100%"
              items={languagesData}
              haveLabel
              labelValue="Choose Language(s)"
              border
              // onChange={(selectedLanguages) => {
              //   setFormData({ ...formData, languages: selectedLanguages });
              // }}
              onChange={(selectedLanguages) => {
                const languageLabels = selectedLanguages.map(
                  (language) => language.label
                );
                setFormData({ ...formData, languages: languageLabels });
              }}
            />
          </Col>

          <Col md={6}>
            <CheckboxDropdown
              key={`${formKey}-qualifications`} // Add key to force re-render
              title="Qualifications"
              height="44px"
              width="100%"
              items={qualificationsData}
              haveLabel
              labelValue="Choose Qualification(s)"
              border
              onChange={(selectedQualifications) => {
                setFormData({
                  ...formData,
                  qualifications: selectedQualifications,
                });
              }}
            />
          </Col>
          <Col md={6}>
            <CheckboxDropdown
              key={`${formKey}-specializations`} // Add key to force re-render
              title="Specializations"
              height="44px"
              width="100%"
              background="#F4F5F7"
              items={specializationsData}
              haveLabel
              labelValue="Choose Specialization(s)"
              border
              onChange={(selectedSpecializations) => {
                setFormData({
                  ...formData,
                  specializations: selectedSpecializations,
                });
              }}
            />
          </Col>
          <Col className="mt-2 pt-1" md={6}>
            <Form.Label className="form_label">
              Choose Doctor Package
            </Form.Label>
            <GenericSelect
              key={`${formKey}-package`}
              minWidth="120px"
              minheight="44px"
              borderColor="#B2BAC0"
              borderRadius="4px"
              bgcolor="#F4F5F7"
              placeholder="Select Package"
              placeholderColor="#333333"
              iconColor="#06312E"
              menuPlacement="auto"
              options={[
                {
                  label: "Gold",
                  value: "Gold",
                },
                {
                  label: "Platinum",
                  value: "Platinum",
                },
                {
                  label: "Silver",
                  value: "Silver",
                },
              ]}
              onChange={(selectedPackage) => {
                setFormData({ ...formData, package: selectedPackage });
              }}
            />
          </Col>
          <Col className="mt-2 pt-1" md={6}>
            <GenericInput
              type="file"
              name="profilePicture"
              label="Profile Picture"
              onFileChange={handleProfilePictureChange}
              key={`${formKey}-profilePicture`} // Add key to force re-render
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
            <GenericButton width="100%" height="44px" onClick={handleSubmit}>
              Submit Listing
            </GenericButton>
          </Col>
        </Row>
      </Container>
    </AppLayout>
  );
};

export default AddListing;
