import React, { Component } from "react";
import { Menu, Segment, Container, Header } from "semantic-ui-react";
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
                color={"orange"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="People"
                active={activeItem === "People"}
                color={"pink"}
                onClick={this.handleItemClick}
              />
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
