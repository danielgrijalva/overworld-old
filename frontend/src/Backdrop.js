import React from "react";
import { Container } from "semantic-ui-react";
import "./Backdrop.css";
import { LazyImage } from "react-lazy-images";

export default class Backdrop extends React.Component {
  render() {
    return (
      <Container>
        <div className="backdrop-container">
          <div className="backdrop-wrapper">
            <LazyImage
              src={this.props.actual}
              placeholder={({ imageProps, ref }) => (
                <div
                  {...imageProps}
                  ref={ref}
                  className="backdrop-placeholder"
                  style={{
                    backgroundImage: `url(${
                      this.props.placeholder
                    })`
                  }}
                />
              )}
              actual={({ imageProps }) => (
                <div
                  style={{
                    backgroundImage: `url(${
                      imageProps.src
                    })`
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
}
