import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";

export const RegistrationForm = ({
  handleChange,
  handleSubmit,
  validateForm,
  email,
  username,
  password,
  password2
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Email address</label>
      <input type="email" name="email" value={email} onChange={handleChange} />
    </Form.Field>
    <Form.Field>
      <label>Username</label>
      <input name="username" value={username} onChange={handleChange} />
    </Form.Field>
    <Form.Field>
      <label>Password (at least 8 characters)</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
    </Form.Field>
    <Form.Field>
      <label>Confirm password</label>
      <input
        type="password"
        name="password2"
        value={password2}
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
      Sign Up
    </Button>
  </Form>
);

RegistrationForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired
};
