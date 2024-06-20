import React from "react";
import PropTypes from "prop-types";
import { Col, Form, Row } from "react-bootstrap";
import { Checkbox, Typography } from "../../../components/GenericComponents";

const Languages = ({ formData, setFormData }) => {
  const { languages = [] } = formData;

  const handleChange = (label) => {
    const isChecked = languages.includes(label);
    const updatedLanguages = isChecked
      ? languages.filter((lang) => lang !== label)
      : [...languages, label];

    setFormData({ ...formData, languages: updatedLanguages });
  };

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "hindi", label: "Hindi" },
    { value: "chinese", label: "Chinese" },
    { value: "vietnamese", label: "Vietnamese" },
    { value: "russian", label: "Russian" },
  ];

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
        Choose Your Languages
      </Typography>
      <Typography
        weight="400"
        align="center"
        color="#73777D"
        size="16px"
        font="Inter"
        lineHeight="24px"
      >
        Select one or more languages
      </Typography>
      <Form className="mt-5">
        <Row>
          {languageOptions.map((option) => (
            <Col key={option.value} sm={5} className="mb-3 mx-auto">
              <Checkbox
                checked={languages.includes(option.label)}
                onChange={() => handleChange(option.label)}
                label={option.label}
              />
            </Col>
          ))}
        </Row>
      </Form>
    </div>
  );
};

Languages.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Languages;
