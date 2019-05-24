import React from "react";
import { Modal, Button, Header } from "semantic-ui-react";
import Error from "../errors/Error.js";
import { connect } from "react-redux";
import { register } from "../../../../actions/auth";
import { RegistrationForm } from "./Form";
import "./Register.css";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      open: false
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

    const newUser = {
      email,
      username,
      password
    };

    this.props.register(newUser);
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () =>
    this.setState({
      email: "",
      username: "",
      password1: "",
      password2: "",
      open: false,
      errors: []
    });

  validateForm = () => {
    return (
      this.state.email.length > 0 &&
      this.state.username.length > 0 &&
      this.state.password.length >= 8 &&
      this.state.password === this.state.password2
    );
  };

  render() {
    const { open } = this.state;
    const { errors } = this.props;
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
            <Header>Join Overworld</Header>
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

const mapStateToProps = state => ({
  errors: state.auth.errors,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
