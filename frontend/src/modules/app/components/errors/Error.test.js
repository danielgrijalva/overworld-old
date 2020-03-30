import React from "react";
import { shallow } from "enzyme";
import Error from ".";

describe("<Error />", () => {
  let wrapper;
  const testMessage = "test";
  const restProps = {
    testProp1: "testProp1",
    testProp2: "testProp2"
  };

  beforeEach(() => {
    wrapper = shallow(<Error message={testMessage} {...restProps} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the passed error message", () => {
    expect(wrapper.html()).toContain(testMessage);
  });

  it("passes any additional props to the Message component", () => {
    const actualProps = wrapper.find("Message").props();
    Object.entries(restProps).map(([propKey, propValue]) => {
      expect(actualProps[propKey]).toEqual(propValue);
    });
  });
});
