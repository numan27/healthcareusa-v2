import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RouterConfig from "./Navigation/RouterConfig.jsx";
import { LoaderPageWithoutBG } from "./assets";
import { ServicesProvider } from "./components/api/ServicesContext";
import { GroupedListingsProvider } from "./components/api/GroupedListingsContext.jsx";
import { ListingsProvider } from "./components/api/ListingsContext.jsx";
import { ModalProvider, PlanProvider } from "./components/api/PlanContext.jsx";

function App() {
  return (
    <Router>
      <Suspense fallback={<LoaderPageWithoutBG />}>
        <ToastContainer />
        <ListingsProvider>
          <GroupedListingsProvider>
            <ServicesProvider>
              <ModalProvider>
                <PlanProvider>
                  <RouterConfig />
                </PlanProvider>
              </ModalProvider>
            </ServicesProvider>
          </GroupedListingsProvider>
        </ListingsProvider>
      </Suspense>
    </Router>
  );
}

export default App;
