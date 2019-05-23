import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/users/user/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const login = (username, password) => dispatch => {
  axios
    .post("/api/users/login/", {
      username: username,
      password: password
    })
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: LOGIN_FAIL,
        payload: Object.values(error.response.data)
      });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/users/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const register = ({ email, username, password }) => dispatch => {
  axios
    .post("/api/users/register/", {
      email: email,
      username: username,
      password: password
    })
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: REGISTER_FAIL,
        payload: Object.values(error.response.data)
      });
    });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
