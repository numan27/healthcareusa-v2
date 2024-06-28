import React from "react";
import { Row, Col } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <Row className="justify-content-center mt-4">
      <Col xs="auto">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
          />
        </Stack>
      </Col>
    </Row>
  );
};

export default PaginationComponent;
