import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { CURRENT_USER_URL } from "../constants";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState("");
  const access = localStorage.getItem("access_token");
  useEffect(() => {
    if (access) {
      axios
        .get(CURRENT_USER_URL, {
          headers: {
            Authorization: "Bearer " + access,
          },
        })
        .then((res) => {
          if (res && res.status === 200) {
            setUser(res.data.data);
          }
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};
