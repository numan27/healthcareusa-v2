/** @format */

import { Routes, Route } from "react-router-dom";
import PublicRoute from "./Routes/PublicRoute.jsx";
// import ProtectedRoute from "./Routes/ProtectedRoute";
import WEB_PAGES from "../pages";
import { PATH } from "../config";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

function RouterConfig() {
  return (
    <Routes>
      {/* Protect Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path={PATH.ADD_LISTING}
          element={<PublicRoute element={<WEB_PAGES.ADD_LISTING />} />}
        />
        <Route
          path={PATH.CLAIM_LISTING}
          element={<PublicRoute element={<WEB_PAGES.CLAIM_LISTING />} />}
        />
        <Route
          path={PATH.LISTING_SUBMISSION}
          element={<PublicRoute element={<WEB_PAGES.LISTING_SUBMISSION />} />}
        />
        <Route
          path={PATH.DASHBOARD}
          element={<PublicRoute element={<WEB_PAGES.DASHBOARD />} />}
        />
      </Route>

      {/* Public Routes */}
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
        path={PATH.BLOGS}
        element={<PublicRoute element={<WEB_PAGES.BLOGS />} />}
      />
      <Route
        path={PATH.DETAIL_BLOG}
        element={<PublicRoute element={<WEB_PAGES.DETAIL_BLOG />} />}
      />
      <Route
        path={PATH.RESOURCES}
        element={<PublicRoute element={<WEB_PAGES.RESOURCES />} />}
      />
      <Route
        path={PATH.CONTACT}
        element={<PublicRoute element={<WEB_PAGES.CONTACT />} />}
      />
      <Route
        path={PATH.LISTINGS}
        element={<PublicRoute element={<WEB_PAGES.LISTINGS />} />}
      />
      <Route
        path={PATH.LISTING_DETAILS}
        element={<PublicRoute element={<WEB_PAGES.LISTING_DETAILS />} />}
      />
      <Route
        path={PATH.NAVIGATE_TO_LISTINGS}
        element={<PublicRoute element={<WEB_PAGES.NAVIGATE_TO_LISTINGS />} />}
      />
      <Route
        path={PATH.NAVIGATE_TO_EXTERNAL_LINK}
        element={
          <PublicRoute element={<WEB_PAGES.NAVIGATE_TO_EXTERNAL_LINK />} />
        }
      />
      {/* <Route
        path={PATH.FORM_FINAL_STEP}
        element={<PublicRoute element={<WEB_PAGES.FORM_FINAL_STEP />} />}
      /> */}

      {/* <Route
        path={PATH.ADD_LISTING}
        element={<ProtectedRoute element={<WEB_PAGES.ADD_LISTING />} />}
      /> */}

      {/* NO PAGE FOUND */}
      <Route path={PATH.NOPAGE} element={<WEB_PAGES.NO_PAGE_FOUND />} />
    </Routes>
  );
}

export default RouterConfig;
