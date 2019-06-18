import React from "react";
import PropTypes from "prop-types";
import { Modal, Header, Menu } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, dismissErrors } from "../../actions";
import Error from "../errors/";
import { LoginForm } from "./Form";
import "./styles.css";

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

  handleClose = () => {
    this.setState({
      username: "",
      password: "",
      open: false
    });

    if (this.props.errors) {
      this.props.dismissErrors();
    }
  };

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
        trigger={
          <Menu.Item
            content={this.props.loginText}
            onClick={this.handleOpen}
            link
          />
        }
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

LogIn.propTypes = {
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array,
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  dismissErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.auth.errors,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login, dismissErrors }
)(LogIn);
