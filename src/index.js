import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { FoodProvider } from "./context/FoodContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <FoodProvider>
        <App />
      </FoodProvider>
    </Router>
  </React.StrictMode>
);