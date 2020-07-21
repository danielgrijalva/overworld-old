import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.scss";
import AppRouter from "./Router";
import * as serviceWorker from "./serviceWorker";
import ErrorBoundary from "./modules/app/components/error";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <ErrorBoundary>
    <AppRouter />
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
