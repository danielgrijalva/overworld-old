import React from "react";
import { shallow, mount } from "enzyme";
import { Redirect } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import Error from "../errors/";
import { LoginForm } from "./Form";
import LogIn from "../login";
import * as reactRedux from "react-redux";
import * as actions from "../../actions";

jest
  .spyOn(reactRedux, "useDispatch")
  .mockReturnValue(jest.fn(action => action()));
const useSelectorMock = jest
  .spyOn(reactRedux, "useSelector")
  .mockReturnValue({ errors: [], user: null, isAuthenticated: false });

describe("Test <LogIn /> rendering", () => {
  let wrap;
  let props;

  beforeEach(() => {
    props = {
      loginText: "Please log in"
    };

    wrap = shallow(<LogIn {...props} />);
  });

  afterEach(() => {
    wrap.unmount();
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    expect(wrap.length).toEqual(1);
  });

  it("redirects when user is authenticated", () => {
    useSelectorMock.mockReturnValueOnce({
      user: { username: "testuser" },
      errors: [],
      isAuthenticated: true
    });

    wrap = shallow(<LogIn {...props} />);

    expect(wrap.getElements().length).toEqual(1);
    expect(wrap.type()).toEqual(Redirect);
    expect(wrap.props().to).toEqual("/testuser");
  });

  it("renders Modal when user is not authenticated", () => {
    expect(wrap.type()).toEqual(Modal);
  });

  it("renders Modal description and login form", () => {
    const modalContent = wrap.find(Modal.Content);
    const modalDescription = modalContent.childAt(0);
    const loginForm = modalContent.childAt(1);

    expect(modalDescription.type()).toEqual(Modal.Description);
    expect(loginForm.type()).toEqual(LoginForm);
  });

  it("renders errors if errors exist", () => {
    const errorsObj = { errors: ["test", "some", "errors"] };
    useSelectorMock.mockReturnValueOnce(errorsObj);
    wrap = shallow(<LogIn {...props} />);

    const errors = wrap.find(Error);

    expect(errors.length).toBe(3);

    errors.forEach((node, i) => {
      expect(node.type()).toEqual(Error);
      expect(node.props().message).toEqual(errorsObj.errors[i]);
      expect(node.props().size).toEqual("small");
      expect(node.props().compact).toEqual(true);
    });
  });
});

describe("Test <LogIn /> functions", () => {
  let wrap, props;

  const dismissErrorsSpy = jest.spyOn(actions, "dismissErrors");
  const loginSpy = jest.spyOn(actions, "login").mockReturnValue(jest.fn());

  const fillForm = (username, password) => {
    wrap.simulate("click");
    wrap
      .find('input[name="username"]')
      .simulate("change", { target: { name: "username", value: username } });
    wrap
      .find('input[name="password"]')
      .simulate("change", { target: { name: "password", value: password } });
  };

  beforeEach(() => {
    props = {
      loginText: "Please log in"
    };

    wrap = mount(<LogIn {...props} />);
  });

  afterEach(() => {
    wrap.unmount();
    jest.clearAllMocks();
  });

  describe("Test handleChange()", () => {
    it("updates username correctly when inputted", () => {
      const usernameField = () => wrap.find('input[name="username"]');
      const e = { target: { name: "username", value: "test" } };

      wrap.simulate("click");
      usernameField().simulate("change", e);

      expect(usernameField().props().value).toContain("test");
    });

    it("updates password correctly when inputted", () => {
      const passwordField = () => wrap.find('input[name="password"]');
      const e = { target: { name: "password", value: "test" } };

      wrap.simulate("click");
      passwordField().simulate("change", e);

      expect(passwordField().props().value).toContain("test");
    });
  });

  describe("Test handleSubmit()", () => {
    it("calls login with current state when handleSubmit is called", () => {
      fillForm("testuser", "testpass");

      wrap.find("Form").simulate("submit");

      expect(loginSpy).toHaveBeenCalledTimes(1);
      expect(loginSpy).toHaveBeenCalledWith("testuser", "testpass");
    });
  });

  describe("Test handleOpen() and handleClose()", () => {
    it("opens the modal when the menu item is clicked", () => {
      wrap.simulate("click");

      expect(wrap.contains(Modal)).toBe(true);
    });

    it("calls dismissErrors when handleClose is called and errors exist", () => {
      const errorsObj = { errors: ["test", "some", "errors"] };
      useSelectorMock.mockReturnValueOnce(errorsObj);
      wrap = shallow(<LogIn {...props} />);

      wrap.simulate("click");
      wrap
        .find(Modal)
        .props()
        .onClose();

      expect(dismissErrorsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Test validateForm()", () => {
    it("is not validated with no username and no password", () => {
      fillForm("", "");

      expect(wrap.find("Button").props().disabled).toEqual(true);
    });

    it("is not validated with username and no password", () => {
      fillForm("a", "");

      expect(wrap.find("Button").props().disabled).toEqual(true);
    });

    it("is not validated with no username and a password", () => {
      fillForm("", "a");

      expect(wrap.find("Button").props().disabled).toEqual(true);
    });

    it("is validated with username and password", () => {
      fillForm("a", "a");

      expect(wrap.find("Button").props().disabled).toEqual(false);
    });
  });
});
