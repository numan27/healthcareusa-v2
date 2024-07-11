import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RouterConfig from "./Navigation/RouterConfig.jsx";
import { LoaderPageWithoutBG } from "./assets";
import { ServicesProvider } from "./components/api/ServicesContext";
import { GroupedListingsProvider } from "./components/api/GroupedListingsContext.jsx";

function App() {
  return (
    <Router>
      <Suspense fallback={<LoaderPageWithoutBG />}>
        <ToastContainer />
        <GroupedListingsProvider>
          <ServicesProvider>
            <RouterConfig />
          </ServicesProvider>
        </GroupedListingsProvider>
      </Suspense>
    </Router>
  );
}

export default App;
