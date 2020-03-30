import React from "react";
import Enzyme, { shallow } from "enzyme";
import ListPreview from "../list-preview";

const gameList = [
  {
    igdb: 26950,
    name: "Marvel's Avengers",
    slug: "marvels-avengers",
    cover_id: 75103
  },
  {
    igdb: 114286,
    cover_id: 77083,
    name: "Madden NFL 20",
    slug: "madden-nfl-20"
  },
  {
    igdb: 26845,
    cover_id: 76781,
    name: "Fire Emblem: Three Houses",
    slug: "fire-emblem-three-houses"
  },
  {
    igdb: 1877,
    cover_id: 75012,
    name: "Cyberpunk 2077",
    slug: "cyberpunk-2077"
  },
  {
    igdb: 18225,
    cover_id: 74152,
    name: "The Sinking City",
    slug: "the-sinking-city"
  },
  {
    id: 115278,
    cover_id: 73933,
    name: "Rune Factory 4 Special",
    slug: "rune-factory-4-special"
  }
];

describe("Test <ListPreview /> rendering", () => {
  let wrap, props;

  beforeAll(() => {
    props = { games: gameList.slice(0, 5) };
    wrap = shallow(<ListPreview {...props} />);
  });

  it("renders without crashing", () => {
    expect(wrap.length).toEqual(1);
  });

  it("renders only 5 game images with correct src and and classes", () => {
    const gamesWrap = wrap.find("ul.cover-list.overlapped");
    const games = gamesWrap.children();
    expect(games.length).toEqual(5);

    games.forEach((node, i) => {
      const igdb = props.games[i].igdb;
      const name = props.games[i].name;
      const cover_id = props.games[i].cover_id;

      expect(node.type()).toEqual("li");
      expect(node.hasClass("cover-list-item")).toEqual(true);
      expect(node.key()).toEqual(`${igdb}`);

      const divWrap = node.childAt(0);
      expect(divWrap.type()).toEqual("div");
      expect(divWrap.hasClass("list-cover-wrapper"));

      const imageWrap = divWrap.childAt(0);
      const expectedSrc = `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover_id}.jpg`;
      expect(imageWrap.type()).toEqual("img");
      expect(imageWrap.props().src).toEqual(expectedSrc);
      expect(imageWrap.props().alt).toEqual(name);
      expect(imageWrap.hasClass("cover")).toEqual(true);
    });
  });
});

describe("Test <ListPreview /> rendering with 2 games in prop", () => {
  let wrap, props;

  beforeAll(() => {
    props = { games: gameList.slice(0, 2) };
    wrap = shallow(<ListPreview {...props} />);
  });

  it("renders without crashing", () => {
    expect(wrap.length).toEqual(1);
  });

  it("renders 2 game images in props with correct src and classes", () => {
    const gamesWrap = wrap.find("ul.cover-list.overlapped");
    const games = gamesWrap.children();
    expect(games.length).toEqual(2);

    games.forEach((node, i) => {
      const igdb = props.games[i].igdb;
      const name = props.games[i].name;
      const cover_id = props.games[i].cover_id;

      expect(node.type()).toEqual("li");
      expect(node.hasClass("cover-list-item")).toEqual(true);
      expect(node.key()).toEqual(`${igdb}`);

      const divWrap = node.childAt(0);
      expect(divWrap.type()).toEqual("div");
      expect(divWrap.hasClass("list-cover-wrapper"));

      const imageWrap = divWrap.childAt(0);
      const expectedSrc = `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover_id}.jpg`;
      expect(imageWrap.type()).toEqual("img");
      expect(imageWrap.props().src).toEqual(expectedSrc);
      expect(imageWrap.props().alt).toEqual(name);
      expect(imageWrap.hasClass("cover")).toEqual(true);
    });
  });
});

describe("Test <ListPreview /> rendering with empty games prop", () => {
  let wrap, props;

  beforeAll(() => {
    props = { games: [] };
    wrap = shallow(<ListPreview {...props} />);
  });

  it("renders without crashing", () => {
    expect(wrap.length).toEqual(1);
  });

  it("does not render game images", () => {
    const gamesWrap = wrap.find("ul.cover-list.overlapped");
    const games = gamesWrap.children();
    expect(games.length).toEqual(0);
  });
});
