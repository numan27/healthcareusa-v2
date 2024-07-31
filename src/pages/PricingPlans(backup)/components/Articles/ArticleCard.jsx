import React from "react";
import { Col, Row } from "react-bootstrap";
import { BsCheckLg } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCheck } from "react-icons/md";
import { PiMagnifyingGlassPlusBold } from "react-icons/pi";
import IMAGES from "../../../../assets/images";
const ArticleCard = () => {
  return (
    <Row
      className="plan-tab-card mt-3"
      style={{ backgroundColor: "#EAFFFF", padding: "30px 20px" }}
    >
      <Col sm={7} className="content  px-0 py-2">
        <div className="centerIt mb-2">
          <p
            className="m-0 "
            style={{
              fontSize: "26px",

              color: "#23262F",
            }}
          >
            {" "}
            Get Prime Spotlight for{" "}
            <span className="" style={{ fontWeight: "700" }}>
              Home Page
            </span>
            <span style={{ fontWeight: "600" }}> Article</span>
          </p>
        </div>
        <p className="mb-4" style={{ fontSize: "16px" }}>
          Capture the attention of our audience with your Article featured
          prominently on our Home Page. This prime location ensures your ad is
          seen by all visitor
        </p>
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
          <p className="m-0">High visibility to all site visitors</p>
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
            Increased traffic to your article published on our site
          </p>
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
          <p className="m-0">Prominent positioning for a specified duration</p>
        </div>

        <button
          className="rounded-2 mt-4"
          style={{
            backgroundColor: "#23262F",
            color: "#fff",
            fontSize: "12px",
            padding: "10px 20px",
          }}
        >
          Get Started for $599 / month
        </button>
      </Col>
      <Col sm={5} className="rounded-end-2 ">
        <div
          style={{
            // padding: "0px 82px 30px",
            alignSelf: "end",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <img
            src={IMAGES.AD1}
            alt=""
            style={{
              width: "100%",
              maxHeight: "340px",
              maxWidth: "300px",
              borderRadius: "8px",
              border: "2px solid black",
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ArticleCard;
