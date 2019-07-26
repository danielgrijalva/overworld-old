import axios from "axios";
import { GET_GAME_DATA, GET_POPULAR } from "./actionTypes";

export const getGameData = gameSlugs => dispatch => {
  //break the array into chunks of 10 and perform a request for each chunk
  while (gameSlugs.length > 0) {
    const slugs = gameSlugs.slice(0, 10);
    gameSlugs = gameSlugs.slice(10);
    axios
      .get("/api/games/multi", {
        params: {
          slugs: slugs.join(",")
        }
      })
      .then(res => {
        dispatch({
          type: GET_GAME_DATA,
          payload: res.data
        });
      });
  }
};

export const getPopular = (limit = 6, offset = 0, filters = {}) => dispatch => {
  axios
    .get("/api/games/popular/", {
      params: { limit: limit, offset: offset, filters: filters }
    })
    .then(res => {
      dispatch({
        type: GET_POPULAR,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
