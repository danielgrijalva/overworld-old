import axios from "axios";
import {
  LOAD_PROFILE,
  FOLLOW,
  UNFOLLOW,
  EDIT_PROFILE_SUCCESS,
  LOAD_JOURNAL,
  REFRESH_AVATAR,
  LOAD_RATINGS,
  LOAD_ACTIVITY
} from "./actionTypes";
import { tokenConfig } from "../app/actions";

export const loadProfile = username => async (dispatch, getState) => {
  try {
    let res = await axios.get(
      `/api/users/profile/${username}`,
      tokenConfig(getState)
    );
    dispatch({ type: LOAD_PROFILE, payload: res.data });
  } catch (error) {
    console.log(error);
  }
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

export const loadRatings = username => dispatch => {
  axios
    .get(`/api/users/profile/${username}/ratings`)
    .then(res => {
      dispatch({
        type: LOAD_RATINGS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const loadActivity = username => dispatch => {
  axios
    .get(`/api/users/profile/${username}/activity`, {
      params: {
        limit: 5
      }
    })
    .then(res => {
      dispatch({
        type: LOAD_ACTIVITY,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const refreshAvatar = username => (dispatch, getState) => {
  axios
    .post(
      `/api/users/profile/${username}`,
      {
        refreshAvatar: true
      },
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: REFRESH_AVATAR,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
