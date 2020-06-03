import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  fetch("/api/items")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      dispatch({
        type: GET_ITEMS,
        payload: data,
      });
    });
};

export const addItem = item => dispatch => {
  fetch("/api/items", {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "Content-Type": "application/json" },
  }).then(res => {
    return res.json()
  }
  ).then(data => {
    dispatch({
      type: ADD_ITEM,
      payload: data
    })
  })
}

export const deleteItem = id => dispatch => {
  fetch(`/api/items/${id}`, { method: "DELETE" }).then(res => {
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  })
}


export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}