import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RouterConfig from "./Navigation/RouterConfig.jsx";
import { LoaderPageWithoutBG } from "./assets";

function App() {
  return (
    <Router>
      <Suspense fallback={<LoaderPageWithoutBG />}>
        <ToastContainer />
        <RouterConfig />
      </Suspense>
    </Router>
  );
}

export default App;