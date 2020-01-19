import React, { useState } from "react";
import Error from "../errors/";
import { Button, Form } from "semantic-ui-react";
import { register } from "../../actions";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const RegistrationForm = () => {
  const defaultState = {
    email: "",
    username: "",
    password: "",
    password2: ""
  };

  const [{ email, username, password, password2 }, setState] = useState(
    defaultState
  );

  const dispatch = useDispatch();
  const { errors, isAuthenticated, user } = useSelector(state => state.auth);

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      email,
      username,
      password
    };

    register(newUser)(dispatch);
  };

  const validateForm = () => {
    return (
      email.length > 0 &&
      username.length > 0 &&
      password.length >= 8 &&
      password === password2
    );
  };

  if (isAuthenticated) {
    return <Redirect to={`/user/${user.username}`} />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
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
      {errors &&
        errors.map((e, i) => {
          return <Error message={e} size="small" compact key={i} />;
        })}
    </>
  );
};
