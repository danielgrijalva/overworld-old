import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { LogIn } from "../../../app/components";
import LogModal from "../log-modal";
import Buttons from "./Buttons";
import Ratings from "./Rating";
import "./styles.scss";

class Actions extends React.Component {
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
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
              <Ratings game={this.props.game} />
            </Menu.Item>
            <LogModal game={this.props.game} />
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

Actions.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  game: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Actions);
