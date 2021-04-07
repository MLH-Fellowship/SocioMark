import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../Context/AuthContext";

export default function UserFeed() {
  const { value1, value2 } = useContext(AuthContext);
  const [user] = value1;
  const [access] = value2;
  return (
    <div>
      <div className="text-2xl font-bold">
        Hey {user.name} {access}
      </div>
    </div>
  );
}
