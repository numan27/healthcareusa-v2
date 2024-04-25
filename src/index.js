/* eslint-disable react/jsx-filename-extension */

import React from "react";
import ReactDOM from "react-dom/client";
// import { ToastContainer } from "react-toastify";
import App from "./App";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      {/* <ToastContainer style={{ zIndex: 10000000000000 }} /> */}
      <App />
  </React.StrictMode>
);
