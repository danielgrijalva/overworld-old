import axios from "axios";
import {
  TOGGLE_PLAYED,
  TOGGLE_LIKE,
  LOAD_ACTIONS,
  TOGGLE_BACKLOG,
  TOGGLE_WISHLIST,
  LOAD_RATING,
  RATE_GAME,
  ACTIONS_LOADING,
  RATING_LOADING
} from "./actionTypes";
import { tokenConfig } from "../app/actions";

export const loadActions = (gameId, name) => (dispatch, getState) => {
  dispatch({ type: ACTIONS_LOADING });
  axios
    .get(`/api/actions/`, {
      params: {
        igdb: gameId,
        name: name
      },
      headers: tokenConfig(getState).headers
    })
    .then(res => {
      dispatch({
        type: LOAD_ACTIONS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const logGame = (gameId, name) => (dispatch, getState) => {
  axios
    .post(
      "/api/actions/log/",
      {
        igdb: gameId,
        name: name
      },
      tokenConfig(getState)
    )
    .then(res => {
      if (res.data.hasOwnProperty("removedFromBacklog")) {
        dispatch({
          type: TOGGLE_BACKLOG,
          payload: { value: false }
        });
      }
      dispatch({
        type: TOGGLE_PLAYED,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const likeGame = (gameId, name) => (dispatch, getState) => {
  axios
    .post(
      "/api/actions/like/",
      {
        igdb: gameId,
        name: name
      },
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: TOGGLE_LIKE,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const addToBacklog = (gameId, name) => (dispatch, getState) => {
  axios
    .post(
      "/api/actions/backlog/",
      {
        igdb: gameId,
        name: name
      },
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: TOGGLE_BACKLOG,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const addToWishlist = (gameId, name) => (dispatch, getState) => {
  axios
    .post(
      "/api/actions/wishlist/",
      {
        igdb: gameId,
        name: name
      },
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: TOGGLE_WISHLIST,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const loadRating = gameId => (dispatch, getState) => {
  dispatch({ type: RATING_LOADING });
  axios
    .get(`/api/actions/ratings`, {
      params: {
        game: gameId
      },
      headers: tokenConfig(getState).headers
    })
    .then(res => {
      dispatch({
        type: LOAD_RATING,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const rate = (gameId, rating) => (dispatch, getState) => {
  axios
    .post(
      "/api/actions/ratings/",
      {
        game: gameId,
        rating: rating
      },
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: RATE_GAME,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
