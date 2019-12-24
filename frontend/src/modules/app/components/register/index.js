import React, { useState } from "react";
import { Modal, Button, Header } from "semantic-ui-react";
import Error from "../errors/";
import { register, dismissErrors } from "../../actions";
import { RegistrationForm } from "./Form";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";

const Register = () => {
  const defaultState = {
    email: "",
    username: "",
    password: "",
    password2: "",
    open: false
  };

  const [{ email, username, password, password2, open }, setState] = useState(
    defaultState
  );

  const dispatch = useDispatch();
  const { errors } = useSelector(state => state.auth);

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      email,
      username,
      password
    };

    register(newUser)(dispatch);
  };

  const handleOpen = () =>
    setState(prevState => ({ ...prevState, open: true }));

  const handleClose = () => {
    setState(defaultState);

    if (errors) {
      dispatch(dismissErrors());
    }
  };

  const validateForm = () => {
    return (
      email.length > 0 &&
      username.length > 0 &&
      password.length >= 8 &&
      password === password2
    );
  };

  return (
    <Modal
      size="mini"
      open={open}
      onClose={handleClose}
      trigger={
        <Button onClick={handleOpen} color="green" style={{ margin: "0 1rem" }}>
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
          validateForm={validateForm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          email={email}
          username={username}
          password={password}
          password2={password2}
        />
        {errors &&
          errors.map((e, i) => {
            return <Error message={e} size="small" compact key={i} />;
          })}
      </Modal.Content>
    </Modal>
  );
};

export default Register;
