import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState("");
  const access = localStorage.getItem("access_token");
  useEffect(() => {
    if (access) {
      axios
        .get("http://localhost:8000/user/current_user", {
          //Change to "https://sociomark-backend.herokuapp.com/user/current_user/"" once the backend is deployed
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
    <AuthContext.Provider value={{ value1: [user], value2: [access] }}>{props.children}</AuthContext.Provider>
  );
};
