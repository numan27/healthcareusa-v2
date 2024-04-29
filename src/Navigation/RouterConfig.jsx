/** @format */

import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import PublicRoute from "./Routes/PublicRoute";
import WEB_PAGES from "../pages";
import PATH from "../utils/path";

function RouterConfig() {
  return (
    <Routes>
     
      <Route
        path={PATH.LOGIN}
        element={<PublicRoute element={<WEB_PAGES.LOGIN />} />}
      />
      <Route
        path={PATH.HOME}
        element={<PublicRoute element={<WEB_PAGES.HOME />} />}
      />
      <Route
        path={PATH.ABOUT}
        element={<PublicRoute element={<WEB_PAGES.ABOUT />} />}
      />
      <Route
        path={PATH.LISTINGS}
        element={<PublicRoute element={<WEB_PAGES.LISTINGS />} />}
      />
      <Route
        path={PATH.BLOG}
        element={<PublicRoute element={<WEB_PAGES.BLOG />} />}
      />
      <Route
        path={PATH.RESOURCES}
        element={<PublicRoute element={<WEB_PAGES.RESOURCES />} />}
      />
      <Route
        path={PATH.CONTACT}
        element={<PublicRoute element={<WEB_PAGES.CONTACT />} />}
      />
    
      {/* <Route
        path={PATH.APPLICANT_DETAILS}
        element={<ProtectedRoute element={<WEB_PAGES.APPLICANT_DETAILS />} />}
      /> */}


      {/* NO PAGE FOUND */}
      {/* <Route path={PATH.NOPAGE} element={<WEB_PAGES.NO_PAGE_FOUND />} /> */}
    </Routes>
  );
}

export default RouterConfig;
