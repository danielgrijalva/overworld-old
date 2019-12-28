import React from "react";
import { List, Image } from "semantic-ui-react";
import Moment from "react-moment";
import { StyledListDesc, StyledListHeader } from "./styles";

export const GameList = ({ games }) => {
  return (
    <List relaxed>
      {games.map(game => (
        <List.Item key={game.id}>
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_micro/${
              game.cover ? game.cover.image_id : "nocover_qhhlj6"
            }.jpg`}
          />
          <List.Content>
            <StyledListHeader as="a" href={`/games/${game.slug}/`}>
              {game.name}
            </StyledListHeader>
            <StyledListDesc>
              <Moment format="MMMM Do, YYYY">
                {game.first_release_date * 1000}
              </Moment>
            </StyledListDesc>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};
