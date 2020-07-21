import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function BackdropFrom({ backdrop, position = false }) {
  return (
    <>
      {Object.keys(backdrop).length > 0 && (
        <section
          className="backdrop-name"
          style={position == "isLeft" ? { marginRight: "18%" } : {}}
        >
          Backdrop from{" "}
          <Link
            to={{
              pathname: `/games/${backdrop.slug}`,
              state: backdrop.gameId
            }}
          >
            {backdrop.name}
          </Link>
        </section>
      )}
    </>
  );
}

BackdropFrom.propTypes = {
  backdrop: PropTypes.object.isRequired
};
