import axios from "axios";
import { GET_POPULAR, GET_BACKDROP } from "./types";

export const getPopular = () => dispatch => {
  axios
    .get("/api/games/popular/")
    .then(res => {
      dispatch({
        type: GET_POPULAR,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getBackdrop = gameId => dispatch => {
  axios.get(`/api/games/backdrop/${gameId}`).then(res => {
    const data = res.data[0];
    const backdrop = {
      name: data.name,
      gameId: data.id,
      imageId: data.screenshots[1].image_id,
      slug: data.slug
    };

    dispatch({
      type: GET_BACKDROP,
      payload: backdrop
    });
  });
};
