import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./Navigation/RouterConfig";
import { ToastContainer } from "react-toastify";
import "./assets/css/styles.css"
// import { CircularProgress } from "@mui/material";
// import LoaderPageWithoutBG from "./assets/Loader"
import { LoaderPageWithoutBG } from "./assets"


function App() {
  return (
    <Suspense fallback={<LoaderPageWithoutBG />}>
      <Router>
        <ToastContainer />
        <RouterConfig />
      </Router>
    </Suspense>
    // <Router>
    //   {/* <Suspense fallback={<CircularProgress className="mui-loader" color="success" />}> */}
    //   <Suspense fallback={<LoaderPageWithoutBG />}>
    //     <ToastContainer />
    //     <RouterConfig />
    //   </Suspense>
    // </Router>
  );
}

export default App;
