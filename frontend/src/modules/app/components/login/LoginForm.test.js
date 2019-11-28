import React from "react";
import Enzyme, { shallow } from "enzyme";
import { LoginForm } from "../login/Form";
import { Button, Form } from "semantic-ui-react";

describe("Test <Form />", () => {
  let wrap, props;

  beforeEach(() => {
    props = {
      handleChange: jest.fn().mockName("handleChangeMock"),
      handleSubmit: jest.fn().mockName("handleSubmitMock"),
      validateForm: jest.fn(() => false).mockName("validateForm")
    };
    wrap = shallow(<LoginForm {...props} />);
  });

  afterEach(() => {
    props.handleChange.mockRestore();
    props.handleSubmit.mockRestore();
    props.validateForm.mockRestore();
  });

  it("renders without crashing", () => {
    expect(wrap.length).toEqual(1);
  });

  it("renders Form", () => {
    expect(wrap.type()).toEqual(Form);
    expect(wrap.props().onSubmit.getMockName()).toEqual("handleSubmitMock");
    expect(wrap.props().as).toEqual("form");
  });

  it("renders Username FormField", () => {
    const formfields = wrap.find("FormField");
    const usernameField = formfields.at(0);
    const usernameLabel = usernameField.childAt(0);
    const usernameInput = usernameField.childAt(1);

    expect(usernameField.type()).toEqual(Form.Field);
    expect(usernameLabel.type()).toEqual("label");
    expect(usernameLabel.childAt(0).text()).toEqual("Username");
    expect(usernameInput.type()).toEqual("input");
    expect(usernameInput.props().name).toEqual("username");
    expect(usernameInput.props().onChange.getMockName()).toEqual(
      "handleChangeMock"
    );
  });

  it("calls handleChange when username field is updated", () => {
    const formfields = wrap.find("FormField");
    const usernameField = formfields.at(0);
    const usernameInput = usernameField.childAt(1);

    usernameInput.simulate("change", {
      target: { name: "username", value: "name" }
    });
    expect(props.handleChange.mock.calls.length).toEqual(1);
  });

  it("renders Password FormField", () => {
    const formfields = wrap.find("FormField");
    const passwordField = formfields.at(1);
    const passwordLabel = passwordField.childAt(0);
    const passwordInput = passwordField.childAt(1);

    expect(passwordField.type()).toEqual(Form.Field);
    expect(passwordLabel.type()).toEqual("label");
    expect(passwordLabel.childAt(0).text()).toEqual("Password");
    expect(passwordInput.type()).toEqual("input");
    expect(passwordInput.props().type).toEqual("password");
    expect(passwordInput.props().name).toEqual("password");
    expect(passwordInput.props().onChange.getMockName()).toEqual(
      "handleChangeMock"
    );
  });

  it("calls handleChange when password field is updated", () => {
    const formfields = wrap.find("FormField");
    const passwordField = formfields.at(1);
    const passwordInput = passwordField.childAt(1);

    passwordInput.simulate("change", {
      target: { name: "password", value: "pass" }
    });
    expect(props.handleChange.mock.calls.length).toEqual(1);
  });
});

describe("Test <Form /> Sign In Button", () => {
  let props;

  afterEach(() => {
    props.handleChange.mockRestore();
    props.handleSubmit.mockRestore();
    props.validateForm.mockRestore();
  });

  it("renders button as disabled if validateForm returns false", () => {
    props = {
      handleChange: jest.fn().mockName("handleChangeMock"),
      handleSubmit: jest.fn().mockName("handleSubmitMock"),
      validateForm: jest.fn(() => false).mockName("validateForm")
    };
    const wrap = shallow(<LoginForm {...props} />);
    const buttonWrap = wrap.find(Button);

    expect(buttonWrap.length).toEqual(1);
    expect(buttonWrap.props().type).toEqual("submit");
    expect(buttonWrap.props().as).toEqual("button");
    expect(buttonWrap.props().disabled).toEqual(true);
    expect(buttonWrap.childAt(0).text()).toEqual("Sign In");
  });

  it("renders button as enabled if validateForm returns true", () => {
    props = {
      handleChange: jest.fn().mockName("handleChangeMock"),
      handleSubmit: jest.fn().mockName("handleSubmitMock"),
      validateForm: jest.fn(() => true).mockName("validateForm")
    };
    const wrap = shallow(<LoginForm {...props} />);
    const buttonWrap = wrap.find(Button);

    expect(buttonWrap.length).toEqual(1);
    expect(buttonWrap.props().type).toEqual("submit");
    expect(buttonWrap.props().as).toEqual("button");
    expect(buttonWrap.props().disabled).toEqual(false);
    expect(buttonWrap.childAt(0).text()).toEqual("Sign In");
  });

  it("calls handleSubmit when form is submitted", () => {
    props = {
      handleChange: jest.fn().mockName("handleChangeMock"),
      handleSubmit: jest.fn().mockName("handleSubmitMock"),
      validateForm: jest.fn(() => true).mockName("validateForm")
    };
    const wrap = shallow(<LoginForm {...props} />);

    expect(props.handleSubmit.mock.calls.length).toEqual(0);
    wrap.simulate("submit");
    expect(props.handleSubmit.mock.calls.length).toEqual(1);
  });
});
