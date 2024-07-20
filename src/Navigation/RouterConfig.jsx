/** @format */

import { Routes, Route } from "react-router-dom";
import PublicRoute from "./Routes/PublicRoute.jsx";
// import ProtectedRoute from "./Routes/ProtectedRoute";
import WEB_PAGES from "../pages";
import { PATH } from "../config";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
// import BreadCrumb from "../components/BreadCrumb.jsx";
import AppLayout from "../components/Layout/AppLayout.jsx";

function AppRoute({ element, useLayout }) {
  return useLayout ? (
    <AppLayout>
      {/* <BreadCrumb /> */}
      {element}
    </AppLayout>
  ) : (
    element
  );
}

function RouterConfig() {
  return (
    <Routes>
      {/* Exclude listing-submission route from AppLayout */}
      <Route
        path={PATH.LISTING_SUBMISSION}
        element={
          <PublicRoute
            element={
              <AppRoute
                element={<WEB_PAGES.LISTING_SUBMISSION />}
                useLayout={false}
              />
            }
          />
        }
      />

      {/* Routes with AppLayout */}
      <Route
        path={PATH.CLAIM_LISTING}
        element={
          <ProtectedRoute>
            <PublicRoute
              element={
                <AppRoute
                  element={<WEB_PAGES.CLAIM_LISTING />}
                  useLayout={true}
                />
              }
            />
          </ProtectedRoute>
        }
      />
      <Route
        path={PATH.DASHBOARD}
        element={
          <PublicRoute
            element={
              <AppRoute element={<WEB_PAGES.DASHBOARD />} useLayout={false} />
            }
          />
        }
      />
      <Route
        path={PATH.LOGIN}
        element={
          <PublicRoute
            element={
              <AppRoute element={<WEB_PAGES.LOGIN />} useLayout={true} />
            }
          />
        }
      />
      <Route
        path={PATH.HOME}
        element={
          <PublicRoute
            element={<AppRoute element={<WEB_PAGES.HOME />} useLayout={true} />}
          />
        }
      />
      <Route
        path={PATH.ABOUT}
        element={
          <PublicRoute
            element={
              <AppRoute element={<WEB_PAGES.ABOUT />} useLayout={true} />
            }
          />
        }
      />
      <Route
        path={PATH.BLOGS}
        element={
          <PublicRoute
            element={
              <AppRoute element={<WEB_PAGES.BLOGS />} useLayout={true} />
            }
          />
        }
      />
      <Route
        path={PATH.DETAIL_BLOG}
        element={
          <PublicRoute
            element={
              <AppRoute element={<WEB_PAGES.DETAIL_BLOG />} useLayout={true} />
            }
          />
        }
      />
      <Route
        path={PATH.RESOURCES}
        element={
          <PublicRoute
            element={
              <AppRoute element={<WEB_PAGES.RESOURCES />} useLayout={true} />
            }
          />
        }
      />
      <Route
        path={PATH.CONTACT}
        element={
          <PublicRoute
            element={
              <AppRoute element={<WEB_PAGES.CONTACT />} useLayout={true} />
            }
          />
        }
      />
      <Route
        path={PATH.LISTINGS}
        element={
          <PublicRoute
            element={
              <AppRoute element={<WEB_PAGES.LISTINGS />} useLayout={true} />
            }
          />
        }
      />
      <Route
        path={PATH.LISTING_DETAILS}
        element={
          <PublicRoute
            element={
              <AppRoute
                element={<WEB_PAGES.LISTING_DETAILS />}
                useLayout={true}
              />
            }
          />
        }
      />
      <Route
        path={PATH.ARCHIVE}
        element={
          <PublicRoute
            element={
              <AppRoute element={<WEB_PAGES.ARCHIVE />} useLayout={true} />
            }
          />
        }
      />
      <Route
        path={PATH.NAVIGATE_TO_LISTINGS}
        element={
          <PublicRoute
            element={
              <AppRoute
                element={<WEB_PAGES.NAVIGATE_TO_LISTINGS />}
                useLayout={true}
              />
            }
          />
        }
      />
      <Route
        path={PATH.NAVIGATE_TO_EXTERNAL_LINK}
        element={
          <PublicRoute
            element={
              <AppRoute
                element={<WEB_PAGES.NAVIGATE_TO_EXTERNAL_LINK />}
                useLayout={true}
              />
            }
          />
        }
      />
      <Route
        path={PATH.PRICING_PLANS}
        element={
          <PublicRoute
            element={
              <AppRoute
                element={<WEB_PAGES.PRICING_PLANS />}
                useLayout={true}
              />
            }
          />
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
