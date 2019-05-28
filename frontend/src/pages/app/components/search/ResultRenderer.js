import React from "react";
import { Label } from "semantic-ui-react";
import Moment from "react-moment";

export const ResultRenderer = ({ id, name, first_release_date }) => {
  const year = new Date(first_release_date * 1000).getFullYear();
  if (first_release_date) {
    return <Label key={id} content={`${name} (${year})`} />;
  } else {
    return <Label key={id} content={name} />;
  }
};
