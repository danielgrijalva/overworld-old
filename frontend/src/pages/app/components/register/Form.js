import React from "react";
import { Button, Form } from "semantic-ui-react";

export const RegistrationForm = ({
  handleChange,
  handleSubmit,
  validateForm
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Email address</label>
      <input type="email" name="email" onChange={handleChange} />
    </Form.Field>
    <Form.Field>
      <label>Username</label>
      <input name="username" onChange={handleChange} />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type="password" name="password" onChange={handleChange} />
    </Form.Field>
    <Form.Field>
      <label>Confirm password</label>
      <input type="password" name="confirmPassword" onChange={handleChange} />
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
