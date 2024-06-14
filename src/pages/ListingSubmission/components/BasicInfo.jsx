import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col } from "react-bootstrap";
import {
  GenericInput,
  GenericSelect,
  Typography,
} from "../../../components/GenericComponents";

const BasicInfo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        Basic Information
      </Typography>
      <Typography
        weight="400"
        align="center"
        color="#73777D"
        size="16px"
        font="Inter"
        lineHeight="24px"
      >
        Provide the essential details about you.
      </Typography>
      <Form className="mt-5">
        <Row>
          <Col md={6} className="mb-4">
            <Form.Label className="form_label">
              Select Primary Category
            </Form.Label>
            <GenericSelect
              minWidth="120px"
              minheight="34px"
              borderColor="#EEF0F5"
              borderRadius="4px"
              bgcolor="#F8F9FC"
              placeholder="Select Primary Category"
              placeholderColor="#333333"
              iconColor="#06312E"
              menuPlacement="auto"
              options={[
                { id: "1", label: "Gold", value: "gold" },
                { id: "2", label: "Platinum", value: "platinum" },
                { id: "3", label: "Silver", value: "silver" },
              ]}
            />
          </Col>
          <Col md={6} className="mb-4">
            <Form.Label className="form_label">Select Sub-category</Form.Label>
            <GenericSelect
              minWidth="120px"
              minheight="34px"
              borderColor="#EEF0F5"
              borderRadius="4px"
              bgcolor="#F8F9FC"
              placeholder="Select Sub-category"
              placeholderColor="#333333"
              iconColor="#06312E"
              menuPlacement="auto"
              options={[
                { id: "1", label: "Gold", value: "gold" },
                { id: "2", label: "Platinum", value: "platinum" },
                { id: "3", label: "Silver", value: "silver" },
              ]}
            />
          </Col>
          <Col md={6} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="firstName"
              label="First Name"
              height="34px"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Col>
          <Col md={6} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="lastName"
              label="Last Name"
              height="34px"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="businessEmail"
              label="Business Email"
              height="34px"
              placeholder="Enter Email"
              value={formData.businessEmail}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="businessPhone"
              label="Business Phone"
              height="34px"
              placeholder="Enter Phone No"
              value={formData.businessPhone}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="businessWebsite"
              label="Business Website URL"
              height="34px"
              placeholder="Enter Website URL"
              value={formData.businessWebsite}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

BasicInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default BasicInfo;
