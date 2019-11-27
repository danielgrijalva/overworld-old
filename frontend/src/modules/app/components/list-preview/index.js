import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const ListPreview = ({ games }) => (
  <div className="list-preview">
    <Link className="list-link" to="/">
      <ul className="cover-list overlapped">
        {games.slice(0, 5).map(g => {
          return (
            <li key={g.igdb} className="cover-list-item">
              <div className="list-cover-wrapper">
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${g.cover_id}.jpg`}
                  alt={g.name}
                  className="cover"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </Link>
  </div>
);

export default ListPreview;
