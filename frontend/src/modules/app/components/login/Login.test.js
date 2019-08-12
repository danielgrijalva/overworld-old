import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { Redirect } from "react-router-dom";
import { Modal, Header, Menu } from "semantic-ui-react";
import Error from "../errors/";
import { LoginForm } from "./Form";
import { LogIn } from '../login';

describe('Test <LogIn /> rendering', () => {

  let wrap, props;

  beforeEach(()=>{
    props =
      {
        login: jest.fn().mockName('loginMock'),
        dismissErrors: jest.fn().mockName('dismissErrorsMock'),
        isAuthenticated: false
      };

    wrap = shallow(<LogIn {...props}/>);
  });

  afterEach(()=>{
    props.login.mockRestore();
    props.dismissErrors.mockRestore();
  });

  it('renders without crashing', () => {
    expect(wrap.length).toEqual(1);
  });

  it('redirects when isAuthenticated is true', () => {
    props.isAuthenticated = true;
    props.user = {username: 'testuser'};
    wrap = shallow(<LogIn {...props}/>);

    expect(wrap.getElements().length).toEqual(1);
    expect(wrap.type()).toEqual(Redirect);
    expect(wrap.props().to).toEqual('/testuser');
  });

  it('renders Modal', () => {
    const instance = wrap.instance();
    expect(wrap.type()).toEqual(Modal);
    expect(wrap.props().size).toEqual('mini');
    expect(wrap.props().open).toEqual(false);
    expect(wrap.hasClass('register')).toEqual(true);
    expect(wrap.props().onClose).toEqual(instance.handleClose);
  });

  it('renders Modal description and login form', () => {
    const instance = wrap.instance();
    const modalContent = wrap.find(Modal.Content);
    const modalDescription = modalContent.childAt(0);
    const loginForm = modalContent.childAt(1);

    expect(modalDescription.type()).toEqual(Modal.Description);
    expect(loginForm.type()).toEqual(LoginForm);
    // Test correct functions passed in LoginForm props
    expect(loginForm.props().validateForm).toEqual(instance.validateForm);
    expect(loginForm.props().handleChange).toEqual(instance.handleChange);
    expect(loginForm.props().handleSubmit).toEqual(instance.handleSubmit);
  });

  it('renders errors if errors exist', () => {
    props.errors = ['test', 'some', 'errors'];
    wrap = shallow(<LogIn {...props}/>);

    const errors = wrap.find(Error);

    errors.forEach((node, i) => {
      expect(node.type()).toEqual(Error);
      expect(node.props().message).toEqual(props.errors[i]);
      expect(node.props().size).toEqual('small');
      expect(node.props().compact).toEqual(true);
    });
  });
});

describe('Test <LogIn /> functions', () => {

  let wrap, props;

  beforeEach(()=>{
    props =
      {
        login: jest.fn().mockName('loginMock'),
        dismissErrors: jest.fn().mockName('dismissErrorsMock')
      };

    wrap = shallow(<LogIn {...props}/>);
  });

  afterEach(()=>{
    props.login.mockRestore();
    props.dismissErrors.mockRestore();
  });

  describe('Test handleChange()', () => {

    it('updates username state correctly when handleChange is called', () => {
      const instance = wrap.instance();
      const e = { target: { name: 'username', value: 'test'} };

      instance.handleChange(e);
      const state = wrap.state();

      expect(state.username).toEqual('test');
      expect(state.password).toEqual('');
      expect(state.open).toEqual(false);
    });

    it('updates password state correctly when handleChange is called', () => {
      const instance = wrap.instance();
      const e = { target: { name: 'password', value: 'test'} };

      instance.handleChange(e);
      const state = wrap.state();

      expect(state.username).toEqual('');
      expect(state.password).toEqual('test');
      expect(state.open).toEqual(false);
    });
  });

  describe('Test handleSubmit()', () => {

    it('calls preventDefault when handleSubmit is called', () => {
      wrap.setState( {username: 'testuser', password: 'testpass'} );
      const instance = wrap.instance();
      const e = { preventDefault: jest.fn().mockName('preventDefaultMock') };

      instance.handleSubmit(e);

      expect(e.preventDefault.mock.calls.length).toEqual(1);
    });

    it('calls login with current state when handleSubmit is called', () => {
      wrap.setState( {username: 'testuser', password: 'testpass'} );
      const instance = wrap.instance();
      const e = { preventDefault: jest.fn().mockName('preventDefaultMock') };

      instance.handleSubmit(e);

      expect(props.login.getMockName()).toEqual('loginMock');
      expect(props.login.mock.calls.length).toEqual(1);
      expect(props.login.mock.calls[0][0]).toEqual('testuser');
      expect(props.login.mock.calls[0][1]).toEqual('testpass');
    });
  });

  describe('Test handleOpen() and handleClose()', () => {

    it('updates open state when handleOpen is called', () => {
      const instance = wrap.instance();

      instance.handleOpen();

      expect(wrap.state().open).toEqual(true);
    });

    it('resets state to initial values when handleClose is called', () => {
      wrap.setState( {username: 'testuser', password: 'testpass', open: true} );
      const instance = wrap.instance();

      instance.handleClose()
      const state = wrap.state()

      expect(state.username).toEqual('');
      expect(state.password).toEqual('');
      expect(state.open).toEqual(false);
      // Test that dismissErrors does not get called because no errors exist
      expect(props.dismissErrors.mock.calls.length).toEqual(0);
    });

    it('calls dismissErrors when handleClose is called and errors exist', () => {
      // Add errors to props to test dismissErrors gets called
      props.errors = ['test'];
      wrap = shallow(<LogIn {...props}/>);
      const instance = wrap.instance();

      instance.handleClose();

      expect(props.dismissErrors.mock.calls.length).toEqual(1);
    });
  });

  describe('Test validateForm()', () => {

    it('is not validated with no username and no password', () => {
      wrap.setState( {username: '', password: '', open: true} );
      const instance = wrap.instance();

      expect(instance.validateForm()).toEqual(false);
    });

    it('is not validated with username and no password', () => {
      wrap.setState( {username: 'a', password: '', open: true} );
      const instance = wrap.instance();

      expect(instance.validateForm()).toEqual(false);
    });

    it('is not validated with no username and a password', () => {
      wrap.setState( {username: '', password: 'a', open: true} );
      const instance = wrap.instance();

      expect(instance.validateForm()).toEqual(false);
    });

    it('is validated with username and password', () => {
      wrap.setState( {username: 'a', password: 'a', open: true} );
      const instance = wrap.instance();

      expect(instance.validateForm()).toEqual(true);
    });
  });
});
