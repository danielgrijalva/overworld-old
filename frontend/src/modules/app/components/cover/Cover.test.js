import React from "react";
import Enzyme, { shallow } from "enzyme";
import Cover from "../cover";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";

describe("Test <Cover /> rendering", () => {
  let wrap, imageId, slug, size;

  beforeAll(() => {
    imageId = "sylfmtzktmb4b0ext8nr";
    slug = "dark-souls";
    size = "big";
    wrap = shallow(
      <Cover
        imageId={imageId}
        slug={slug}
        className="cover-wrapper"
        size={size}
      />
    );
  });

  it("renders without crashing", () => {
    expect(wrap.length).toEqual(1);
  });

  it("renders cover-wrapper", () => {
    expect(wrap.children().length).toEqual(1);
    expect(wrap.type()).toEqual("div");
    expect(wrap.hasClass("cover-wrapper")).toEqual(true);
  });

  it("renders Link with correct slug and class", () => {
    const linkWrap = wrap.childAt(0);

    expect(linkWrap.children().length).toEqual(1);
    expect(linkWrap.type()).toEqual(Link);
    expect(linkWrap.props().to).toEqual(`/games/${slug}`);
    expect(linkWrap.hasClass("cover-link")).toEqual(true);
  });

  it("renders Image with correct src and class", () => {
    const imageWrap = wrap.childAt(0).childAt(0);
    const expectedSrc = `https://images.igdb.com/igdb/image/upload/t_cover_${size}/${imageId}.jpg`;

    expect(imageWrap.type()).toEqual(Image);
    expect(imageWrap.props().src).toEqual(expectedSrc);
    expect(imageWrap.hasClass("cover")).toEqual(true);
  });
});
