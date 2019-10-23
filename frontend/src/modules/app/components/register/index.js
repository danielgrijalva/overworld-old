import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Header } from "semantic-ui-react";
import Error from "../errors/";
import { connect } from "react-redux";
import { register, dismissErrors } from "../../actions";
import { RegistrationForm } from "./Form";
import "./styles.css";

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

  handleClose = () => {
    this.setState({
      email: "",
      username: "",
      password1: "",
      password2: "",
      open: false
    });

    if (this.props.errors) {
      this.props.dismissErrors();
    }
  };

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

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.array,
  register: PropTypes.func.isRequired,
  dismissErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.auth.errors,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, dismissErrors }
)(Register);
