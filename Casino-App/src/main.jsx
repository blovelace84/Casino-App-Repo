import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CasinoProvider } from "./Context/CasinoContext"; // Correct path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CasinoProvider>
      <App />
    </CasinoProvider>
  </React.StrictMode>
);
