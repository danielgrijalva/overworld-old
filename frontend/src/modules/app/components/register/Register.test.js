import React from "react";
import { mount } from "enzyme";
import Register from ".";
import * as reactRedux from "react-redux";

jest.spyOn(reactRedux, "useDispatch").mockReturnValue(jest.fn(action => action()));
jest.spyOn(reactRedux, "useSelector").mockReturnValue({});

describe("<Register />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Register />);
  });

  it("opens a modal when button is clicked", () => {
    wrapper.find("Button").simulate("click");

    expect(wrapper.find("Modal").length).toBe(1);
  });

  describe("the form", () => {
    const completedFormValues = {
      email: "test@example.com",
      username: "testuser",
      password: "testpass",
      password2: "testpass"
    };

    const emptyFormValues = {
      email: "",
      username: "",
      password: "",
      password2: ""
    };

    let formValuesToEnter = emptyFormValues;

    const enterFormValues = formValues => {
      Object.entries(formValues).map(([key, value]) => {
        return wrapper
          .find(`input[name="${key}"]`)
          .simulate("change", { target: { name: key, value } });
      });
    };

    beforeEach(() => {
      wrapper.find("Button").simulate("click");
    });

    it("is invalid if nothing is entered", () => {
      enterFormValues(formValuesToEnter);
      expect(wrapper.find('Button').at(0).props().disabled).toBe(true);
    });

    it("is invalid if only username is entered", () => {
      formValuesToEnter.username = completedFormValues.username;
      enterFormValues(formValuesToEnter);
      expect(wrapper.find('Button').at(0).props().disabled).toBe(true);
    });

    it("is invalid if only username and email are entered", () => {
      formValuesToEnter.username = completedFormValues.username;
      formValuesToEnter.email = completedFormValues.email;
      enterFormValues(formValuesToEnter);
      expect(wrapper.find('Button').at(0).props().disabled).toBe(true);
    })

    it("is invalid if only username, email, and password are entered", () => {
      formValuesToEnter.username = completedFormValues.username;
      formValuesToEnter.email = completedFormValues.email;
      formValuesToEnter.password = completedFormValues.password;
      enterFormValues(formValuesToEnter);
      expect(wrapper.find('Button').at(0).props().disabled).toBe(true);
    });

    it("is invalid if passwords do not match", () => {
      formValuesToEnter = { ...completedFormValues };
      formValuesToEnter.password2 = "testpass2";
      enterFormValues(formValuesToEnter);
      expect(wrapper.find('Button').at(0).props().disabled).toBe(true);
    });

    it("is valid if all info is entered properly", () => {
      formValuesToEnter = { ...completedFormValues };
      enterFormValues(formValuesToEnter);
      expect(wrapper.find('Button').at(0).props().disabled).toBe(false);
    })
  });
});
