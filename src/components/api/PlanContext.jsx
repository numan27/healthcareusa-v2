import React, { createContext, useContext, useState, useEffect } from "react";

export const ModalContext = createContext();
export const PlanContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [forgetPassModalShow, setForgetPassModalShow] = useState(false);
  const [signInModalShow, setSignInModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);

  const CloseModal = () => {
    setSignInModalShow(false);
    setForgetPassModalShow(false);
    setSignUpModalShow(false);
  };

  const openSignInModal = () => {
    setSignUpModalShow(false);
    setSignInModalShow(true);
  };

  const openSignUpModal = () => {
    setSignInModalShow(false);
    setSignUpModalShow(true);
  };

  const openForgetPassModal = () => {
    setSignInModalShow(false);
    setForgetPassModalShow(true);
  };

  return (
    <ModalContext.Provider
      value={{
        forgetPassModalShow,
        signInModalShow,
        signUpModalShow,
        setForgetPassModalShow,
        setSignInModalShow,
        setSignUpModalShow,
        CloseModal,
        openSignInModal,
        openSignUpModal,
        openForgetPassModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const PlanProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(() => {
    return localStorage.getItem("selectedPlan") || null;
  });
  const [selectedPlanName, setselectedPlanName] = useState(() => {
    return localStorage.getItem("selectedPlanName") || "basic";
  });

  useEffect(() => {
    if (selectedPlan) {
      localStorage.setItem("selectedPlan", selectedPlan);
    }
    if (selectedPlanName) {
      localStorage.setItem("selectedPlanName", selectedPlanName);
    }
  }, [selectedPlan, selectedPlanName]);

  return (
    <PlanContext.Provider
      value={{
        selectedPlan,
        selectedPlanName,
        setSelectedPlan,
        setselectedPlanName,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};
