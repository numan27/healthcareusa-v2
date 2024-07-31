import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Row, Col } from "react-bootstrap";
import {
  GenericInput,
  GenericSelect,
  Typography,
} from "../../../components/GenericComponents";
import { ServicesContext } from "../../../components/api/ServicesContext";
import { LoaderCenter } from "../../../assets";

const BasicInfo = ({ formData, setFormData }) => {
  const { groupedServices, loading } = useContext(ServicesContext);
  const [primaryCategoryOptions, setPrimaryCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState(null);

  useEffect(() => {
    if (groupedServices.length > 0) {
      const primaryOptions = groupedServices.map((group) => ({
        label: group.heading.name,
        value: group.heading.id,
      }));
      setPrimaryCategoryOptions(primaryOptions);
    }
  }, [groupedServices]);

  useEffect(() => {
    if (selectedPrimaryCategory) {
      const selectedGroup = groupedServices.find(
        (group) => group.heading.id === selectedPrimaryCategory.value
      );
      const subOptions =
        selectedGroup?.items.map((item) => ({
          label: item.name,
          value: item.id,
        })) || [];
      setSubCategoryOptions(subOptions);
    } else {
      setSubCategoryOptions([]);
    }
  }, [selectedPrimaryCategory, groupedServices]);

  if (loading) {
    return (
      <div>
        <LoaderCenter />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    const fullName = `${updatedFormData.firstName || ""} ${
      updatedFormData.lastName || ""
    }`;
    setFormData({ ...updatedFormData, fullName });
  };

  const handlePrimaryCategoryChange = (selectedOption) => {
    setSelectedPrimaryCategory(selectedOption);
    setFormData({ ...formData, primaryCategory: selectedOption });
  };

  const handleSubCategoryChange = (selectedOption) => {
    setFormData({ ...formData, subCategory: selectedOption });
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
              options={primaryCategoryOptions}
              onChange={handlePrimaryCategoryChange}
              value={primaryCategoryOptions.find(
                (option) => option.value === formData.primaryCategory?.value
              )}
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
              options={subCategoryOptions}
              onChange={handleSubCategoryChange}
              value={subCategoryOptions.find(
                (option) => option.value === formData.subCategory?.value
              )}
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
              name="email"
              label="Business Email"
              height="34px"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="phone"
              label="Business Phone"
              height="34px"
              placeholder="Enter Phone No"
              value={formData.phone}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="website"
              label="Business Website URL"
              height="34px"
              placeholder="Enter Website URL"
              value={formData.website}
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
