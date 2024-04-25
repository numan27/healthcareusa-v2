import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./Navigation/RouterConfig";
import { ToastContainer } from "react-toastify";
import "./assets/css/styles.css"


function App() {
  return (
    <Router>
      <ToastContainer />
      <RouterConfig />
    </Router>
  );
}

export default App;
