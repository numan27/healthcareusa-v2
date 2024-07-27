import React from "react";
import { Col, Row } from "react-bootstrap";
import ArticleCard from "./ArticleCard";

const Articles = () => {
  return (
    <div className="d-flex w-100 min-vh-100 align-items-center justify-content-center">
      <Row>
        <Col sm={8} className="mx-auto py-5">
          <ArticleCard />
          <ArticleCard />
        </Col>
      </Row>
    </div>
  );
};

export default Articles;
