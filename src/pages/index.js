import React from "react";

const NOPAGE = React.lazy(() => import("./NoPageFound"));
const HOME = React.lazy(() => import("./Home"));
const ABOUT = React.lazy(() => import("./About"));
const BLOGS = React.lazy(() => import("./Blogs"));
const DETAIL_BLOG = React.lazy(() => import("./Blogs/DetailedBlog"));
const RESOURCES = React.lazy(() => import("./Resources"));
const CONTACT = React.lazy(() => import("./Contact"));
const LISTINGS = React.lazy(() => import("./Listings"));
const LISTING_DETAILS = React.lazy(() => import("./Listings/ListingDetailsPage"));


const WEB_PAGES = {

  NOPAGE,
  HOME,
  ABOUT,
  BLOGS,
  DETAIL_BLOG,
  RESOURCES,
  CONTACT,
  LISTINGS,
  LISTING_DETAILS
};
export default WEB_PAGES;
