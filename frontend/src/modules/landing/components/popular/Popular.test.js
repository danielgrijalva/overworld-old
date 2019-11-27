import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Link } from "react-router-dom";
import Popular from "../popular";

describe("Test <Popular />", () => {
  it("shows required props warning when no props passed", () => {
    console.error = jest.fn();
    expect(() => {
      shallow(<Popular />);
    }).toThrow();

    expect(console.error).toHaveBeenCalledTimes(2);
    const isLoadingWarning = console.error.mock.calls[0];
    const popularWarning = console.error.mock.calls[1];
    expect(isLoadingWarning[0]).toMatch(
      "The prop `isLoading` is marked as required in `Popular`,"
    );
    expect(popularWarning[0]).toMatch(
      "The prop `popular` is marked as required in `Popular`,"
    );
    console.error.mockClear();
  });
});

describe("Test <Popular /> when isLoading is true and popular is empty", () => {
  let wrap;
  const props = {
    isLoading: true,
    popular: []
  };

  beforeAll(() => {
    wrap = shallow(<Popular {...props} />);
  });

  it("renders a section with popular margin-top-xs margin-bottom classes", () => {
    const section = wrap.find("section");
    expect(section.hasClass("popular margin-top-xs margin-bottom")).toEqual(
      true
    );
  });

  it("renders 6 placeholders", () => {
    const placeholders = wrap.find("div");
    expect(placeholders).toHaveLength(6);
    placeholders.forEach(node => {
      expect(node.hasClass("placeholder")).toEqual(true);
    });
  });
});

describe("Test <Popular /> when isLoading is true and popular is valid", () => {
  let wrap;
  const props = {
    isLoading: true,
    popular: [
      {
        id: 26950,
        cover: {
          id: 75103,
          image_id: "co1ly7"
        },
        name: "Marvel's Avengers",
        popularity: 1969.805380721215,
        slug: "marvels-avengers"
      },
      {
        id: 18225,
        cover: {
          id: 74152,
          image_id: "co1l7s"
        },
        name: "The Sinking City",
        popularity: 1307.732224438319,
        slug: "the-sinking-city"
      }
    ]
  };

  beforeAll(() => {
    wrap = shallow(<Popular {...props} />);
  });

  it("renders a section with popular margin-top-xs margin-bottom classes", () => {
    const section = wrap.find("section");
    expect(section.hasClass("popular margin-top-xs margin-bottom")).toEqual(
      true
    );
  });

  it("renders 6 placeholders", () => {
    const placeholders = wrap.find("div");
    expect(placeholders).toHaveLength(6);
    placeholders.forEach(node => {
      expect(node.hasClass("placeholder")).toEqual(true);
    });
  });

  it("does not render links, images or covers", () => {
    expect(wrap.find("a")).toHaveLength(0);
    expect(wrap.find("img")).toHaveLength(0);
  });
});

describe("Test <Popular /> when isLoading is false and popular is valid", () => {
  let wrap;
  const props = {
    isLoading: false,
    popular: [
      {
        id: 26950,
        cover: {
          id: 75103,
          image_id: "co1ly7"
        },
        name: "Marvel's Avengers",
        popularity: 1969.805380721215,
        slug: "marvels-avengers"
      },
      {
        id: 18225,
        cover: {
          id: 74152,
          image_id: "co1l7s"
        },
        name: "The Sinking City",
        popularity: 1307.732224438319,
        slug: "the-sinking-city"
      },
      {
        id: 1877,
        cover: {
          id: 75012,
          image_id: "co1lvo"
        },
        name: "Cyberpunk 2077",
        popularity: 1132.301904767031,
        slug: "cyberpunk-2077"
      },
      {
        id: 115276,
        cover: {
          id: 71673,
          image_id: "co1jax"
        },
        name: "Super Mario Maker 2",
        popularity: 779.4544220204455,
        slug: "super-mario-maker-2"
      },
      {
        id: 38967,
        cover: {
          id: 75151,
          image_id: "co1lzj"
        },
        name: "Cooking Simulator",
        popularity: 726.6170417175734,
        slug: "cooking-simulator"
      },
      {
        id: 26845,
        cover: {
          id: 72090,
          image_id: "co1jmi"
        },
        name: "Fire Emblem: Three Houses",
        popularity: 629.3250779076088,
        slug: "fire-emblem-three-houses"
      }
    ]
  };

  beforeAll(() => {
    wrap = shallow(<Popular {...props} />);
  });

  it("renders a section with popular margin-top-xs margin-bottom classes", () => {
    const section = wrap.find("section");
    expect(section.hasClass("popular margin-top-xs margin-bottom")).toEqual(
      true
    );
  });

  it("renders the popular games passed through prop", () => {
    const links = wrap.find(Link);
    expect(links).toHaveLength(6);

    // Test each game given in popular prop
    links.forEach((node, i) => {
      const slug = props.popular[i].slug;
      const image_id = props.popular[i].cover.image_id;
      const name = props.popular[i].name;

      // Test the anchor and href
      expect(node.hasClass("cover-wrapper")).toEqual(true);
      expect(node.props().to).toEqual(`/games/${slug}`);

      // Test the image
      const img = node.children().get(0);
      expect(img.type).toEqual("img");
      expect(img.props.className).toEqual("cover");
      expect(img.props.alt).toEqual(props.popular[i].name);
      expect(img.props.src).toEqual(
        `https://images.igdb.com/igdb/image/upload/t_cover_big/${image_id}.jpg`
      );

      // Test the div
      const div = node.children().get(1);
      expect(div.type).toEqual("div");
      expect(div.props.className).toEqual("cover-overlay");

      const strong = div.props.children;
      expect(strong.type).toEqual("strong");
      expect(strong.props.children).toEqual(name);
    });
  });
});

describe("Test <Popular /> when isLoading is false and popular is empty", () => {
  let wrap;
  const props = {
    isLoading: false,
    popular: []
  };

  beforeAll(() => {
    wrap = shallow(<Popular {...props} />);
  });

  it("renders a section with popular margin-top-xs margin-bottom classes", () => {
    const section = wrap.find("section");
    expect(section.hasClass("popular margin-top-xs margin-bottom")).toEqual(
      true
    );
  });

  it("renders a section with 0 children", () => {
    const section = wrap.find("section");
    expect(section.children()).toHaveLength(0);
  });

  it("does not render links, images or covers", () => {
    expect(wrap.find("a")).toHaveLength(0);
    expect(wrap.find("img")).toHaveLength(0);
    expect(wrap.find("div")).toHaveLength(0);
  });
});
