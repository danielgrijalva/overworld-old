import React from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
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
              <Ratings game={this.props.game.guid} />
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

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Actions);
