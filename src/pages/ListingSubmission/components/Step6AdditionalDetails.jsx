import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import {
  GenericInput,
  GenericSelect,
  Typography,
} from "../../../components/GenericComponents";

const AdditionalDetails = ({ formData, setFormData }) => {
  const [dropdownOptions, setDropdownOptions] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await fetch(
          "https://jsappone.demowp.io/wp-json/cubewp-forms/v1/get_form?post_type=listing&form_type=post_type"
        );
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data && data.groups) {
          const fields = data.groups["112156535"].fields;
          const optionsMap = {};

          const dropdownLabels = [
            "Gender",
            "Languages",
            "Qualifications",
            "Specialization",
            "Doctor Package",
          ];

          dropdownLabels.forEach((label) => {
            const field = fields.find((field) => field.label === label);
            if (field && field.label.trim()) {
              const options = JSON.parse(field.options);
              const parsedOptions = options.label.map((label, index) => ({
                id: index.toString(), // Ensure id is a string
                label: label,
                value: options.value[index],
                checked: false, // Initialize checked state
              }));
              optionsMap[label] = parsedOptions;
            }
          });

          setDropdownOptions(optionsMap);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownOptions();
  }, []);

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
        Additional Details
      </Typography>
      <Typography
        weight="400"
        align="center"
        color="#73777D"
        size="16px"
        font="Inter"
        lineHeight="24px"
      >
        Provide the essential details about business.
      </Typography>
      <Form className="mt-5">
        <Row>
          <Col md={6} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="designation"
              label="Designation"
              height="37px"
              placeholder="Enter Designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </Col>
          <Col className="mb-3" md={6}>
            <Form.Label className="form_label">Select Gender</Form.Label>
            <GenericSelect
              name="gender"
              minWidth="120px"
              height="34px"
              borderColor="#EEF0F5"
              borderRadius="4px"
              bgcolor="#F8F9FC"
              placeholder="Select Gender"
              placeholderColor="#333333"
              iconColor="#06312E"
              menuPlacement="auto"
              options={(dropdownOptions.Gender || []).filter(
                (option) => option.label
              )}
              onChange={(selectedOption) =>
                handleSelectChange("gender", selectedOption)
              }
              value={formData.gender}
            />
          </Col>
          <Col md={6} className="mb-2">
            <Form.Label className="form_label">Qualifications</Form.Label>
            <GenericSelect
              isMulti
              name="qualificationValues"
              minWidth="120px"
              // width="100%"
              minHeight="34px"
              height="34px"
              borderColor="#EEF0F5"
              borderRadius="4px"
              bgcolor="#F8F9FC"
              placeholder="Choose Qualifications"
              placeholderColor="#333333"
              iconColor="#06312E"
              menuPlacement="auto"
              options={(dropdownOptions.Qualifications || []).filter(
                (option) => option.label
              )}
              onSelect={(selectedOption) =>
                handleSelectChange("qualificationValues", selectedOption)
              }
              value={formData.qualificationValues}
            />
          </Col>
          <Col className="mb-3" md={6}>
            <Form.Label className="form_label">
              Choose Doctor Package
            </Form.Label>
            <GenericSelect
              name="package"
              minWidth="120px"
              minHeight="34px"
              height="34px"
              borderColor="#EEF0F5"
              borderRadius="4px"
              bgcolor="#F8F9FC"
              placeholder="Select Doctor Package"
              placeholderColor="#333333"
              iconColor="#06312E"
              menuPlacement="auto"
              options={(dropdownOptions["Doctor Package"] || []).filter(
                (option) => option.label
              )}
              onChange={(selectedOption) =>
                handleSelectChange("package", selectedOption)
              }
              value={formData.package}
            />
          </Col>
          <Col xs={12} className="mb-3">
            <Form.Label className="form_label">Specializations</Form.Label>
            <GenericSelect
              isMulti
              name="package"
              minWidth="120px"
              minHeight="34px"
              height="34px"
              borderColor="#EEF0F5"
              borderRadius="4px"
              bgcolor="#F8F9FC"
              placeholder="Choose Specialization(s)"
              placeholderColor="#333333"
              iconColor="#06312E"
              menuPlacement="auto"
              options={(dropdownOptions.Specialization || []).filter(
                (option) => option.label
              )}
              onSelect={(selectedOption) =>
                handleSelectChange("specializationValues", selectedOption)
              }
              value={formData.specializationValues}
            />
          </Col>

          <Col xs={12} className="mb-2">
            <GenericInput
              className="rounded-3"
              as="textarea"
              rows="4"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              label="Business Description"
              name="descDetail"
              placeholder="Enter here"
              onChange={handleChange}
              value={formData.descDetail}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

AdditionalDetails.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default AdditionalDetails;
