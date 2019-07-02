import axios from "axios";
import {
  LOAD_PROFILE,
  FOLLOW,
  UNFOLLOW,
  EDIT_PROFILE_SUCCESS,
  LOAD_JOURNAL
} from "./actionTypes";
import { tokenConfig } from "../app/actions";

export const loadProfile = username => (dispatch, getState) => {
  axios
    .get(`/api/users/profile/${username}`, tokenConfig(getState))
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

export const follow = username => (dispatch, getState) => {
  axios
    .post(`/api/users/follow/`, { username: username }, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: FOLLOW,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const unfollow = username => (dispatch, getState) => {
  axios
    .post(`/api/users/unfollow/`, { username: username }, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UNFOLLOW,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const editProfile = profile => (dispatch, getState) => {
  axios
    .post(
      `/api/users/profile/${profile.username}`,
      {
        username: profile.username,
        email: profile.email,
        location: profile.location,
        twitter: profile.twitter,
        bio: profile.bio
      },
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: EDIT_PROFILE_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const loadJournal = username => dispatch => {
  axios
    .get("/api/actions/journal/", {
      params: {
        username: username,
        limit: 10
      }
    })
    .then(res => {
      dispatch({
        type: LOAD_JOURNAL,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
