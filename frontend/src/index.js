import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <MenuProvider>
      <App />
    </MenuProvider>
  </AuthProvider>
);