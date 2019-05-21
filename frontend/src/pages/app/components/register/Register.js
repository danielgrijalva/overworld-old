import React from "react";
import { Modal, Button, Header } from "semantic-ui-react";
import axios from "axios";
import Error from "../errors/Error.js";
import { RegistrationForm } from "./Form";
import "./Register.css";

export class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      open: false,
      errors: []
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, username, password } = this.state;

    axios
      .post("/api/users/register/", {
        email: email,
        username: username,
        password: password,
      })
      .then(response => {
        console.log(response.data)
        if (this.state.errors) {
          this.setState({ errors: [], open: false });
        }
      })
      .catch(error => {
        this.setState({
          errors: Object.values(error.response.data)
        });
      });
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () =>
    this.setState({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      open: false,
      errors: []
    });

  validateForm = () => {
    return (
      this.state.email.length > 0 &&
      this.state.username.length > 0 &&
      this.state.password.length > 8 &&
      this.state.password === this.state.confirmPassword
    );
  };

  render() {
    const { errors, open } = this.state;
    return (
      <Modal
        size="mini"
        open={open}
        onClose={this.handleClose}
        trigger={
          <Button
            onClick={this.handleOpen}
            color="green"
            style={{ margin: "0 1rem" }}
          >
            Get Started
          </Button>
        }
        className="register"
        closeIcon
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Join</Header>
          </Modal.Description>
          <RegistrationForm
            validateForm={this.validateForm}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          {errors &&
            errors.map((e, i) => {
              return <Error message={e} size="small" compact key={i} />;
            })}
        </Modal.Content>
      </Modal>
    );
  }
}
