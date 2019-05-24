import axios from "axios";
import { LOAD_GAME, CLEAR_GAME } from "./types";

export const loadGame = gameId => dispatch => {
  dispatch({
    type: CLEAR_GAME
  });
  axios
    .all([
      axios.get(`/api/games/${gameId}`),
      axios.get(`/api/screenshots/${gameId}`)
    ])
    .then(
      axios.spread((game, scr) => {
        game.data.results.screenshots = scr.data.results;

        dispatch({
          type: LOAD_GAME,
          gameId: gameId,
          payload: game.data.results
        });

        //   this.getCountry(game.data.results.developers[0].id);
        //   this.getCountry(game.data.results.publishers[0].id);
      })
    );
};
