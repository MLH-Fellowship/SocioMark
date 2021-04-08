import { useRoutes, useRedirect, navigate } from "hookrouter";
import React from "react";
import UserNavbar from "../Components/Navbars/UserNavbar";
import UserFeed from "../Components/UserFeed";
import UserProfile from "../Components/UserProfile";

const routes = {
  "/home": () => <UserFeed />,
  "/user/:id": ({ id }) => <UserProfile id={id} />,
};

const PrivateRouter = () => {
  useRedirect("/", "/home");
  const pages = useRoutes(routes);
  !pages && navigate("/");
  return (
    <div className="relative bg-gray-200 min-h-screen">
      <UserNavbar />
      {pages}
      {!pages && (
        <div className="flex justify-center py-16">
          Error 404: Page not found
        </div>
      )}
    </div>
  );
};
export default PrivateRouter;
