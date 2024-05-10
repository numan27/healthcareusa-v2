import { toast } from "react-toastify";

const ERROR = {
  SYSTEM_ERROR: "System error. Please try again later!",
};

const PATH = {
  NOPAGE: "*",

  HOME: "/",
  ABOUT: "/about",
  LISTINGS: "/listings",
  LISTING_DETAILS: "/listing-details",
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
