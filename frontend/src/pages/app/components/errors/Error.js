import React from "react";
import { Message } from "semantic-ui-react";

export default class Error extends React.Component {
  render() {
    const { message } = this.props;

    return (
      <Message error {...this.props}>
        {message}
      </Message>
    );
  }
}
