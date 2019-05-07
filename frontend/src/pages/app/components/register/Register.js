import React from "react";
import { Modal, Button, Form, Header, Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";
import "./Register.css";

export class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log('new user')
  };

  validateForm = () => {
    return (
      this.state.email.length > 0 &&
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  };

  render() {
    return (
      <Modal
        size="tiny"
        trigger={
          <Button color="green" style={{ margin: "0 1rem" }}>
            Get Started
          </Button>
        }
        className="register"
        closeIcon
        open={true}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Join</Header>
          </Modal.Description>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Email address</label>
              <input type="email" name="email" onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <input name="username" onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button
              floated="right"
              positive
              type="submit"
              disabled={!this.validateForm()}
            >
              Sign Up
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
