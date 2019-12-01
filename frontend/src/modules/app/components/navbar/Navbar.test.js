import React from "react";
import { mount } from "enzyme";
import Navbar from ".";
import store from '../../../../store';

jest.mock("react-router-dom", () => ({
  withRouter: component => component,
  Link: jest.fn()
}));

describe("<Navbar />", () => {
  let wrapper;

  const historyMock = {
    push: jest.fn()
  };
  const getStateSpy = jest.spyOn(store, "getState");

  beforeEach(() => {
    wrapper = mount(<Navbar history={historyMock} />);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it("pushes to history when an item is clicked", () => {
    wrapper
      .find('[name="games"]')
      .simulate("click");
    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.push).toHaveBeenCalledWith("/games");
  });

  it("displays a dropdown when the user is authenticated", () => {
    getStateSpy.mockReturnValueOnce({ user: {}, isAuthenticated: true });

    wrapper = mount(<Navbar />);

    expect(wrapper.find('Dropdown').length).toEqual(1);
  });
});
