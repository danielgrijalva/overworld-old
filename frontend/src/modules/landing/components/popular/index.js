import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles.css";

const Popular = ({ isLoading, popular }) => (
  <section className="popular margin-top-xs margin-bottom">
    {!isLoading ? (
      <React.Fragment>
        {popular.map((p, i) => {
          return (
            <Link to={`/games/${p.slug}`} key={p.id} className="cover-wrapper">
              <img
                className="cover"
                alt={p.name}
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${p.cover.image_id}.jpg`}
              />
              <div key={i} className="cover-overlay">
                <strong>{p.name}</strong>
              </div>
            </Link>
          );
        })}
      </React.Fragment>
    ) : (
      <React.Fragment>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="placeholder" />
        ))}
      </React.Fragment>
    )}
  </section>
);

Popular.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  popular: PropTypes.array.isRequired
};

export default Popular;
