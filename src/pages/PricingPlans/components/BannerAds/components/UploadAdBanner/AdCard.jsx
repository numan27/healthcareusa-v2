import React from "react";
import { Col, Row } from "react-bootstrap";
import { BsCheckLg } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCheck } from "react-icons/md";
// import IMAGES from "../../../../../../assets/images";
import { PiMagnifyingGlassPlusBold } from "react-icons/pi";
import IMAGES from "../../../../../../assets/images";
import DragDropUpload from "./DragDropUpload";
const AdCard = () => {
  return (
    <Row className="plan-tab-card mb-4">
      <Col sm={9} className="content ps-4 pe-2 py-4">
        <div className="centerIt mb-2">
          <p
            className="m-0 me-2"
            style={{
              fontSize: "26px",
              fontWeight: "600",
              color: "#23262F",
            }}
          >
            {" "}
            Home page banner ad
          </p>
          <div
            className="rounded-pill"
            style={{
              backgroundColor: "#F1F1F1",
              padding: "4px 8px",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Center ad placement
          </div>
        </div>

        <div className="centerIt mb-2">
          <div
            className="rounded-circle centerIt justify-content-center me-2"
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#23262F",
              color: "#fff",
            }}
          >
            <FaCheck className="" style={{ fontSize: "9px" }} />
          </div>
          <p className="m-0">
            Required uploaded size is{" "}
            <span style={{ fontWeight: "600" }}>738 x 196</span>
          </p>
        </div>
        <div className="centerIt mb-3">
          <div
            className="rounded-circle centerIt justify-content-center me-2"
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#23262F",
              color: "#fff",
            }}
          >
            <FaCheck className="" style={{ fontSize: "9px" }} />
          </div>
          <p className="m-0">
            Supported formats{" "}
            <span style={{ fontWeight: "600" }}>JPG or PNG</span>
          </p>
        </div>
        <DragDropUpload />
      </Col>
      <Col
        sm={3}
        className="rounded-end-2 "
        style={{ backgroundColor: "#EAFFFF" }}
      >
        <div
          style={{
            padding: "0px 45px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <div className="" style={{ padding: "0px 15px" }}>
            <img
              src={IMAGES.AD1}
              alt=""
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "2px solid black",
              }}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AdCard;
