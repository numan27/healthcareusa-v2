import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./Navigation/RouterConfig";
import { ToastContainer } from "react-toastify";
import "./assets/css/styles.css"
import { LoaderPageWithoutBG } from "./assets"


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
