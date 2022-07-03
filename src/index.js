import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { HashRouter } from "react-router-dom";
import Routing from "./Component/Routing/Routing";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routing />
    <Toaster />
  </HashRouter>
);
