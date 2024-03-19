import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import GlobalProvider from "./providers/GlobalProvider";
import { BrowserRouter } from "react-router-dom";
import ModalProvider from "./context/LoginModalProvider";
import SearchProvider from "./context/FormSearchProvider";
import DarkModeProvider from "./context/DarkMode";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DarkModeProvider>
      <SearchProvider>
        <ModalProvider>
          <GlobalProvider />
        </ModalProvider>
      </SearchProvider>
    </DarkModeProvider>
  </BrowserRouter>
);
