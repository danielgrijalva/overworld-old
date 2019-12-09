import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";

export const LoginForm = ({
  handleChange,
  handleSubmit,
  validateForm,
  username,
  password
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Username</label>
      <input name="username" value={username} onChange={handleChange} />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleChange}
      />
    </Form.Field>
    <Button
      floated="right"
      positive
      fluid
      type="submit"
      disabled={!validateForm()}
    >
      Sign In
    </Button>
  </Form>
);

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired
};
