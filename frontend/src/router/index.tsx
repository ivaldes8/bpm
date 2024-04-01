import { useRoutes } from "react-router-dom";
import DashboardOverview1 from "../pages/DashboardOverview1";
import UsersLayout1 from "../pages/UsersLayout1";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import UpdateProfile from "../pages/UpdateProfile";
import ChangePassword from "../pages/ChangePassword";
import UserList from "../pages/Administration/Users/UserList"

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
      path: "/register",
      element: <Register />,
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
