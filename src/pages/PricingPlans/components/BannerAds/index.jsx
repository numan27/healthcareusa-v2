import React from "react";
import { GenericStepper } from "../../../../components/GenericComponents";
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";
import Step4 from "./components/steps/Step3";
import { Col, Container, Row } from "react-bootstrap";

const BannerAds = () => {
  const defaultSteps = ["Step 1", "Step 2", "Step 3", "Step 4"];
  const stepContent = [<Step1 />, <Step2 />, <Step3 />, <Step4 />];

  return (
    <div className="d-flex w-100 align-items-center justify-content-center">
      <Container className="mt-5 pt-5">
        <Row>
          <Col className="mx-auto" md={6}>
            <GenericStepper steps={defaultSteps} stepContent={stepContent} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BannerAds;
