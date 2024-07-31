import React, { useEffect, useContext } from "react";
import { Typography } from "../../../components/GenericComponents";
import { PlanContext } from "../../../components/api/PlanContext";

const FinalStep = () => {
  const { selectedPlan } = useContext(PlanContext);

  useEffect(() => {
    const redirectToCheckout = async () => {
      const redirectURL = localStorage.getItem("redirectURL");

      if (redirectURL) {
        window.location.href = redirectURL;
      } else {
        console.error("Submission was not successful");
      }
    };

    redirectToCheckout();
  }, [selectedPlan]);

  return (
    <div className="text-center mt-5">
      <Typography
        weight="600"
        align="center"
        color="#070026"
        size="24px"
        font="Inter"
        lineHeight="36px"
      >
        Congratulations!
      </Typography>
      <Typography
        weight="400"
        align="center"
        color="#73777D"
        size="16px"
        font="Inter"
        lineHeight="24px"
      >
        Your listing has been successfully submitted.
      </Typography>
    </div>
  );
};

export default FinalStep;
