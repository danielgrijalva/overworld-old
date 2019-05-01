import React from "react";
import { Menu } from "semantic-ui-react";
import Buttons from "./Buttons";
import Ratings from "./Rating";

class Actions extends React.Component {
  constructor(props) {
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
      <Menu floated="right" icon="labeled" className="actions margin-top" vertical fluid>
        <Menu.Item>
          <Buttons />
        </Menu.Item>
        <Menu.Item>
          Rate
          <Ratings />
        </Menu.Item>
        <Menu.Item content="Review or log" link />
        <Menu.Item content="Add to a list" link />
        <Menu.Item content="Share..." link />
      </Menu>
    );
  }
}

export default Actions;
