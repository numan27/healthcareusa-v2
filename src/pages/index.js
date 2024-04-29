import React from "react";

const HOME = React.lazy(() => import("./Home"));
const ABOUT = React.lazy(() => import("./About"));
const LISTINGS = React.lazy(() => import("./Listings"));


const WEB_PAGES = {

  HOME,
  ABOUT,
  LISTINGS,
};
export default WEB_PAGES;
