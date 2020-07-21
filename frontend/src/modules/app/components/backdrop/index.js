import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { LazyImage } from "react-lazy-images";
import "./styles.scss";

export default function Backdrop({ imageId, position = false }) {
  const thumb = `https://images.igdb.com/igdb/image/upload/t_cover_small/${imageId}.jpg`;
  const actual = `https://images.igdb.com/igdb/image/upload/t_1080p/${imageId}.jpg`;

  if (imageId) {
    return (
      <Container
        className="backdrop"
        style={
          position == "isBackground" || position == "isLeft"
            ? { paddingBottom: "100px" }
            : {}
        }
      >
        <div className="backdrop-container">
          <div
            className="backdrop-wrapper"
            style={
              position == "isLeft" ? { transform: "translateX(-70%)" } : {}
            }
          >
            <LazyImage
              src={actual}
              placeholder={({ imageProps, ref }) => (
                <div
                  {...imageProps}
                  ref={ref}
                  className="backdrop-placeholder"
                  style={{
                    backgroundImage: `url(${thumb})`
                  }}
                />
              )}
              actual={() => (
                <div
                  style={{
                    backgroundImage: `url(${actual})`,
                    opacity: position == "isBackground" || position == "isLeft" ? 0.4 : 1
                  }}
                  className="backdrop-actual"
                />
              )}
            />
            <div className="backdrop-mask" />
          </div>
        </div>
      </Container>
    );
  }
  return null;
}

Backdrop.propTypes = {
  imageId: PropTypes.string.isRequired
};
