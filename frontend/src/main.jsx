import './index.css'
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";
import PredictionProvider from "./context/PredictionProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PredictionProvider>
      <App />
    </PredictionProvider>
  </React.StrictMode>
);

