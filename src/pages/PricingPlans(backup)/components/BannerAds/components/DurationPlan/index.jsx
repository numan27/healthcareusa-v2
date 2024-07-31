import React from "react";
import SelectedAds from "./SelectedAds";
import { Col, Row } from "react-bootstrap";
import PlanBox from "./PlanBox";

const index = () => {
  return (
    <div>
      <SelectedAds />
      <div className="centerIt justify-content-between my-4">
        <div className="centerIt">
          <div
            className="rounded-circle centerIt justify-content-center me-3"
            style={{
              width: "43px",
              height: "43px",
              fontSize: "20px",
              fontWeight: "600",
              backgroundColor: "#F5F5F5",
            }}
          >
            3
          </div>
          <p
            className="m-0 "
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#35404A",
            }}
          >
            Select your plan
          </p>
        </div>
        {/* <p
          className="m-0"
          style={{ fontSize: "18px", color: "#00C1B6", fontWeight: "600" }}
        >
          Select all
        </p> */}
      </div>

      <Row>
        <Col sm={6}>
          <PlanBox price="$25" duration="Month" />
        </Col>
        <Col sm={6}>
          <PlanBox price="$300" duration="Year" />
        </Col>
      </Row>
    </div>
  );
};

export default index;
