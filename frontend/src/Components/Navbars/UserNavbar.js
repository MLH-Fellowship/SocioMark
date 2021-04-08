import React, { useContext } from "react";
import Navbar from "./Navbar";
import { AuthContext } from "../../Context/AuthContext";

export default function UserNavbar() {
  const { user } = useContext(AuthContext);
  const id = user[0].user_id;
  const links = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: `/user/${id}`,
      title: "Profile",
    },
  ];
  return <Navbar links={links} logout={true} />;
}
