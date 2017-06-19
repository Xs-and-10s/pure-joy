import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { install as offlineInstall } from "offline-plugin/runtime";
import "./index.css";

// ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();
// if (process.env.NODE_ENV === 'production') {
//   offlineInstall();
// }
