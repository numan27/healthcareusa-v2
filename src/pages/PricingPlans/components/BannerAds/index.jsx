import React from "react";
import { GenericStepper } from "../../../../components/GenericComponents";
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";
import Step4 from "./components/steps/Step4";
import { Col, Container, Row } from "react-bootstrap";

const BannerAds = () => {
  const defaultSteps = [
    "Add Placement",
    "Upload Ad Banners",
    "Duration Plan",
    "Payment",
  ];
  const stepContent = [<Step1 />, <Step2 />, <Step3 />, <Step4 />];
  const pagesArr = ["Home page", "Search Page", "Details Page", "Other Places"];
  const [activeTab, setActiveTab] = React.useState("Home page");
  return (
    <div className="d-flex w-100 align-items-center justify-content-center">
      <Container className="mt-5 pt-5">
        <Row>
          <Col className="mx-auto " md={9}>
            <GenericStepper steps={defaultSteps} stepContent={stepContent} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BannerAds;
