import React from "react";

const HOME = React.lazy(() => import("./Home"));
const ABOUT = React.lazy(() => import("./About"));
const LISTINGS = React.lazy(() => import("./Listings"));
const LISTING_DETAILS = React.lazy(() => import("./Listings/ListingDetailsPage"));


const WEB_PAGES = {

  HOME,
  ABOUT,
  LISTINGS,
  LISTING_DETAILS
};
export default WEB_PAGES;
