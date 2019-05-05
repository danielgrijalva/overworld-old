import React from "react";
import { LazyImage } from "react-lazy-images";
import "./Cover.css";

export const Cover = ({ image }) => {
  return (
    <section className="game-cover">
      <LazyImage
        src={image.small_url}
        alt="Game cover"
        placeholder={({ imageProps, ref }) => (
          <img
            alt="Loading backdrop..."
            {...imageProps}
            ref={ref}
            className="ui rounded image cover placeholder"
            src={image.thumb_url}
          />
        )}
        actual={({ imageProps }) => (
          <img
            alt="Game backdrop"
            className="ui rounded image cover"
            {...imageProps}
          />
        )}
      />
    </section>
  );
};
