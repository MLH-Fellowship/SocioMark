import { useRoutes, useRedirect, navigate } from "hookrouter";
import React from "react";
import Home from "../Components/Common/Home";
import PublicNavbar from "../Components/Navbars/PublicNavbar";
import Login from "../Components/Account/Login";
import Register from "../Components/Account/Register";

const routes = {
  "/home": () => <Home />,
  "/login": () => <Login />,
  "/register": () => <Register />,
};

const PublicRouter = () => {
  useRedirect("/", "/home");
  const pages = useRoutes(routes);
  !pages && navigate("/");
  return (
    <div className="relative bg-gray-200 min-h-screen pb-24">
      <PublicNavbar />
      {pages}
      {!pages && (
        <div className="flex justify-center py-16">
          Error 404: Page not found
        </div>
      )}
    </div>
  );
};
export default PublicRouter;
