import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import AppRouter from "./Router";
import * as serviceWorker from "./serviceWorker";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(<AppRouter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
