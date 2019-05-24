import React from "react";
import { Modal, Header, Menu } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../../actions/auth";
import Error from "../errors/Error.js";
import { LoginForm } from "./Form";
import "./LoginModal.css";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    const { username, password } = this.state;

    this.props.login(username, password);
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () =>
    this.setState({
      username: "",
      password: "",
      open: false
    });

  validateForm = () => {
    return this.state.username.length > 0 && this.state.password.length > 0;
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={`/${this.props.user.username}`} />;
    }
    const { open } = this.state;
    const { errors } = this.props;
    return (
      <Modal
        size="mini"
        open={open}
        onClose={this.handleClose}
        trigger={<Menu.Item name="Sign in" onClick={this.handleOpen} />}
        closeIcon
        className="register"
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Welcome back</Header>
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

const mapStateToProps = state => ({
  errors: state.auth.errors,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(LogIn);
