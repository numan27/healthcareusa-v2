import React from "react";

const HOME = React.lazy(() => import("./Home"));
const ABOUT = React.lazy(() => import("./About"));


const WEB_PAGES = {

  HOME,
  ABOUT,
};
export default WEB_PAGES;
