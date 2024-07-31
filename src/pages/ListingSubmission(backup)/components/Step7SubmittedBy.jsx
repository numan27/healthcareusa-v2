import PropTypes from "prop-types";
import { Form, Row, Col } from "react-bootstrap";
import {
  GenericInput,
  Typography,
} from "../../../components/GenericComponents";

const SubmittedBy = ({ formData, setFormData }) => {
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
        Submitted by
      </Typography>
      <Typography
        weight="400"
        align="center"
        color="#73777D"
        size="16px"
        font="Inter"
        lineHeight="24px"
      >
        Provide the essential details.
      </Typography>
      <Form className="mt-5">
        <Row>
          <Col md={6} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="submittingPersonFirstName"
              label="First Name"
              height="34px"
              placeholder="Enter First Name"
              value={formData.submittingPersonFirstName}
              onChange={handleChange}
            />
          </Col>
          <Col md={6} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="submittingPersonLastName"
              label="Last Name"
              height="34px"
              placeholder="Enter Last Name"
              value={formData.submittingPersonLastName}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="submittingPersonEmail"
              label="Email"
              height="34px"
              placeholder="Enter Email"
              value={formData.submittingPersonEmail}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} className="mb-2">
            <GenericInput
              type="text"
              background="#F8F9FC"
              borderColor="#EEF0F5"
              name="submittingPersonPhone"
              label="Phone"
              height="34px"
              placeholder="Enter Phone No"
              value={formData.submittingPersonPhone}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

SubmittedBy.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default SubmittedBy;
