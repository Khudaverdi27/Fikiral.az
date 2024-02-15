import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import GlobalProvider from "./providers/GlobalProvider";
import { BrowserRouter } from "react-router-dom";
import ModalProvider from "./context/LoginModalProvider";
import DataProvider from "./context/FetchDataProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <ModalProvider>
        <GlobalProvider />
      </ModalProvider>
    </DataProvider>
  </BrowserRouter>
);
