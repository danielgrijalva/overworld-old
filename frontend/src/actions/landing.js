import axios from "axios";
import { GET_POPULAR, GET_BACKDROP } from "./types";

export const getPopular = () => dispatch => {
  axios
    .get("/api/popular/")
    .then(res => {
      // after fetching the list of popular games,
      // get covers for each one of them
      var games = res.data.map(p => `/api/igdb/cover/${p.cover}`);
      axios.all(games.map(l => axios.get(l))).then(
        axios.spread((...response) => {
          const covers = response.map(c => c.data[0].image_id);
          covers.map((c, i) => {
            return (res.data[i].image_id = c);
          });
          dispatch({
            type: GET_POPULAR,
            payload: res.data
          });
        })
      );
    })
    .catch(err => console.log(err));
};

export const getBackdrop = game => dispatch => {
  axios.get(`/api/screenshots/${game.gameId}`).then(res => {
    const data = res.data.results[0];
    const backdrop = {
      placeholder: data.thumb_url,
      actual: data.original_url,
      name: game.name,
      gameId: game.gameId
    };

    dispatch({
      type: GET_BACKDROP,
      payload: backdrop
    });
  });
};
