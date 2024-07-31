import { useState } from "react";
import React from "react";
import { FiTag } from "react-icons/fi";

const SelectedAds = () => {
  const ads = (num) => {
    return (
      <div
        className="centerIt rounded-2 justify-content-between mt-2"
        style={{
          backgroundColor: "#FFF",
          fontSize: "19px",
          padding: "26px 40px",
          border: "1px solid #00C1B6",
        }}
      >
        <div className="centerIt">
          <span
            className="centerIt justify-content-center rounded-1 me-3"
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#00C1B6",
              color: "#fff",
            }}
          >
            {num}
          </span>
          <p className="m-0" style={{ fontWeight: "600", fontSize: "19px" }}>
            Home Page Banner Ad | Center | 738 x 196 px
          </p>
        </div>
        <div
          className=" rounded-pill"
          style={{
            backgroundColor: "#ADF4F4",
            padding: "3px 22px",
            width: "fit-content",
          }}
        >
          <p className="m-0" style={{ fontSize: "12px", fontWeight: "500" }}>
            PREVIEW
          </p>
        </div>
        <p className="m-0" style={{ fontSize: "16px" }}>
          <span style={{ fontWeight: "600", fontSize: "18px" }}>$599</span>
          /month
        </p>
      </div>
    );
  };
  const [showAds, setShowAds] = useState(false);
  return (
    <div className="mt-5">
      <div
        className="centerIt rounded-2 justify-content-between"
        style={{
          backgroundColor: "#EAFFFF",
          padding: "26px 40px",
          border: "1px solid #00C1B6",
        }}
      >
        <div className="centerIt">
          <FiTag className="fs-4 me-3" />

          <p className="m-0" style={{ fontWeight: "600", fontSize: "19px" }}>
            Below pricing is based on the number of ad banners selected:
            <span style={{ fontWeight: "700" }}>3 Ads</span>
          </p>
        </div>
        <div
          className="rounded-pill "
          style={{
            fontSize: "12px",
            padding: "7px 16px",
            color: "#fff",
            backgroundColor: "#00C1B6",
            cursor: "pointer",
          }}
          onClick={() => setShowAds(!showAds)}
        >
          {showAds ? "Hide All Selected Ads" : " Show All Selected Ads"}
        </div>
      </div>
      {showAds && (
        <div
          className=" rounded-2 mt-2"
          style={{
            backgroundColor: "#EAFFFF",
            padding: "30px 40px",
            border: "1px solid #00C1B6",
          }}
        >
          <p className="" style={{ fontWeight: "600", fontSize: "19px" }}>
            {" "}
            Purchase Summary
          </p>
          <p className="mb-2" style={{ fontSize: "19px" }}>
            To make changes to your ad or remove an ad below please go back to
            the Ad Placement step.
          </p>

          {ads(1)}
          {ads(2)}
          {ads(3)}
        </div>
      )}
    </div>
  );
};

export default SelectedAds;
