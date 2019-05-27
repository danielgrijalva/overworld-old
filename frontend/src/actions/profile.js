import axios from "axios";
import { LOAD_PROFILE } from "./types";
import { tokenConfig } from "./auth";

export const loadProfile = () => (dispatch, getState) => {
  axios
    .get("/api/users/profile/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOAD_PROFILE,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
