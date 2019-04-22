import React from "react";
import { BrowserRouter as BrowserRouter, Switch, Route } from "react-router-dom";
import App from './App';
import Game from './Game';
import Navbar from './Navbar';

function NotFound() {
    return <p>Not Found</p>;
}

function AppRouter() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/games/:slug" component={Game} />
                    <Route component={NotFound} />
                </Switch >
            </BrowserRouter>
        </React.Fragment>
    );
}

export default AppRouter;