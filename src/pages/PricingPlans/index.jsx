import { useState } from "react";
import PricingCharacter from "../../assets/SVGs/PricingCharacter";
import {
  Box,
  GenericTabs,
  Typography,
} from "../../components/GenericComponents";
import Articles from "./components/Articles";
import BannerAds from "./components/BannerAds";
import FeaturedListings from "./components/FeaturedListings";

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState("featured");

  const getHeading = () => {
    switch (activeTab) {
      case "featured":
        return "Free & Featured Listing Plans";
      case "ads":
        return "Sponsored Banner Ads";
      case "articles":
        return "Plans to Publish Blog Articles";
      default:
        return "Free & Featured Listing Plans";
    }
  };

  return (
    <>
      <Box className="pricing-top-bar w-100 pt-md-5 pt-3">
        <div className="d-flex flex-column align-items-center justify-content-center gap-3 pt-md-4">
          <PricingCharacter />
          <Typography weight="800" color="#fff" size="40px" className="mb-0">
            {getHeading()}
          </Typography>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <GenericTabs
            defaultActiveKey="featured"
            id="my-tabs"
            onSelect={(k) => setActiveTab(k)}
            tabs={[
              {
                eventKey: "featured",
                title: "Featured Listings",
                content: <FeaturedListings />,
              },
              {
                eventKey: "ads",
                title: "For Banner Ads",
                content: <BannerAds />,
              },
              {
                eventKey: "articles",
                title: "For Articles",
                content: <Articles />,
              },
            ]}
            className="custom-tabs"
          />
        </div>
      </Box>
    </>
  );
};

export default PricingPlans;
