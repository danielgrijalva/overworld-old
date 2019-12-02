import React, { useState, useContext } from "react";
import { Modal, Header, Menu } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { login, dismissErrors } from "../../actions";
import { ReactReduxContext } from "react-redux";
import Error from "../errors/";
import { LoginForm } from "./Form";
import "./styles.css";

const LogIn = ({ loginText }) => {
  const defaultState = {
    username: "",
    password: "",
    open: false
  };
  const [{ username, password, open }, setState] = useState(defaultState);
  const { getState, dispatch } = useContext(ReactReduxContext).store;
  const { user, errors, isAuthenticated } = getState().auth;

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    login(username, password)(dispatch);
  };

  const handleOpen = () =>
    setState(prevState => ({ ...prevState, open: true }));

  const handleClose = () => {
    setState(defaultState);
    dismissErrors()(dispatch);
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
          username={username}
          password={password}
        />
        {errors &&
          errors.map((e, i) => {
            return <Error message={e} size="small" compact key={i} />;
          })}
      </Modal.Content>
    </Modal>
  );
};

export default LogIn;
