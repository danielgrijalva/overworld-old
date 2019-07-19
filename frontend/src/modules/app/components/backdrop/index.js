import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { LazyImage } from "react-lazy-images";
import "./styles.css";

export default class Backdrop extends React.Component {
  render() {
    const { image_id } = this.props || {};
    const thumb = `https://images.igdb.com/igdb/image/upload/t_cover_small/${image_id}.jpg`;
    const actual = `https://images.igdb.com/igdb/image/upload/t_1080p/${image_id}.jpg`;
    if (this.props.image_id) {
      console.log("image is available!");
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
      return <span>No image available</span>;
    }
  }
}

Backdrop.propTypes = {
  image_id: PropTypes.string.isRequired
};
