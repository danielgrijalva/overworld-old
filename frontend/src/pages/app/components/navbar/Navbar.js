import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import GameSearch from "../search/Search";
import LogIn from "../login/LoginModal";
import { logout } from "../../../../actions/auth";
import "./Navbar.css";

class Navbar extends Component {
  state = { activeItem: "" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push(`/${name}`);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu className="navbar" inverted secondary>
        <div className="menu-bg" />
        <Menu.Item
          content={
            <React.Fragment>
              <img alt="logo" src="/earth.svg" />
              <h1>Overworld</h1>
            </React.Fragment>
          }
          name=""
          className="brand"
          onClick={this.handleItemClick}
        />
        <Menu.Menu position={"right"}>
          <Menu.Item
            name="games"
            active={activeItem === "games"}
            color={"violet"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="lists"
            active={activeItem === "lists"}
            color={"green"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="people"
            active={activeItem === "people"}
            color={"pink"}
            onClick={this.handleItemClick}
          />
          {this.props.isAuthenticated ? (
            <Dropdown
              text={`${this.props.user.username}`}
              pointing
              className="link item"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  as="a"
                  href={`/user/${this.props.user.username}`}
                >
                  <Icon name="user circle" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="gamepad" />
                  Games
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="list alternate" />
                  Lists
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="book" />
                  Reviews
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="clock" />
                  Backlog
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="shopping bag" />
                  Wishlist
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="a" href="/settings">
                  <Icon name="cog" />
                  Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={this.props.logout}>
                  <Icon name="log out" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <LogIn loginText={"Sign In"} />
          )}
          <Menu.Item fitted={"vertically"}>
            <GameSearch />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  logout: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Navbar));
