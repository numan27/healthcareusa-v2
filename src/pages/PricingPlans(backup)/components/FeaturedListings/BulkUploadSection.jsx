import React from "react";
import {
  Box,
  GenericButton,
  Typography,
} from "../../../../components/GenericComponents";
import { Col, Row } from "react-bootstrap";
import { FaRegCircleCheck } from "react-icons/fa6";
import IMAGES from "../../../../assets/images";

const BulkUploadSection = () => {
  const featureData = [
    { feature: "Streamlined process for multiple locations" },
    { feature: "Professional assistance to ensure accuracy" },
    { feature: "Time-saving solution for extensive uploads" },
  ];
  return (
    <div className="pt-3">
      <Box
        className="w-100 rounded-2 mt-4"
        background="#EAFFFF"
        border="1px solid #00C1B6"
        padding="34px"
      >
        <Row>
          <Col lg={7}>
            <div>
              <Typography
                weight="600"
                size="30px"
                lineHeight="38px"
                className=""
              >
                Got more than 4 Locations? <br /> Try our Bulk Data Import
                Service
              </Typography>

              <Typography
                weight="400"
                size="17px"
                lineHeight="24px"
                className="mb-0"
              >
                Effortlessly import large number of listings into
                FindHealthcare.com with our Bulk Data Import Service. Perfect
                for organizations looking to quickly and efficiently upload
                extensive information.
              </Typography>
            </div>

            <div className="mt-4">
              {featureData.map((data, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center gap-2 mb-3"
                >
                  <FaRegCircleCheck size={20} color="#000" />
                  <Typography
                    size="16px"
                    weight="400"
                    color="#000"
                    lineHeight="24px"
                    className="mb-0"
                  >
                    {data.feature}
                  </Typography>
                </div>
              ))}
            </div>

            <div className="">
              <GenericButton
                // onClick={handleSearchButton}
                width="272px"
                height="44px"
                background="#000"
                padding="10px 20px"
                className="mt-4 mb-2"
              >
                Contact for Pricing
              </GenericButton>
            </div>
          </Col>

          <Col
            lg={5}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              className="mt-lg-0 mt-5 w-75"
              src={IMAGES.BULK_UPLOAD_ICON}
              alt="icon"
            />
          </Col>
        </Row>
      </Box>
    </div>
  );
};

export default BulkUploadSection;
