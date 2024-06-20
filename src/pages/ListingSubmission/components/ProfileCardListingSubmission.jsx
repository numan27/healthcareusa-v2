import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  GenericButton,
  Typography,
} from "../../../components/GenericComponents";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DoctorLocationIcon from "../../../assets/SVGs/DoctorLocation";
import PhoneCircleIcon from "../../../assets/SVGs/PhoneCircle";
import IMAGES from "../../../assets/images";
import CallIcon from "../../../assets/SVGs/Call";
import MapIcon from "../../../assets/SVGs/Map";
import InternetIcon from "../../../assets/SVGs/Internet";

const ProfileCardListingSubmission = ({ formData = {} }) => {
  const profileName = `${formData.firstName || "John"} ${
    formData.lastName || "Doe"
  }`;

  const businessAddress = `${formData.streetAddress || "156 APT Square"}, ${
    formData.city || "New York"
  }, ${formData.state || "NY"} ${formData.zip || "10001"}`;

  // Determine which image to display as the profile picture
  const profileImage =
    formData.gallery && formData.gallery.find((img) => img.isSelected);

  return (
    <Box padding="16px" className="custom-border rounded bg-white w-100">
      <Row>
        <Col
          lg={3}
          md={6}
          className="d-flex justify-content-center mx-auto mb-3 mb-lg-0 pt-md-0 pt-4 pe-0"
        >
          {profileImage ? (
            <img
              className="img-fluid"
              src={
                profileImage
                  ? URL.createObjectURL(profileImage.file)
                  : IMAGES.DEFAULT_PROFILE_IMAGE
              }
              alt="Profile Image"
            />
          ) : (
            <img
              style={{ opacity: "0.2" }}
              className="img-fluid"
              src={IMAGES.DOCTOR_LIST_PROFILE}
              alt="Profile Image"
            />
          )}
        </Col>

        <Col className="d-flex flex-column justify-content-between">
          <div className="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
            <div>
              <Typography
                as="h2"
                color="#23262F"
                weight="700"
                size="24px"
                lineHeight="36px"
              >
                {profileName}
              </Typography>

              <div className="d-flex align-items-center gap-2">
                <Typography
                  style={{ borderRight: "1.5px solid #64666C" }}
                  className="text-uppercase pe-2"
                  as="label"
                  color="#64666C"
                  weight="500"
                  size="14px"
                  lineHeight="16px"
                >
                  {formData.designation || "Physiotherapist"}
                </Typography>
                <Typography
                  className="text-uppercase"
                  as="label"
                  color="#64666C"
                  weight="500"
                  size="14px"
                  lineHeight="16px"
                >
                  {formData.languages || "English, French"}
                </Typography>
              </div>

              <div className="mt-3 d-flex align-items-center gap-2">
                <Box
                  width="65px"
                  height="65px"
                  className="custom-border rounded d-flex flex-column align-items-center justify-content-center "
                >
                  <DoctorLocationIcon />
                  <Typography
                    as="span"
                    color="#23262F"
                    weight="700"
                    size="12px"
                    lineHeight="15px"
                  >
                    0.3 ml
                  </Typography>
                </Box>

                <Box width="140px" className="">
                  <Typography
                    as="span"
                    color="#23262F"
                    weight="500"
                    size="14px"
                    lineHeight="18px"
                  >
                    {businessAddress}
                  </Typography>
                </Box>
              </div>

              <Link
                to="#"
                className="d-flex align-items-center gap-2 mt-3 link"
              >
                <PhoneCircleIcon />
                <Typography
                  className="mb-0"
                  as="h5"
                  color="#23262F"
                  weight="700"
                  size="16px"
                  lineHeight="24px"
                >
                  {formData.businessPhone || "(123) 456-7890"}
                </Typography>
              </Link>
            </div>

            <img
              className="mt-4"
              width={80}
              src={IMAGES.PROFILE_COMPANY_LOGO}
              alt="Company Logo"
            />
          </div>
          <div className="d-flex align-items-end flex-wrap flex-sm-nowrap gap-2 mt-2xl-0 mt-3">
            <GenericButton
              borderColor="transparent"
              gap="15px"
              height="46px"
              width="100%"
              className=""
            >
              <CallIcon />
              Call
            </GenericButton>

            <GenericButton
              borderColor="transparent"
              hoverBgColor="#e3e3e3"
              hoverColor="#23262F"
              color="#23262F"
              background="#F3F3F3"
              height="46px"
              width="100%"
              className=""
            >
              <MapIcon />
              Map
            </GenericButton>

            <GenericButton
              hoverBgColor="#e3e3e3"
              borderColor="transparent"
              hoverColor="#23262F"
              color="#23262F"
              background="#F3F3F3"
              height="46px"
              width="100%"
              className=""
            >
              <InternetIcon />
              Website
            </GenericButton>
          </div>
        </Col>
      </Row>
    </Box>
  );
};

ProfileCardListingSubmission.propTypes = {
  formData: PropTypes.object.isRequired,
};

export default ProfileCardListingSubmission;
