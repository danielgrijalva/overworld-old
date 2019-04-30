import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Menu, Segment, Container, Icon, Dropdown } from "semantic-ui-react";
import "./App.css";
import GameSearch from "./Search";

class Navbar extends Component {
  state = { activeItem: "" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push(`/${name}`)
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted attached={true} className="margin-bottom">
        <Container>
          <Menu inverted secondary>
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
                  <Dropdown.Item><Icon name="user circle"></Icon>Profile</Dropdown.Item>
                  <Dropdown.Item><Icon name="gamepad"></Icon>Games</Dropdown.Item>
                  <Dropdown.Item><Icon name="list alternate"></Icon>Lists</Dropdown.Item>
                  <Dropdown.Item><Icon name="book"></Icon>Reviews</Dropdown.Item>
                  <Dropdown.Item><Icon name="clock"></Icon>Backlog</Dropdown.Item>
                  <Dropdown.Item><Icon name="shopping bag"></Icon>Wishlist</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item><Icon name="cog"></Icon>Settings</Dropdown.Item>
                  <Dropdown.Item><Icon name="log out"></Icon>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item fitted={"vertically"}>
                <GameSearch />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
    );
  }
}

export default withRouter(Navbar);