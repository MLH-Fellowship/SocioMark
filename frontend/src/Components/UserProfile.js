import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function UserProfile({ id }) {
  const { user, token } = useContext(AuthContext);
  console.log(user[0].user_id);
  console.log(id === user[0].user_id);
  return (
    <div>
      {id === user[0].user_id ? (
        <div className="text-2xl font-bold">
          Hey {user[0].name} {token[0]}
        </div>
      ) : (
        <div>no user</div>
      )}
    </div>
  );
}
