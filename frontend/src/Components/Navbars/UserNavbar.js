import React from "react";
import Navbar from "./Navbar";

export default function UserNavbar() {
  const links = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/profile",
      title: "Profile",
    },
  ];
  return <Navbar links={links} logout={true} />;
}
