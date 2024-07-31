import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

const PlanBox = ({ price,duration }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="rounded-2 me-2"
      style={{
        border: checked ? "1px solid #00C1B6" : "1px solid #CACACA",
        padding: "26px 40px",
      }}
    >
      <div className="centerIt justify-content-between">
        <span style={{ fontSize: "27px", fontWeight: "700" }}>{price}</span>
        <span
          className="rounded-circle centerIt justify-content-center"
          style={{
            color: "#fff",
            width: "26px",
            height: "26px",
            border: checked ? "" : "2px solid #CACACA",
            backgroundColor: checked ? "#00C1B6" : "",
          }}
          onClick={() => setChecked(!checked)}
        >
          {checked && <FiCheck />}
        </span>
      </div>
      <p style={{ color: checked ? "#00C1B6" : "#00000" }}>
        <span style={{ fontWeight: "700" }}>Per {duration}</span> (Recurring)
      </p>
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
          Rotating Ad Banners
        </p>
      </div>
      <div className="centerIt mb-2 ">
        <span
          className="rounded-circle centerIt justify-content-center me-2"
          style={{
            width: "17px",
            height: "17px",
            border: "1px solid black",
          }}
        >
          <FiCheck style={{ fontSize: "12px" }} />
        </span>
        <p className="m-0" style={{ fontSize: "15px" }}>
          Increased Visibility
        </p>
      </div>
      <div className="centerIt mb-2 ">
        <span
          className="rounded-circle centerIt justify-content-center me-2"
          style={{
            width: "17px",
            height: "17px",
            border: "1px solid black",
          }}
        >
          <FiCheck style={{ fontSize: "12px" }} />
        </span>
        <p className="m-0" style={{ fontSize: "15px" }}>
          Targeted Exposure
        </p>
      </div>
      <div className="centerIt mb-2 ">
        <span
          className="rounded-circle centerIt justify-content-center me-2"
          style={{
            width: "17px",
            height: "17px",
            border: "1px solid black",
          }}
        >
          <FiCheck style={{ fontSize: "12px" }} />
        </span>
        <p className="m-0" style={{ fontSize: "15px" }}>
          Cost-Effective Advertising
        </p>
      </div>
      <div className="centerIt  ">
        <span
          className="rounded-circle centerIt justify-content-center me-2"
          style={{
            width: "17px",
            height: "17px",
            border: "1px solid black",
          }}
        >
          <FiCheck style={{ fontSize: "12px" }} />
        </span>
        <p className="m-0" style={{ fontSize: "15px" }}>
          Brand Exposure
        </p>
      </div>
    </div>
  );
};

export default PlanBox;
