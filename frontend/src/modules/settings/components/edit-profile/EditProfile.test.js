import React from "react";
import { mount } from "enzyme";
import EditProfile from ".";
import { Provider } from "react-redux";
import { initializeStore } from "../../../../store";
import * as actions from "../../../profile/actions";

describe("Testing <EditProfile />", () => {
  let wrap;

  const editProfileSpy = jest.spyOn(actions, "editProfile").mockReturnValue(jest.fn());
  const refreshAvatarSpy = jest.spyOn(actions, "refreshAvatar").mockReturnValue(jest.fn());

  const fillForm = (profile) => {
    wrap
      .find('input[name="username"]')
      .simulate("change", { target: { name: "username", value: profile.username } });
    wrap
      .find('input[name="email"]')
      .simulate("change", { target: { name: "email", value: profile.email } });
    wrap
      .find('input[name="location"]')
      .simulate("change", { target: { name: "location", value: profile.location } });
    wrap
      .find('input[name="twitter"]')
      .simulate("change", { target: { name: "twitter", value: profile.twitter } });
    wrap
      .find('textarea[name="bio"]')
      .simulate("change", { target: { name: "bio", value: profile.bio } });
  };

  beforeEach(() => {
    const initialStore = {
      auth: {
        token: 'c95441469e6d9d3e6c699b44ee5b730aa4636d657f4917cf659319ad5c7c0dd6',
        isAuthenticated: true,
        isLoading: false,
        user: {
        id: 1,
        username: 'pathakpratik',
        email: 'rajpratik10@gmail.com',
        gravatar: 'https://secure.gravatar.com/avatar/a8af925361e2a6a5869a3baf5a6e0ce1?size=120&default=retro'
        },
        errors: []
      }
    };
    const store = initializeStore(initialStore);    
    wrap = mount(
        <Provider store={store}>
            <EditProfile />
        </Provider>
    );
  });

  afterEach(() => {
    wrap.unmount();
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    expect(wrap.length).toEqual(1);
  });

  describe("Testing handleSubmit()", () => {
    it("calls editProfile with test profile when handleSubmit is called", () => {
      
      const testProfile = {
        "username": "testuser", 
        "email":"test@email.com", 
        "bio":"test bio",
        "location": "mumbai", 
        "twitter": "testaccount" 
      };

      fillForm(testProfile);

      wrap.find(".edit-profile-form").at(0).simulate("submit");

      expect(editProfileSpy).toHaveBeenCalledTimes(1);
      expect(editProfileSpy).toHaveBeenCalledWith(testProfile);
    });
  });

  describe("Testing Gravatar", () => {
    it("calls refreshAvatar when handleRefreshSubmit is called", () => {

      wrap.find(".avatar-form").at(1).simulate("submit");

      expect(refreshAvatarSpy).toHaveBeenCalledTimes(1);
    });
  });

});
