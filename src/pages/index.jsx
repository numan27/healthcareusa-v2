import React from "react";

const NOPAGE = React.lazy(() => import("./NoPageFound"));
const HOME = React.lazy(() => import("./Home"));
const ABOUT = React.lazy(() => import("./About"));
const BLOGS = React.lazy(() => import("./Blogs"));
const DETAIL_BLOG = React.lazy(() => import("./Blogs/DetailedBlog"));
const RESOURCES = React.lazy(() => import("./Resources"));
const CONTACT = React.lazy(() => import("./Contact"));
const LISTINGS = React.lazy(() => import("./Listings"));
const LISTING_DETAILS = React.lazy(() =>
  import("./Listings/ListingDetailsPage")
);
const ARCHIVE = React.lazy(() => import("./Archive"));
const CLAIM_LISTING = React.lazy(() => import("./ClaimListingSubmission"));
const LISTING_SUBMISSION = React.lazy(() => import("./ListingSubmission"));
const NAVIGATE_TO_LISTINGS = React.lazy(() =>
  import("./AdScreens/NavigateToListings")
);
const NAVIGATE_TO_EXTERNAL_LINK = React.lazy(() =>
  import("./AdScreens/NavigateToExternalLink")
);
const DASHBOARD = React.lazy(() => import("./Dashboard"));
const PRICING_PLANS = React.lazy(() => import("./PricingPlans"));
// const FORM_FINAL_STEP = React.lazy(() =>
//   import("./ListingSubmission/components/FinalStep")
// );

const WEB_PAGES = {
  NOPAGE,
  DASHBOARD,
  HOME,
  ABOUT,
  BLOGS,
  DETAIL_BLOG,
  RESOURCES,
  CONTACT,
  LISTINGS,
  LISTING_DETAILS,
  ARCHIVE,
  CLAIM_LISTING,
  LISTING_SUBMISSION,
  NAVIGATE_TO_LISTINGS,
  NAVIGATE_TO_EXTERNAL_LINK,
  PRICING_PLANS,
  // FORM_FINAL_STEP,
};
export default WEB_PAGES;
