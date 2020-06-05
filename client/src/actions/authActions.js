import { returnErrors } from './errorActions'

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types'

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  fetch("/api/auth/user", {
    method: "GET",
    headers: tokenConfig(getState),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((json) => {
      dispatch({
        type: USER_LOADED,
        payload: json,
      });
    })
    .catch((err) => {
      const status = err.status
      err.json().then((errorMessage) => {
        dispatch(returnErrors(errorMessage.msg, status));
        dispatch({ type: AUTH_ERROR })
      });
    });
}

export const register = ({ name, email, password }) => dispatch => {
  const config = {
      'Content-Type': 'application/json'
  }
  const body = JSON.stringify({ name, email, password })
  fetch("/api/auth/register", {
    method: "POST",
    body: body,
    headers: config,
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((json) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: json,
      });
    })
    .catch((err) => {
      const status = err.status;
      err.json().then((errorMessage) => {
        dispatch(returnErrors(errorMessage.msg, status));
        dispatch({ type: REGISTER_FAIL });
      });
    });
}

export const login = ({ email, password }) => dispatch => {
  fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((json) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: json,
      });
    })
    .catch((err) => {
      const status = err.status;
      err.json().then((errorMessage) => {
        dispatch(returnErrors(errorMessage.msg, status));
        dispatch({ type: LOGIN_FAIL });
      });
    });
}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const tokenConfig = getState => {
  const token = getState().auth.token
  let config
  config = {
    'Content-Type': 'application/json'
  }

  if (token) {
    config = {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  }

  return config
}