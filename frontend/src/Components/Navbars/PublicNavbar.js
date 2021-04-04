import React from "react";
import Navbar from "./Navbar";

export default function PublicNavbar() {
  const links = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/register",
      title: "Register",
    },
    {
      link: "/login",
      title: "Login",
    },
  ];
  return <Navbar links={links} />;
}
