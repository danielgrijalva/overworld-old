import React from "react";
import { Menu } from "semantic-ui-react";
import Buttons from "./Buttons";
import Ratings from "./Rating";
import LogIn from "../../../app/components/login/LoginModal";
import "./Actions.css";

class Actions extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalActive: false
    };
  }

  closeModal = () => {
    this.setState({ isModalActive: false });
  };

  render() {
    return (
      <Menu floated="right" icon="labeled" className="actions" vertical fluid>
        {this.props.isAuthenticated ? (
          <React.Fragment>
            <Menu.Item>
              <Buttons game={this.props.game} />
            </Menu.Item>
            <Menu.Item className="rate">
              Rate
              <Ratings />
            </Menu.Item>
            <Menu.Item content="Review or log" link />
            <Menu.Item content="Add to a list" link />
          </React.Fragment>
        ) : (
          <LogIn loginText="Sign in to log, rate or review..." />
        )}
        <Menu.Item content="Share..." link />
      </Menu>
    );
  }
}

export default Actions;

// on Actions mount:
// backend:
// check if relation user-game exists in LOGS (or LIKES, etc.) table
// return boolean for each action
// { logged: true, liked: false, wishlist: false, backlog: false }
// frontned
// store data in redux, keep following same approach
