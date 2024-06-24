import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col } from "react-bootstrap";
import {
  GenericInput,
  Typography,
} from "../../../components/GenericComponents";

const BusinessAddress = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    const completeAddress = `${updatedFormData.streetAddress || ""}, ${
      updatedFormData.city || ""
    }, ${updatedFormData.state || ""} ${updatedFormData.zip || ""}`;
    setFormData({ ...updatedFormData, completeAddress });
  };

  return (
    <div className="">
      <Typography
        weight="600"
        align="center"
        color="#070026"
        size="24px"
        font="Inter"
        lineHeight="36px"
      >
        What is your Business Address?
      </Typography>
      <Typography
        weight="400"
        align="center"
        color="#73777D"
        size="16px"
        font="Inter"
        lineHeight="24px"
      >
        Provide the details about the location
      </Typography>
      <Form className="mt-5">
        <Row>
          <Col xs={12} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="streetAddress"
              label="Street address"
              height="34px"
              placeholder="Enter Street Address"
              value={formData.streetAddress}
              onChange={handleChange}
            />
          </Col>
          <Col md={4} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="city"
              label="City"
              height="34px"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleChange}
            />
          </Col>
          <Col md={4} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="state"
              label="State"
              height="34px"
              placeholder="Enter State"
              value={formData.state}
              onChange={handleChange}
            />
          </Col>
          <Col md={4} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="zip"
              label="Zip"
              height="34px"
              placeholder="Enter Zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

BusinessAddress.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default BusinessAddress;
