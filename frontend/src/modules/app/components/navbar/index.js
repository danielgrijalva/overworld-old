import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import GameSearch from "../search/";
import LogIn from "../login/";
import { logout } from "../../actions";
import { useSelector, useDispatch, useStore } from "react-redux";
import "./styles.css";

const Navbar = ({ history }) => {
  const [activeItem, setActiveItem] = useState("");
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleItemClick = (_e, { name }) => {
    setActiveItem(name);
    history.push(`/${name}`);
  };

  const handleResultSelect = result =>
    history.push(`/games/${result.slug}`, result.slug);

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
        onClick={handleItemClick}
      />
      <Menu.Menu position={"right"}>
        <Menu.Item
          name="games"
          active={activeItem === "games"}
          color={"violet"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="lists"
          active={activeItem === "lists"}
          color={"green"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="people"
          active={activeItem === "people"}
          color={"pink"}
          onClick={handleItemClick}
        />
        {isAuthenticated ? (
          <Dropdown text={`${user.username}`} pointing className="link item">
            <Dropdown.Menu>
              <Dropdown.Item as="a" href={`/user/${user.username}`}>
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
              <Dropdown.Item onClick={() => dispatch(logout())}>
                <Icon name="log out" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <LogIn loginText={"Sign In"} />
        )}
        <Menu.Item fitted={"vertically"}>
          <GameSearch onResultSelect={handleResultSelect} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default withRouter(Navbar);
