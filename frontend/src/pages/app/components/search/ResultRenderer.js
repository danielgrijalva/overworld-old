import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";

export const ResultRenderer = ({ id, name, first_release_date }) => {
  const year = new Date(first_release_date * 1000).getFullYear();
  if (first_release_date) {
    return <Label key={id} content={`${name} (${year})`} />;
  } else {
    return <Label key={id} content={name} />;
  }
};

ResultRenderer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  first_release_date: PropTypes.string
};
