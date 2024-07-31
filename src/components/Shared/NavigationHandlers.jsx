// navigationHandlers.js
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PATH } from "../../config";
import { useModal } from "../api/PlanContext";

export const useNavigationHandlers = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");
  const { openSignInModal } = useModal();

  const handleNavigateListingSubmission = () => {
    if (auth) {
      navigate(PATH.LISTING_SUBMISSION);
    } else {
      openSignInModal();
    }
  };

  const handleNavigateDashboard = () => {
    if (auth) {
      navigate(PATH.DASHBOARD);
    } else {
      openSignInModal();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(PATH.HOME);
    toast.success("User Logged Out!", {
      autoClose: 2000,
    });
  };

  const handleNavigatePricing = () => {
    navigate("/pricing-plans");
  };

  return {
    handleNavigateListingSubmission,
    handleNavigateDashboard,
    handleLogout,
    handleNavigatePricing,
  };
};