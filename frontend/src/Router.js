import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Game from "./pages/game/Game";
import Navbar from "./pages/app/components/navbar/Navbar";
import App from "./pages/app/App";
import Profile from "./pages/profile/Profile";
import { loadUser } from "./actions/auth";

const notFound = () => {
  return <p>Not Found</p>;
};

class AppRouter extends React.Component {
  componentWillMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/games/:slug" component={Game} />
            <Route path="/user/:username" component={Profile} />
            <Route component={notFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default AppRouter;
