import React, { useContext } from "react";
import AdCard from "./AdCard";
import ListingsContext from "../../../../../../components/api/ListingsContext";
import HomePage from "../AdPlacement/HomePage";
import SearchPage from "../AdPlacement/SearchPage";
import DetailsPage from "../AdPlacement/DetailsPage";
import OtherPlaces from "../AdPlacement/OtherPlaces";

const Step1 = () => {
  const pagesArr = ["Home Page", "Search Page", "Details Page", "Other Places"];
  const { activeTab, setActiveTab } = useContext(ListingsContext);
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

      {activeTab === "Home Page" ? (
        <HomePage />
      ) : activeTab === "Search Page" ? (
        <SearchPage />
      ) : activeTab === "Details Page" ? (
        <DetailsPage />
      ) : activeTab === "Other Places" ? (
        <OtherPlaces />
      ) : (
        ""
      )}
    </div>
  );
};
export default Step1;
