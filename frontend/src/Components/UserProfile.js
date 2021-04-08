import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function UserFeed() {
  const { user, token } = useContext(AuthContext);
  return (
    <div>
      <div className="text-2xl font-bold">
        Hey {user[0].name} {token[0]}
      </div>
    </div>
  );
}
