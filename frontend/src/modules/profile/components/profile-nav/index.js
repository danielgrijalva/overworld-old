import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import "./styles.css";

const ProfileNav = () => {
  const initialState = {
    activeItem: "profile"
  };
  const [state, setState] = useState(initialState);
  const handleItemClick = (e, { name }) =>
    setState(prevState => ({ ...prevState, activeItem: name }));
  const { activeItem } = state;

  return (
    <Menu borderless compact className="profile-menu">
      <Menu.Item
        name="profile"
        active={activeItem === "profile"}
        onClick={handleItemClick}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        name="games"
        active={activeItem === "games"}
        onClick={handleItemClick}
      >
        Games
      </Menu.Item>
      <Menu.Item
        name="likes"
        active={activeItem === "likes"}
        onClick={handleItemClick}
      >
        Likes
      </Menu.Item>
      <Menu.Item
        name="reviews"
        active={activeItem === "reviews"}
        onClick={handleItemClick}
      >
        Reviews
      </Menu.Item>
      <Menu.Item
        name="backlog"
        active={activeItem === "backlog"}
        onClick={handleItemClick}
      >
        Backlog
      </Menu.Item>
      <Menu.Item
        name="wishlist"
        active={activeItem === "wishlist"}
        onClick={handleItemClick}
      >
        Wish List
      </Menu.Item>
      <Menu.Item
        name="lists"
        active={activeItem === "lists"}
        onClick={handleItemClick}
      >
        Lists
      </Menu.Item>
      <Menu.Item
        name="journal"
        active={activeItem === "journal"}
        onClick={handleItemClick}
      >
        Journal
      </Menu.Item>
    </Menu>
  );
};

export default ProfileNav;
