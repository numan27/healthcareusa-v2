import React from 'react'
import AdCard from '../steps/AdCard'

const DetailsPage = () => {
  return (
    <div><div className="centerIt justify-content-between mb-4">
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
        Select Banner Ad Placement for Details Page
      </p>
    </div>
    <p
      className="m-0"
      style={{ fontSize: "18px", color: "#00C1B6", fontWeight: "600" }}
    >
      Select all
    </p>
  </div>

  <AdCard/>
  <AdCard/>
  <AdCard/></div>
  )
}

export default DetailsPage