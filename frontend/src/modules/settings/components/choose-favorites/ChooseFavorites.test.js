import React from "react";
import { mount } from "enzyme";
import { Modal } from "semantic-ui-react";
import { Provider } from "react-redux";
import { initializeStore } from "../../../../store";
import ChooseFavorites from ".";

jest.mock("react-router-dom", () => ({
  withRouter: component => component,
  Link: jest.fn()
}));

describe("Testing <ChooseFavorites />", () => {
  let wrapper;

  beforeEach(() => {
    const props = {
        "favorites": []
    }
    const store = initializeStore();    
    wrapper = mount(
        <Provider store={store}>
            <ChooseFavorites {...props} />
        </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it("shows nothing if no favorite games", () => {
    expect(wrapper.find('.favorite-game-wrapper')).toHaveLength(0);
  });

  describe("with favorite games passed in", () => {

    const store = initializeStore();
    const props = {
        "favorites": [
            {
            "igdb": 26186,
            "name": "Need for Speed: Most Wanted NFS Heroes Pack",
            "slug": "need-for-speed-most-wanted-nfs-heroes-pack",
            "cover_id": "mui696xbkocbab6tnunn",
            "backdrop_id": "bc23xhr2ymtnrcr9se6r"
          },
          {
            "igdb": 42601,
            "name": "Super Baseball Simulator 1.000",
            "slug": "super-baseball-simulator-1-dot-000",
            "cover_id": "bxq1srmsfgoapoce27pz",
            "backdrop_id": ""
          }
        ]
    }    
    const wrapper = mount(
        <Provider store={store}>
            <ChooseFavorites {...props} />
        </Provider>
    );

    it("render games with remove buttons", () => {
      expect(wrapper.find(".favorite-game-wrapper")).toHaveLength(2);
      expect(wrapper.find(".remove-favorite")).toHaveLength(4);
    });

    it("add favorite button opens a modal", () => {
      wrapper.find(".add-favorite").at(1).simulate("click");
      expect(wrapper.contains(Modal)).toBe(true);
    });
  });

});