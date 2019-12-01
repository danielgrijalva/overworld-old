import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Header, Menu } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, dismissErrors } from "../../actions";
import Error from "../errors/";
import { LoginForm } from "./Form";
import "./styles.css";

const LogIn = ({
  login,
  loginText,
  errors,
  dismissErrors,
  isAuthenticated,
  user
}) => {
  const defaultState = {
    username: "",
    password: "",
    open: false
  };
  const [{ username, password, open }, setState] = useState(defaultState);

  const handleChange = event => {
    setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    login(username, password);
  };

  const handleOpen = () =>
    setState(prevState => ({ ...prevState, open: true }));

  const handleClose = () => {
    setState(defaultState);
    dismissErrors();
  };

  const validateForm = () => username.length > 0 && password.length > 0;

  if (isAuthenticated) {
    return <Redirect to={`/${user.username}`} />;
  }

  return (
    <Modal
      size="mini"
      open={open}
      onClose={handleClose}
      trigger={<Menu.Item content={loginText} onClick={handleOpen} link />}
      closeIcon
      className="register"
    >
      <Modal.Content>
        <Modal.Description>
          <Header>Welcome back</Header>
        </Modal.Description>
        <LoginForm
          validateForm={validateForm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        {errors &&
          errors.map((e, i) => {
            return <Error message={e} size="small" compact key={i} />;
          })}
      </Modal.Content>
    </Modal>
  );
};

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

export default connect(mapStateToProps, { login, dismissErrors })(LogIn);
