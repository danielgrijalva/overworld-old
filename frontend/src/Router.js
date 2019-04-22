import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';

function AppRouter() {
    return (
        <Router>
            <Route path="/" exact component={App} />
        </Router >
    );
}

export default AppRouter;