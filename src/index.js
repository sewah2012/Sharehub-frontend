import React from "react";
import ReactDOM from "react-dom";

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "./states/AppContext";

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <>
  <AppProvider>
    <App tab="home" />
  </AppProvider>
  </>
);
