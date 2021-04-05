import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function UserFeed() {
  const user = useContext(AuthContext);
  return <div className="text-2xl font-bold">Hey {user.name}</div>;
}
