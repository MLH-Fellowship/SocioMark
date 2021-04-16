import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
