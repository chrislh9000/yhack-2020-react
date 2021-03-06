import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import routes from "./routes";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import Music from "./Music";
import Tog from "./components/Reflection";
import Search from "./components/SearchPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Discussion from "./components/Discussion";

ReactDOM.render(
  <React.StrictMode>
    <div><p1>helloworld</p1></div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
