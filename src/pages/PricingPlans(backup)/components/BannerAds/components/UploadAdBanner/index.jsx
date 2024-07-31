import React from "react";
import AdCard from "./AdCard";

const index = () => {
  return (
    <div>
      <div className="centerIt justify-content-between mb-4 mt-5">
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
            2
          </div>
          <p
            className="m-0 "
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#35404A",
            }}
          >
            Upload Ad Banners
          </p>
        </div>
        {/* <p
          className="m-0"
          style={{ fontSize: "18px", color: "#00C1B6", fontWeight: "600" }}
        >
          Select all
        </p> */}
      </div>

      <AdCard />
      <AdCard />
    </div>
  );
};

export default index;
