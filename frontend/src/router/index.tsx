import { useRoutes } from "react-router-dom";
import DashboardOverview1 from "../pages/DashboardOverview1";
import UsersLayout1 from "../pages/UsersLayout1";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import UpdateProfile from "../pages/UpdateProfile";
import ChangePassword from "../pages/ChangePassword";
import UserList from "../pages/Administration/Users/UserList"
import CompanyList from "../pages/Administration/Company/CompanyList"
import UploadDaily from "../pages/Upload/Daily/DailyList"
import UploadTablet from "../pages/Upload/Tablet/TabletList"
import UploadCancellation from "../pages/Upload/Cancellation/CancellationList"
import UploadDigitalSignature from "../pages/Upload/DigitalSignature/DigitalSignatureList"

import LoadPolicy from "../pages/Load/LoadPolicy/Dashboard"

import Layout from "../themes";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <DashboardOverview1 />,
        },
        {
          path: "users-layout-1",
          element: <UsersLayout1 />,
        },
        {
          path: "profile",
          element: <UpdateProfile />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },

        // Upload
        {
          path: "upload-daily",
          element: <UploadDaily />,
        },
        {
          path: "upload-tablet",
          element: <UploadTablet />,
        },
        {
          path: "upload-cancellation",
          element: <UploadCancellation />,
        },
        {
          path: "upload-digital-signature",
          element: <UploadDigitalSignature />,
        },

         // Load
         {
          path: "load-policy",
          element: <LoadPolicy />,
        },
        {
          path: "upload-tablet",
          element: <UploadTablet />,
        },

        // Administration
        {
          path: "company-list",
          element: <CompanyList />,
        },
        {
          path: "user-list",
          element: <UserList />,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
