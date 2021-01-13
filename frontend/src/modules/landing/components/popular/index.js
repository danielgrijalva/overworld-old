import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles.scss";

const Popular = ({ isLoading, popular }) => (
  <section className="popular margin-top-xs margin-bottom">
    {!isLoading ? (
      <React.Fragment>
        {popular.map((p, i) => {
          return (
            <Link to={`/games/${p.game.slug}`} key={p.game.id} className="cover-wrapper">
              <img
                className="cover"
                alt={p.game.name}
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${p.game.cover.image_id}.jpg`}
              />
              <div key={i} className="cover-overlay">
                <strong>{p.game.name}</strong>
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
};

export default Popular;
