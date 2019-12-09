import React from "react";
import { mount } from "enzyme";
import Ratings from ".";

describe("<Ratings />", () => {
  let wrapper;

  beforeEach(() => {
    const props = { ratings: [], showAverage: false };
    wrapper = mount(<Ratings {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("shows nothing if there are no ratings", () => {
    expect(wrapper.html()).toBe(null);
  });

  describe("with ratings passed in", () => {
    const ratings = [{ rating: 1 }, { rating: 5 }];

    beforeEach(() => {
      wrapper.setProps({ ratings });
    });

    it("displays a rating chart", () => {
      expect(wrapper.find(".rating-chart").length).toBe(1);
    });

    describe("and opting to show averages", () => {
      beforeEach(() => {
        wrapper.setProps({ showAverage: true });
      });

      it("shows the average rating", () => {
        expect(wrapper.find(".rating-average").html()).toContain("3");
      });
    });
  });
});
