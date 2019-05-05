import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import GameSearch from "../search/Search";
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
          content="Home"
          name=""
          active={activeItem === ""}
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
          <Dropdown text="Daniel" pointing className="link item">
            <Dropdown.Menu>
              <Dropdown.Item>
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
              <Dropdown.Item>
                <Icon name="cog" />
                Settings
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="log out" />
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item fitted={"vertically"}>
            <GameSearch />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(Navbar);
