import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "./App.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));

render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById("root")
);
