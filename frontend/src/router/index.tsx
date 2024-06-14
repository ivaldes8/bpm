import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import UpdateProfile from "../pages/UpdateProfile";
import ChangePassword from "../pages/ChangePassword";
import UserList from "../pages/Administration/Users/UserList"
import CompanyList from "../pages/Administration/Company/CompanyList"
import MediadorList from "../pages/Administration/Mediador/MediadorList"
import FamilyDocumentList from "../pages/Administration/FamilyDocument/FamilyDocumentList"
import TypeConciliationList from "../pages/Administration/TypeConciliation/TypeConciliationList"
import UploadDaily from "../pages/Upload/Daily/DailyList"
import UploadTablet from "../pages/Upload/Tablet/TabletList"
import UploadCancellation from "../pages/Upload/Cancellation/CancellationList"
import UploadDigitalSignature from "../pages/Upload/DigitalSignature/DigitalSignatureList"

import LoadPolicy from "../pages/Load/LoadPolicy/Dashboard"
import LoadIncidencePolicy from "../pages/Load/LoadIncidencePolicy/Dashboard"

import Layout from "../themes";
import Protected from "./middlewares/protected";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Protected permissions={['ADMIN', 'MONITOR', 'BASE']} >
            <LoadPolicy />
          </Protected>,
        },
        {
          path: "profile",
          element: <Protected permissions={['ADMIN', 'MONITOR', 'BASE']} >
            <UpdateProfile />
          </Protected>,
        },
        {
          path: "change-password",
          element: <Protected permissions={['ADMIN', 'MONITOR', 'BASE']} >
            <ChangePassword />
          </Protected>,
        },

        // Upload
        {
          path: "upload-daily",
          element: <Protected permissions={['ADMIN', 'MONITOR']} >
            <UploadDaily />
          </Protected>,
        },
        {
          path: "upload-tablet",
          element: <Protected permissions={['ADMIN', 'MONITOR']} >
            <UploadTablet />
          </Protected>,
        },
        {
          path: "upload-cancellation",
          element: <Protected permissions={['ADMIN', 'MONITOR']} >
            <UploadCancellation />
          </Protected>,
        },
        {
          path: "upload-digital-signature",
          element: <Protected permissions={['ADMIN', 'MONITOR']} >
            <UploadDigitalSignature />
          </Protected>,
        },

        // Load
        {
          path: "load-policy",
          element: <Protected permissions={['ADMIN', 'MONITOR', 'BASE']} >
            <LoadPolicy />
          </Protected>,
        },
        {
          path: "load-incidence-policy",
          element: <Protected permissions={['ADMIN', 'MONITOR', 'BASE']} >
            <LoadIncidencePolicy />
          </Protected>,
        },
        {
          path: "upload-tablet",
          element: <Protected permissions={['ADMIN', 'MONITOR', 'BASE']} >
            <UploadTablet />
          </Protected>,
        },

        // Administration
        {
          path: "company-list",
          element: <Protected permissions={['ADMIN']} >
            <CompanyList />
          </Protected>
          ,
        },
        {
          path: "mediators-list",
          element: <Protected permissions={['ADMIN']} >
            <MediadorList />
          </Protected>

        },
        {
          path: "familydoc-list",
          element: <Protected permissions={['ADMIN']} >
            <FamilyDocumentList />
          </Protected>
        },
        {
          path: "typeconciliation-list",
          element: <Protected permissions={['ADMIN']} >
            <TypeConciliationList />
          </Protected>,
        },

        {
          path: "user-list",
          element: <Protected permissions={['ADMIN']} >
            <UserList />
          </Protected>,
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
