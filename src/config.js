import { toast } from "react-toastify";

const ERROR = {
  SYSTEM_ERROR: "System error. Please try again later!",
};

const PATH = {
  NOPAGE: "*",
  HOME: "/",
  DASHBOARD: "/dashboard",
  ABOUT: "/about",
  BLOGS: "/blogs",
  DETAIL_BLOG: "/blogs/:id",
  CONTACT: "/contact",
  RESOURCES: "/resources",
  LISTINGS: "/listings",
  LISTING_DETAILS: "/listing-details/:id",
  ADD_LISTING: "/add-listing",
  CLAIM_LISTING: "/claim-listing",
  LISTING_SUBMISSION: "/listing-submission",
  NAVIGATE_TO_LISTINGS: "/navigate-to-listings",
  NAVIGATE_TO_EXTERNAL_LINK: "/navigate-to-external-link",
  PRICING_PLANS: "/pricing-plans",
  // FORM_FINAL_STEP: "/form-submitted",
};

const TOASTER_STYLING_VALUES = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const NOTIFICATIONS_LISTING = (type, message) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};


export {
  ERROR,
  PATH,
  TOASTER_STYLING_VALUES,
  NOTIFICATIONS_LISTING
};
