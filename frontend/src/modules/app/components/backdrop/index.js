import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { LazyImage } from "react-lazy-images";
import "./styles.css";

export default class Backdrop extends React.Component {
  render() {
    const { imageId } = this.props;
    const thumb = `https://images.igdb.com/igdb/image/upload/t_cover_small/${imageId}.jpg`;
    const actual = `https://images.igdb.com/igdb/image/upload/t_1080p/${imageId}.jpg`;
    if (imageId) {
      return (
        <Container className="backdrop">
          <div className="backdrop-container">
            <div className="backdrop-wrapper">
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
                      backgroundImage: `url(${actual})`
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
    } else {
      return null;
    }
  }
}

Backdrop.propTypes = {
  imageId: PropTypes.string.isRequired
};
