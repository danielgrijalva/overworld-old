import React, { useState, useEffect} from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { ListLoader } from "../app/components";
import { GameList } from "../frontpage/components";

export const Developer = (props) => {
  const [games, setGames] = useState({});

  useEffect(() => {
    axios
      .get("/api/games/company/" + props.match.params.creator)
      .then(res => setGames(res.data));
  }, []);

  return (
    <Container>
      <h1>Games Created By Creator Name</h1>
      {Object.keys(games).length > 0 ? (
        <GameList games={games} />
      ) : (
        <ListLoader />
      )}
    </Container>
  );
};
