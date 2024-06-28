import React from "react";
import { Row, Col } from "react-bootstrap";
import { GenericButton } from "./GenericComponents";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PaginationComponent = ({
  currentPage,
  handleNextPage,
  handlePrevPage,
  listingProfiles,
  profilesPerPage,
}) => {
  return (
    <Row className="justify-content-center mt-4">
      <Col xs="auto">
        <GenericButton
          width="36px"
          height="36px"
          padding="0"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="btn btn-primary me-2"
        >
          <FaChevronLeft />
        </GenericButton>
      </Col>
      <Col xs="auto">
        <GenericButton
          width="36px"
          height="36px"
          padding="0"
          onClick={handleNextPage}
          disabled={listingProfiles.length < profilesPerPage}
          className="btn btn-primary"
        >
          <FaChevronRight />
        </GenericButton>
      </Col>
    </Row>
  );
};

export default PaginationComponent;
