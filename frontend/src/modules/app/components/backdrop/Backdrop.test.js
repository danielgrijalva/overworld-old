import React from "react";
import Enzyme, { shallow } from "enzyme";
import Backdrop from "../backdrop";
import { LazyImage } from "react-lazy-images";

describe("Test <Backdrop /> rendering", () => {
  it("renders without crashing", () => {
    const imageId = "nz70mpjc7kszcyesgmqw";
    const wrap = shallow(<Backdrop imageId={imageId} />);
    expect(wrap.length).toEqual(1);
  });

  it("renders null with blank imageId prop", () => {
    const imageId = "";
    const wrap = shallow(<Backdrop imageId={imageId} />);
    expect(wrap.get(0)).toBeNull();
    expect(wrap.find("div")).toHaveLength(0);
  });

  it("renders wrapper with two children, LazyImage and backdrop-mask", () => {
    const imageId = "nz70mpjc7kszcyesgmqw";
    const wrap = shallow(<Backdrop imageId={imageId} />);
    const backdropWrapper = wrap.find("div.backdrop-wrapper");
    expect(backdropWrapper).toHaveLength(1);
    expect(backdropWrapper.children()).toHaveLength(2);
    expect(backdropWrapper.childAt(0).find(LazyImage)).toHaveLength(1);
    expect(backdropWrapper.childAt(1).type()).toEqual("div");
    expect(backdropWrapper.childAt(1).hasClass("backdrop-mask")).toEqual(true);
  });
});

describe("Test <Backdrop /> LazyImage rendering", () => {
  let wrap, imageId, expectedSrc, lazyImage;

  beforeAll(() => {
    imageId = "nz70mpjc7kszcyesgmqw";
    expectedSrc = `https://images.igdb.com/igdb/image/upload/t_1080p/${imageId}.jpg`;
    wrap = shallow(<Backdrop imageId={imageId} />);
    lazyImage = wrap.find(LazyImage);
  });

  it("renders LazyImage with correct src when imageId is provided", () => {
    expect(lazyImage).toHaveLength(1);
    expect(lazyImage.props().src).toEqual(expectedSrc);
  });

  it("renders LazyImage actual function with correct className and url", () => {
    const lazyImageActual = lazyImage.props().actual();
    expect(lazyImageActual.props.className).toEqual("backdrop-actual");
    expect(lazyImageActual.props.style.backgroundImage).toEqual(
      `url(${expectedSrc})`
    );
  });
});
