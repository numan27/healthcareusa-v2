import React from "react";
import { Col, Row } from "react-bootstrap";
import { BsCheckLg } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCheck } from "react-icons/md";
import IMAGES from "../../../../../../assets/images";
import { PiMagnifyingGlassPlusBold } from "react-icons/pi";

const Step1 = () => {
  const pagesArr = ["Home page", "Search Page", "Details Page", "Other Places"];
  const [activeTab, setActiveTab] = React.useState("Home page");
  return (
    <div>
      <div
        className="rounded-pill mx-auto d-flex my-5"
        style={{
          backgroundColor: "#F5F5F5",
          padding: "3px",
          width: "fit-content",
        }}
      >
        {pagesArr.map((item) => (
          <div
            className={`rounded-pill pages-tab ${
              activeTab === item && "active "
            }`}
            style={{
              padding: "8px 20px 8px 20px",
              cursor: "pointer",
            }}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="centerIt justify-content-between mb-4">
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
            1
          </div>
          <p
            className="m-0 "
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#35404A",
            }}
          >
            Select Banner Ad Placement for Home Page
          </p>
        </div>
        <p
          className="m-0"
          style={{ fontSize: "18px", color: "#00C1B6", fontWeight: "600" }}
        >
          Select all
        </p>
      </div>

      <Row className="plan-tab-card ">
        <Col sm={8} className="content ps-4 pe-2 py-4">
          <div className="rounded-pill ad-size-badge mb-2">
            Ad Banner Size: 738 x 196 px
          </div>
          <div className="centerIt mb-2">
            <div className="card-check rounded-circle centerIt text-white me-3">
              <FaCheck className="" style={{ fontSize: "13px" }} />
            </div>
            <p
              className="m-0 me-2"
              style={{
                fontSize: "26px",
                fontWeight: "600",
                color: "#23262F",
              }}
            >
              {" "}
              Main Body Prime Area Ad
            </p>
            <div
              className="rounded-pill"
              style={{
                backgroundColor: "#F1F1F1",
                padding: "4px 8px",
                fontSize: "15px",
              }}
            >
              Highly Recommended
            </div>
          </div>
          <p className="mb-4" style={{ fontSize: "17px" }}>
            Capture the attention of our audience with your{" "}
            <u>
              {" "}
              banner ad featured prominently in the center on our Home Page.
            </u>{" "}
            This prime location ensures your ad is seen by all visitor.
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
            <p className="m-0">Increased traffic to your url</p>
          </div>
          <p className="mb-2" style={{ fontSize: "20px" }}>
            Starting at <strong style={{ fontWeight: "900" }}>$599</strong>{" "}
            <span style={{ fontSize: "16px" }}>/ month</span>
          </p>

          <p
            className="m-0 rounded-pill"
            style={{
              backgroundColor: "#FAFAFA",
              padding: "4px 8px",
              width: "fit-content",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            Save 25% by choosing annual plan during checkout.
          </p>
        </Col>
        <Col
          sm={4}
          className="rounded-end-2 "
          style={{ backgroundColor: "#EAFFFF" }}
        >
          <div
            style={{
              padding: "0px 105px 30px",
              alignSelf: "end",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "end",
            }}
          >
            <div className="">
              <img src={IMAGES.AD1} alt="" style={{ width: "100%" }} />
            </div>
            <div
              className=" rounded-pill centerIt mx-auto mt-3"
              style={{
                backgroundColor: "#ADF4F4",
                padding: "4px 8px",
                width: "fit-content",
              }}
            >
              <PiMagnifyingGlassPlusBold className="me-2" />
              <p
                className="m-0"
                style={{ fontSize: "12px", fontWeight: "500" }}
              >
                FULL PREVIEW
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Step1;
