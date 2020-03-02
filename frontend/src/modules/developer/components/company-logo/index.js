import React from "react";
import PropTypes from "prop-types";
import { StyledCoverImage } from "./styles";

const CompanyLogo = React.memo(({ imageId }) => {
  const coverUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`;
  return <StyledCoverImage src={coverUrl} rounded fluid />;
});

CompanyLogo.propTypes = {
  imageId: PropTypes.string.isRequired
};

export default CompanyLogo;
