import React from "react";
import { Menu } from "semantic-ui-react";
import Buttons from './Buttons';
import Rating from './Rating'

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
      <Menu icon="labeled" className="actions" vertical fluid>
        <Menu.Item>
          <Buttons />
        </Menu.Item>
        <Menu.Item>
          <span class="rating">Rate</span>
          <Rating />
        </Menu.Item>
        <Menu.Item content="Review or log" link />
        <Menu.Item content="Add to a list" link />
        <Menu.Item content="Share..." link />

      </Menu>
    );
  }
}

export default Actions;
