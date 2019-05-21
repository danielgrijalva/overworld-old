import React from "react";
import axios from "axios";
import { Modal, Header } from "semantic-ui-react";
import Error from "../errors/Error.js";
import { LoginForm } from "./Form";
import "./LoginModal.css";

export class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    const { username, password } = this.state;

    axios
      .post("/api/users/login/", {
        username: username,
        password: password
      })
      .then(response => {
        console.log(response.data);
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
      username: "",
      password: "",
      open: false,
      errors: []
    });

  validateForm = () => {
    return this.state.username.length > 0 && this.state.password.length > 8;
  };

  render() {
    const { errors, open } = this.state;
    return (
      <Modal
        size="mini"
        open={open}
        onClose={this.handleClose}
        trigger={
          <a class="sign-in" onClick={this.handleOpen}>
            sign in
          </a>
        }
        closeIcon
        className="register"
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Log In</Header>
          </Modal.Description>
          <LoginForm
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
