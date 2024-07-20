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
  return (
    <>
      <Box className="pricing-top-bar w-100 pt-md-5 pt-3">
        <div className="d-flex flex-column align-items-center justify-content-center gap-3 pt-md-4">
          <PricingCharacter />
          <Typography weight="800" color="#fff" size="40px" className="mb-0">
            Free & Featured Listing Plans
          </Typography>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <GenericTabs
            defaultActiveKey="home"
            id="my-tabs"
            tabs={[
              {
                eventKey: "prompts",
                title: "Featured  Listings",
                content: <FeaturedListings />,
              },
              {
                eventKey: "company",
                title: "For Banner Ads",
                content: <BannerAds />,
              },
              {
                eventKey: "brand",
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
