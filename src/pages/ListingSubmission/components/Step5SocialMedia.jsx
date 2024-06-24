import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col } from "react-bootstrap";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import {
  GenericInput,
  GenericSelect,
  Typography,
} from "../../../components/GenericComponents";

const SocialMedia = ({ formData, setFormData }) => {
  const { socialMediaLinks = [] } = formData;

  const platforms = [
    { id: "1", label: "Facebook", value: "facebook" },
    { id: "2", label: "LinkedIn", value: "linkedin" },
    { id: "3", label: "X (Twitter)", value: "twitter" },
    { id: "4", label: "Instagram", value: "instagram" },
    { id: "5", label: "YouTube", value: "youtube" },
    {
      id: "6",
      label: "Google Business Profile",
      value: "googleBusinessProfile",
    },
  ];

  const addRow = () => {
    const newLinks = [...socialMediaLinks, { platform: "", url: "" }];
    setFormData({ ...formData, socialMediaLinks: newLinks });
  };

  const removeRow = (index) => {
    const newLinks = [...socialMediaLinks];
    newLinks.splice(index, 1);
    setFormData({ ...formData, socialMediaLinks: newLinks });
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...socialMediaLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, socialMediaLinks: newLinks });
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
        Social Media
      </Typography>
      <Typography
        weight="400"
        align="center"
        color="#73777D"
        size="16px"
        font="Inter"
        lineHeight="24px"
      >
        Provide the details about the property's social media presence
      </Typography>
      <Form className="mt-5">
        {socialMediaLinks.map((link, index) => (
          <Row key={index} className="d-flex align-items-end">
            <Col md={5} className="pe-0">
              {index === 0 && (
                <Form.Label className="fw-bold">Platform</Form.Label>
              )}
              <GenericSelect
                minWidth="120px"
                minheight="34px"
                maxheight="34px"
                borderColor="#EEF0F5"
                borderRadius="4px"
                bgcolor="#F8F9FC"
                placeholder="Select Platform"
                placeholderColor="#333333"
                iconColor="#06312E"
                menuPlacement="auto"
                value={
                  platforms.find(
                    (platform) => platform.label === link.platform
                  ) || null
                }
                onChange={(option) =>
                  handleLinkChange(index, "platform", option.label)
                }
                options={platforms}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            </Col>
            <Col md={5} className="pe-0">
              {index === 0 && (
                <Form.Label className="fw-bold">URL / User handle</Form.Label>
              )}
              <GenericInput
                className="mb-0"
                type="text"
                background="#F8F9FC"
                borderColor="#EEF0F5"
                name="url"
                height="34px"
                placeholder="Enter Social URL"
                value={link.url}
                onChange={(e) => handleLinkChange(index, "url", e.target.value)}
              />
            </Col>
            {index === socialMediaLinks.length - 1 && (
              <Col
                xs={2}
                className="d-flex align-items-center justify-content-start"
              >
                <CiSquareMinus
                  className="cursor-pointer"
                  size={30}
                  color="#CFCFCF"
                  onClick={() => removeRow(index)}
                />
                <CiSquarePlus
                  className="cursor-pointer"
                  size={30}
                  color="#00C1B6"
                  onClick={() => addRow()}
                />
              </Col>
            )}
          </Row>
        ))}
        {socialMediaLinks.length === 0 && (
          <Row className="mb-4 align-items-center">
            <Col md={3} className="text-center">
              <CiSquarePlus
                className="cursor-pointer"
                size={30}
                color="#00C1B6"
                onClick={() => addRow()}
              />
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};

SocialMedia.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default SocialMedia;
