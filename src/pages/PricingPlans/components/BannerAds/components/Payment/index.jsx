import React from "react";
import { Col, Row } from "react-bootstrap";
import { FiCheck } from "react-icons/fi";
import { TiFlash } from "react-icons/ti";

const index = () => {
  return (
    <div>
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
            4
          </div>
          <p
            className="m-0 "
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#35404A",
            }}
          >
            Fill out your payment details
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
        <Col sm={8}>
          <div
            className="rounded-2"
            style={{ border: "1px solid #CACACA", padding: "30px 20px" }}
          >
            <Row>
              <p
                className="mb-4"
                style={{ fontSize: "21px", fontWeight: "700" }}
              >
                Billing Contact
              </p>
              <Col>
                <div>
                  <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                    First Name
                  </p>
                  <input
                    type="text"
                    className="rounded-2 w-100 payment-input mb-3 "
                  />
                </div>
                <div>
                  <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                    Phone
                  </p>
                  <input
                    type="text"
                    className="rounded-2 w-100 payment-input mb-3"
                  />
                </div>
                <div>
                  <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                    Address line
                  </p>
                  <input
                    type="text"
                    className="rounded-2 w-100 payment-input mb-3"
                  />
                </div>
                <div>
                  <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                    State
                  </p>
                  <input
                    type="text"
                    className="rounded-2 w-100 payment-input mb-3"
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                    Last Name
                  </p>
                  <input
                    type="text"
                    className="rounded-2 w-100 payment-input mb-3"
                  />
                </div>
                <div>
                  <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                    Email
                  </p>
                  <input
                    type="text"
                    className="rounded-2 w-100 payment-input mb-3"
                  />
                </div>
                <div>
                  <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                    City
                  </p>
                  <input
                    type="text"
                    className="rounded-2 w-100 payment-input mb-3"
                  />
                </div>
                <div>
                  <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                    Postal code
                  </p>
                  <input
                    type="text"
                    className="rounded-2 w-100 payment-input mb-3"
                  />
                </div>
              </Col>
              <p
                className="my-4"
                style={{ fontSize: "21px", fontWeight: "700" }}
              >
                Payment Details
              </p>

              <div>
                <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                  Cardholder’s name
                </p>
                <input
                  type="text"
                  className="rounded-2 w-100 payment-input mb-3"
                />
              </div>
              <div>
                <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                  Card number
                </p>
                <input
                  type="text"
                  className="rounded-2 w-100 payment-input mb-3"
                />
              </div>
              <Col sm={6}>
                <div>
                  <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                    Experity
                  </p>
                  <input
                    type="text"
                    className="rounded-2 w-100 payment-input mb-3"
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div>
                  <p className="mb-1 fs_14" style={{ fontWeight: "600" }}>
                    CVC
                  </p>
                  <input
                    type="text"
                    className="rounded-2 w-100 payment-input mb-3"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm={4}>
          <div
            className="rounded-2"
            style={{ border: "1px solid #CACACA", padding: "30px 20px" }}
          >
            <div className="centerIt mb-4">
              <span
                className="centerIt justify-content-center rounded-circle me-2 "
                style={{
                  width: "19px",
                  height: "19px",
                  backgroundColor: "#FFC700",
                }}
              >
                <TiFlash />
              </span>
              <p
                className="m-0"
                style={{ fontWeight: "700", fontSize: "14px" }}
              >
                {" "}
                Payment Summary
              </p>
            </div>
            <div className="centerIt mb-2 ">
              <span
                className="rounded-circle centerIt justify-content-center me-2 "
                style={{
                  width: "17px",
                  height: "17px",
                  border: "1px solid black",
                }}
              >
                <FiCheck style={{ fontSize: "12px" }} />
              </span>
              <p className="m-0" style={{ fontSize: "15px" }}>
                Name:{" "}
                <span className="" style={{ fontWeight: "700" }}>
                  Ad Banners 001-00001
                </span>
              </p>
            </div>
            <div className="centerIt mb-2 ">
              <span
                className="rounded-circle centerIt justify-content-center me-2 "
                style={{
                  width: "17px",
                  height: "17px",
                  border: "1px solid black",
                }}
              >
                <FiCheck style={{ fontSize: "12px" }} />
              </span>
              <p className="m-0" style={{ fontSize: "15px" }}>
                Ad Count:{" "}
                <span className="" style={{ fontWeight: "700" }}>
                  5 Banners
                </span>
              </p>
            </div>
            <div className="centerIt mb-2 ">
              <span
                className="rounded-circle centerIt justify-content-center me-2 "
                style={{
                  width: "17px",
                  height: "17px",
                  border: "1px solid black",
                }}
              >
                <FiCheck style={{ fontSize: "12px" }} />
              </span>
              <p className="m-0" style={{ fontSize: "15px" }}>
                Plan:{" "}
                <span className="" style={{ fontWeight: "700" }}>
                  Monthly (Recurring)
                </span>
              </p>
            </div>
            <div className="centerIt mb-2 ">
              <span
                className="rounded-circle centerIt justify-content-center me-2 "
                style={{
                  width: "17px",
                  height: "17px",
                  border: "1px solid black",
                }}
              >
                <FiCheck style={{ fontSize: "12px" }} />
              </span>
              <p className="m-0" style={{ fontSize: "15px" }}>
                Duration:{" "}
                <span className="" style={{ fontWeight: "700" }}>
                  30 Days
                </span>
              </p>
            </div>
            <div className="centerIt mb-2 ">
              <span
                className="rounded-circle centerIt justify-content-center me-2 "
                style={{
                  width: "17px",
                  height: "17px",
                  border: "1px solid black",
                }}
              >
                <FiCheck style={{ fontSize: "12px" }} />
              </span>
              <p className="m-0" style={{ fontSize: "15px" }}>
                Total Cost:{" "}
                <span className="" style={{ fontWeight: "700" }}>
                  $300
                </span>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default index;
