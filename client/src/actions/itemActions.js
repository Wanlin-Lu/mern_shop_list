import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  fetch("/api/items")
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((data) => {
      dispatch({
        type: GET_ITEMS,
        payload: data,
      });
    })
    .catch((err) => {
      const status = err.status;
      err.json().then((errorMessage) => {
        dispatch(returnErrors(errorMessage.msg, status));
      });
    });
};

export const addItem = item => (dispatch, getState) => {
  fetch("/api/items", {
    method: "POST",
    body: JSON.stringify(item),
    headers: tokenConfig(getState),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((data) => {
      dispatch({
        type: ADD_ITEM,
        payload: data,
      });
    })
    .catch((err) => {
      const status = err.status;
      err.json().then((errorMessage) => {
        dispatch(returnErrors(errorMessage.msg, status));
      });
    });
}

export const deleteItem = id => (dispatch, getState) => {
  fetch(`/api/items/${id}`, {
    method: "DELETE",
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
        type: DELETE_ITEM,
        payload: id,
      });
    })
    .catch((err) => {
      const status = err.status;
      err.json().then((errorMessage) => {
        dispatch(returnErrors(errorMessage.msg, status));
      });
    });
}


export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}