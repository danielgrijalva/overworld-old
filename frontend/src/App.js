import React, { Component } from "react";
import { Menu, Segment, Container, Icon, Dropdown } from "semantic-ui-react";
import "./App.css";
import GameSearch from "./Search";

export default class App extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted attached={true}>
        <Container>
          <Menu inverted secondary>
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position={"right"}>
              <Menu.Item
                name="Games"
                active={activeItem === "Games"}
                color={"violet"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Lists"
                active={activeItem === "Lists"}
                color={"green"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="People"
                active={activeItem === "People"}
                color={"pink"}
                onClick={this.handleItemClick}
              />
              <Dropdown text="Daniel" pointing className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item><Icon name="user circle"></Icon>Profile</Dropdown.Item>
                  <Dropdown.Item><Icon name="gamepad"></Icon>Games</Dropdown.Item>
                  <Dropdown.Item><Icon name="list alternate"></Icon>Lists</Dropdown.Item>
                  <Dropdown.Item><Icon name="book"></Icon>Reviews</Dropdown.Item>
                  <Dropdown.Item><Icon name="folder"></Icon>Backlog</Dropdown.Item>
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
