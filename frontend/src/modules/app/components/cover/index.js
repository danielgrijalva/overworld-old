import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import "./styles.css";

const Cover = ({ imageId, slug, className, size }) => {
  const cover = `https://images.igdb.com/igdb/image/upload/t_cover_${size}/${imageId}.jpg`;
  return (
    <div className={className}>
      <Link to={`/games/${slug}`} className="cover-link">
        <Image src={cover} rounded fluid className="cover" />
      </Link>
    </div>
  );
};

Cover.propTypes = {
  imageId: PropTypes.string.isRequired
};

export default Cover;
