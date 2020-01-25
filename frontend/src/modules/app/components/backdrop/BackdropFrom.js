import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles.css";

export default function BackdropFrom({ backdrop }) {
  return (
    <>
      {Object.keys(backdrop).length > 0 && (
        <section className="backdrop-name">
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
