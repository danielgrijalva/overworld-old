import React from "react";
import { mount } from "enzyme";
import Navbar from ".";
import * as reactRedux from "react-redux";

jest
  .spyOn(reactRedux, "useDispatch")
  .mockReturnValue(jest.fn(action => action()));
jest.spyOn(reactRedux, "useStore").mockReturnValue({ getState: jest.fn() });
const useSelectorSpy = jest
  .spyOn(reactRedux, "useSelector")
  .mockReturnValue({ errors: [], user: null, isAuthenticated: false });

jest.mock("react-router-dom", () => ({
  withRouter: component => component,
  Link: jest.fn()
}));

describe("<Navbar />", () => {
  let wrapper;

  const historyMock = {
    push: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(<Navbar history={historyMock} />);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it("pushes to history when an item is clicked", () => {
    wrapper.find('[name="games"]').simulate("click");
    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.push).toHaveBeenCalledWith("/games");
  });

  it("displays a dropdown when the user is authenticated", () => {
    useSelectorSpy.mockReturnValueOnce({ user: {}, isAuthenticated: true });

    wrapper = mount(<Navbar />);

    expect(wrapper.find("Dropdown").length).toEqual(1);
  });
});
