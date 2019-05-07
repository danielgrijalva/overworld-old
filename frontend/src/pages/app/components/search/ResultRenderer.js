import React from "react";
import { Label } from "semantic-ui-react";

export const ResultRenderer = ({
  id,
  name,
  expected_release_year,
  original_release_date
}) => {
  if (original_release_date) {
    const year = original_release_date.substring(0, 4);
    return <Label key={id} content={`${name} (${year})`} />;
  } else if (expected_release_year) {
    return <Label key={id} content={`${name} (${expected_release_year})`} />;
  } else {
    return <Label key={id} content={name} />;
  }
};
