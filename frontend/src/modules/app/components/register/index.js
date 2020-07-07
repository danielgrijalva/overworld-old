import React, { useState } from "react";
import { Modal, Button, Header } from "semantic-ui-react";
import { dismissErrors } from "../../actions";
import { RegistrationForm } from "./Form";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";

const Register = () => {
  const defaultState = {
    open: false
  };

  const [{ open }, setState] = useState(
    defaultState
  );

  const dispatch = useDispatch();
  const { errors } = useSelector(state => state.auth);

  const handleOpen = () =>
    setState(prevState => ({ ...prevState, open: true }));

  const handleClose = () => {
    setState(defaultState);

    if (errors) {
      dispatch(dismissErrors());
    }
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
        <RegistrationForm handleClose={handleClose}/>
      </Modal.Content>
    </Modal>
  );
};

export default Register;
