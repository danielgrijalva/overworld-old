import React from "react";
import { Menu } from "semantic-ui-react";
import './ProfileNav.css'

export default class ProfileNav extends React.Component {
  state = {
    activeItem: "profile"
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu borderless compact className="profile-menu">
        <Menu.Item
          name="profile"
          active={activeItem === "profile"}
          onClick={this.handleItemClick}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          name="games"
          active={activeItem === "games"}
          onClick={this.handleItemClick}
        >
          Games
        </Menu.Item>
        <Menu.Item
          name="likes"
          active={activeItem === "likes"}
          onClick={this.handleItemClick}
        >
          Likes
        </Menu.Item>
        <Menu.Item
          name="reviews"
          active={activeItem === "reviews"}
          onClick={this.handleItemClick}
        >
          Reviews
        </Menu.Item>
        <Menu.Item
          name="backlog"
          active={activeItem === "backlog"}
          onClick={this.handleItemClick}
        >
          Backlog
        </Menu.Item>
        <Menu.Item
          name="wishlist"
          active={activeItem === "wishlist"}
          onClick={this.handleItemClick}
        >
          Wish List
        </Menu.Item>
        <Menu.Item
          name="lists"
          active={activeItem === "lists"}
          onClick={this.handleItemClick}
        >
          Lists
        </Menu.Item>
        <Menu.Item
          name="journal"
          active={activeItem === "journal"}
          onClick={this.handleItemClick}
        >
          Journal
        </Menu.Item>
      </Menu>
    );
  }
}
