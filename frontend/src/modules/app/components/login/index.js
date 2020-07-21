import React, { useState } from "react";
import { Modal, Header, Menu } from "semantic-ui-react";
import { dismissErrors } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "./Form";
import "./styles.scss";

const LogIn = ({ loginText }) => {
  const defaultState = {
    open: false
  };
  const [{ open }, setState] = useState(defaultState);
  const { errors} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleOpen = () =>
    setState(prevState => ({ ...prevState, open: true }));

  const handleClose = () => {
    setState(defaultState);

    if (errors) {
      dispatch(dismissErrors);
    }
  };

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
        <LoginForm handleClose={handleClose}/>
      </Modal.Content>
    </Modal>
  );
};

export default LogIn;
