import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

export default function Error({ message, ...props }) {
  return (
    <Message error {...props}>
      {message}
    </Message>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired
};
