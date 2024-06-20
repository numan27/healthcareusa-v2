import PropTypes from "prop-types";
import { Form, Row, Col } from "react-bootstrap";
import {
  GenericInput,
  Typography,
} from "../../../components/GenericComponents";

const AdditionalDetails = ({ formData, setFormData }) => {
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
          <Col xs={12} className="mb-4">
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
          <Col xs={12} className="mb-4">
            <GenericInput
              className="rounded-3"
              as="textarea"
              rows="4"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              label="Business Services"
              name="serviceDetail"
              placeholder="Enter here"
              onChange={handleChange}
              value={formData.serviceDetail}
            />
          </Col>
          <Col xs={12} className="mb-4">
            <GenericInput
              className="rounded-3"
              as="textarea"
              rows="4"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              label="Insurances Accepted"
              name="insuranceDetail"
              placeholder="Enter here"
              onChange={handleChange}
              value={formData.insuranceDetail}
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
  nextStep: PropTypes.func.isRequired,
};

export default AdditionalDetails;
