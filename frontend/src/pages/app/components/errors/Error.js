import React from "react";
import { Message } from "semantic-ui-react";

export default class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ visible: true });
  }

  handleDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    const { message } = this.props;

    if (this.state.visible) {
      return (
        <Message error onDismiss={this.handleDismiss} {...this.props}>
          {message}
        </Message>
      );
    }

    return null;
  }
}
