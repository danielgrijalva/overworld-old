import React, { useState } from "react";
import { Modal, Header, Menu } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { login, dismissErrors } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
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
  const { user, errors, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  const handleOpen = () =>
    setState(prevState => ({ ...prevState, open: true }));

  const handleClose = () => {
    setState(defaultState);

    if (errors) {
      dispatch(dismissErrors);
    }
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
