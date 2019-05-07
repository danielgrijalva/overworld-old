import React from "react";
import './Popular.css'

export const Popular = ({isLoading, popular}) => (
  <section className="popular margin-top-xs margin-bottom">
    {!isLoading ? (
      <React.Fragment>
        {popular.map(p => {
          return (
            <div className="cover-wrapper">
              <img
                key={p}
                className="cover"
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                  p.image_id
                }.jpg`}
              />
              <div className="cover-overlay">
                <strong>{p.name}</strong>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    ) : (
      <React.Fragment>
        {[...Array(6)].map(i => (
          <div key={i} className="placeholder" />
        ))}
      </React.Fragment>
    )}
  </section>
);
