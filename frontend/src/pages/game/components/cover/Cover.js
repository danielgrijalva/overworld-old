import React from "react";
import PropTypes from "prop-types";
import { LazyImage } from "react-lazy-images";
import "./Cover.css";

export const Cover = ({ imageId }) => {
  const thumb = `https://images.igdb.com/igdb/image/upload/t_cover_small/${imageId}.jpg`;
  const actual = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`;
  return (
    <section className="game-cover">
      <LazyImage
        src={actual}
        alt="Game cover"
        placeholder={({ imageProps, ref }) => (
          <img
            alt="Loading cover..."
            {...imageProps}
            ref={ref}
            className="ui rounded image cover placeholder"
            src={thumb}
          />
        )}
        actual={({ imageProps }) => (
          <img
            alt="Game cover"
            className="ui rounded image cover"
            {...imageProps}
          />
        )}
      />
    </section>
  );
};

Cover.propTypes = {
  imageId: PropTypes.string.isRequired
};
