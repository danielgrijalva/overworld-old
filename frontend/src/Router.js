import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Game from "./pages/game/Game";
import Navbar from "./pages/app/components/navbar/Navbar";
import Landing from "./pages/landing/Landing";
import { Provider } from "react-redux";
import store from "./store";

function NotFound() {
  return <p>Not Found</p>;
}

function AppRouter() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/games/:slug" component={Game} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default AppRouter;
