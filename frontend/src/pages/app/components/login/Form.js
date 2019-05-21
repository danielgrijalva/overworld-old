import React from "react";
import { Button, Form } from "semantic-ui-react";

export const LoginForm = ({
  handleChange,
  handleSubmit,
  validateForm
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Username</label>
      <input name="username" onChange={handleChange} />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type="password" name="password" onChange={handleChange} />
    </Form.Field>
    <Button
      floated="right"
      positive
      fluid
      type="submit"
      disabled={!validateForm()}
    >
      Log In
    </Button>
  </Form>
);
