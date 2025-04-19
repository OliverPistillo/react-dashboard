import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom"; // ✅ Modificato da BrowserRouter

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter> {/* ✅ Sostituito BrowserRouter con HashRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>
);