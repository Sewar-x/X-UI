import * as React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import lazyLoad from "../hooks/lazyLoad";
import { RouteObject } from "../types";
const router: RouteObject[] = [
  {
    path: "/button-demo",
    element: lazyLoad(React.lazy(() => import("./button/button-demo"))),
  },
  {
    path: "*",
    element: <Navigate to="/button-demo" />,
  },
];

const Router = () => {
  const routes = useRoutes(router);
  return routes;
};

export default Router;
