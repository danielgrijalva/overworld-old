import React from "react";
import {
  faXbox,
  faPlaystation,
  faSteam
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TileCoverLoader, TextLoader } from "../../../game/components";
import { Card } from "semantic-ui-react";
import Moment from "react-moment";


const GameTile = ({ game, key }) => {
  const getDeveloperName = companies => {
    if (companies) {
      var dev = companies.find(c => {
        return c.developer === true;
      });
      if (dev) return dev.company.name;
    }
    return "Not Found";
  };

  const getPlatformIcons = platforms => {
    return (
      <React.Fragment>
        {platforms.map(platform => {
          let icon = null;

          if (platform.name.includes("PC")) icon = faSteam;
          else if (platform.name.includes("Playstation")) icon = faPlaystation;
          else if (platform.name.includes("Xbox")) icon = faXbox;
          return <FontAwesomeIcon icon={icon} size={"sm"} />;
        })}
      </React.Fragment>
    );
  };

  if (game) {
    const description = game.summary ? game.summary.slice(0, 100) + "..." : "";

    const cover = game.cover
      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${
          game.cover.image_id
        }.jpg`
      : null; //TODO there should be a default cover if the API doesnt provide one

    const developer = game.involved_companies
      ? getDeveloperName(game.involved_companies)
      : null;

    const date = game.first_release_date ? (
      <Moment format="YYYY">{game.first_release_date * 1000}</Moment>
    ) : null;

    const header = game.name ? game.name : null;

    const platforms = game.platforms ? game.platforms : [];

    return (
      <Card
        className="game-card"
        image={cover}
        header={header}
        meta={developer && date}
        description={description}
        href={"/games/" + game.slug}
        key={key}
        extra={getPlatformIcons(platforms)}
      />
    );
  } else {
    return (
      <Card
        className="game-card"
        image={TileCoverLoader}
        description={TextLoader}
        key={key}
      />
    );
  }
};

export default GameTile