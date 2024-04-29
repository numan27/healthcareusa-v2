import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./Navigation/RouterConfig";
import { ToastContainer } from "react-toastify";
import "./assets/css/styles.css"
import { CircularProgress } from "@mui/material";


function App() {
  return (
    <Router>
      <React.Suspense fallback={<CircularProgress className="mui-loader" color="success" />}>
        <ToastContainer />
        <RouterConfig />
      </React.Suspense>
    </Router>
  );
}

export default App;
