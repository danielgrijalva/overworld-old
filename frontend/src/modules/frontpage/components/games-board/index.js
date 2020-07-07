import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "semantic-ui-react";
import { ListLoader } from "../../../app/components";
import { SectionTitle } from "./styles";
import GameList from "../game-list";

const GamesBoard = () => {
  const [games, setGames] = useState({});

  useEffect(() => {
    axios.get("/api/games/frontpage").then(res => setGames(res.data));
  }, []);

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <SectionTitle>Recently Released Games</SectionTitle>
          {Object.keys(games).length > 0 ? (
            <GameList games={games.recents} />
          ) : (
            <ListLoader />
          )}
        </Grid.Column>
        <Grid.Column>
          <SectionTitle>Upcoming Games</SectionTitle>
          {Object.keys(games).length > 0 ? (
            <GameList games={games.upcoming} />
          ) : (
            <ListLoader />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default GamesBoard;
