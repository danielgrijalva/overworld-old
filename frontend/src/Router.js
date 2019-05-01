import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from './App';
import Game from './Game';
import Navbar from './Navbar';
import Actions from './actions/Actions'

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
                    <Route path="/lists/" component={Actions} />
                    <Route component={NotFound} />
                </Switch >
            </BrowserRouter>
        </React.Fragment>
    );
}

export default AppRouter;