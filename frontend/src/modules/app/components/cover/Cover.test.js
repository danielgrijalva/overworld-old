import React from "react";
import { shallow } from "enzyme";
import Cover from "../cover";

describe("Test <Cover /> rendering", () => {
  let wrap, imageId, slug, size;

  beforeAll(() => {
    imageId = "sylfmtzktmb4b0ext8nr";
    slug = "dark-souls";
    size = "big";
    wrap = shallow(<Cover imageId={imageId} slug={slug} size={size} />);
  });

  it("renders without crashing", () => {
    expect(wrap.length).toEqual(1);
  });

  it("renders cover", () => {
    expect(wrap.children().length).toEqual(1);
  });

  it("renders Link with correct slug", () => {
    const linkWrap = wrap.childAt(0);

    expect(linkWrap.children().length).toEqual(1);
    expect(linkWrap.props().to).toEqual(`/games/${slug}`);
  });

  it("renders Image with correct src", () => {
    const imageWrap = wrap.childAt(0).childAt(0);
    const expectedSrc = `https://images.igdb.com/igdb/image/upload/t_cover_${size}/${imageId}.jpg`;

    expect(imageWrap.props().src).toEqual(expectedSrc);
  });
});
