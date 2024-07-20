import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { Checkbox, Typography } from "../../../components/GenericComponents";
import { LoaderCenter } from "../../../assets";

const Languages = ({ formData, setFormData }) => {
  const { languages = [] } = formData;
  const [languageOptions, setLanguageOptions] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await fetch(
          "https://findhealthcare.com/wp-json/cubewp-forms/v1/get_form?post_type=listing&form_type=post_type"
        );
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data && data.groups) {
          const fields = data.groups["112156535"].fields;
          const languagesField = fields.find(
            (field) => field.label === "Languages"
          );

          if (languagesField && languagesField.label.trim()) {
            const options = JSON.parse(languagesField.options);
            const parsedOptions = options.label
              .map((label, index) => ({
                id: index.toString(),
                label: label,
                value: options.value[index],
                checked: languages.includes(options.value[index]),
              }))
              .filter((option) => !!option.label);
            setLanguageOptions(parsedOptions);
          }
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDropdownOptions();
  }, [languages]);

  const handleChange = (value) => {
    const updatedLanguages = languages.includes(value)
      ? languages.filter((lang) => lang !== value)
      : [...languages, value];

    setFormData({ ...formData, languages: updatedLanguages });
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
      {loading ? (
        <LoaderCenter />
      ) : (
        <Form className="mt-5">
          <Row>
            {languageOptions.map(
              (option) =>
                option.label && (
                  <Col key={option.value} sm={5} className="mb-3 mx-auto">
                    <Checkbox
                      checked={option.checked}
                      onChange={() => handleChange(option.value)}
                      label={option.label}
                    />
                  </Col>
                )
            )}
          </Row>
        </Form>
      )}
    </div>
  );
};

Languages.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Languages;
