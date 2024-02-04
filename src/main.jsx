import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import GlobalProvider from "./providers/GlobalProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalProvider />
  </BrowserRouter>
);
