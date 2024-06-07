import React, { useState } from "react";
import axios from "axios";
import {
  GenericButton,
  GenericInput,
  Typography,
} from "../../components/GenericComponents";
import AppLayout from "../../components/Layout/AppLayout";
import { Col, Container, Row } from "react-bootstrap";

const AddListing = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    designation: "",
    // languages: [],
    address: "",
    phone: "",
    // status: "",
    // map: { latitude: "", longitude: "" },
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleLanguagesChange = (selectedLanguages) => {
  //   setFormData({ ...formData, languages: selectedLanguages });
  // };

  // const handleMapChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     map: {
  //       ...formData.map,
  //       [name]: value,
  //     },
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jsappone.demowp.io/wp-json/wp/v2/listing",
        formData
      );
      console.log("Form submitted successfully", response);

      // const formDataWithFiles = new FormData();
      // formDataWithFiles.append("profilePicture", formData.profilePicture);
      // formData.mediaPictures.forEach((file) => {
      //   formDataWithFiles.append("mediaPictures", file);
      // });
      // Append other form data fields as needed
      // formDataWithFiles.append("doctorName", formData.doctorName);
      // Append other fields as necessary

      // Now submit the file data
      // const fileUploadResponse = await axios.post(
      //   "YOUR_FILE_UPLOAD_ENDPOINT",
      //   formDataWithFiles
      // );
      // console.log("File(s) uploaded successfully", fileUploadResponse);

      // Reset form data after successful submission
      setFormData({
        doctorName: "",
        designation: "",
        // languages: [],
        address: "",
        phone: "",
        // status: "",
        // map: { latitude: "", longitude: "" },
        website: "",
        // profilePicture: null,
        // mediaPictures: [],
      });
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  // const handleProfilePictureChange = (e) => {
  //   setFormData({ ...formData, profilePicture: e.target.files[0] });
  // };

  // const handleMediaPicturesChange = (e) => {
  //   setFormData({ ...formData, mediaPictures: [...e.target.files] });
  // };

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
          {/* <Col md={6}>
            <GenericInput
              type="text"
              name="languages"
              label="Languages"
              height="44px"
              value={formData.languages}
              onChange={handleLanguagesChange}
              isMulti
            />
          </Col> */}

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
          {/* <Col md={6}>
            <div className="d-flex">
              <GenericInput
                type="radio"
                name="status"
                label="Open"
                height="44px"
                value="Open"
                onChange={handleChange}
              />
              <GenericInput
                type="radio"
                name="status"
                label="Close"
                height="44px"
                value="Close"
                onChange={handleChange}
              />
            </div>
          </Col> */}
          {/* <Col md={6}>
            <GenericInput
              type="text"
              name="map.latitude"
              label="Latitude"
              height="44px"
              value={formData.map.latitude}
              onChange={handleMapChange}
            />
          </Col>
          <Col md={6}>
            <GenericInput
              type="text"
              name="map.longitude"
              label="Longitude"
              height="44px"
              value={formData.map.longitude}
              onChange={handleMapChange}
            />
          </Col> */}
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
              as="textarea"
              rows="4"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </Col>
          {/* 
          <Col md={6}>
            <GenericInput
              type="file"
              name="profilePicture"
              label="Profile Picture"
              onChange={handleProfilePictureChange}
            />
          </Col>
          <Col md={6}>
            <GenericInput
              type="file"
              name="mediaPictures"
              label="Media Pictures"
              onChange={handleMediaPicturesChange}
              multiple
            />
          </Col> */}
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
