import { types } from '../reducers/Reducer';
import APIURL from '../constants/APIURL';

export const updateUserInfo = (data) => ({
  type: types.UPDATE_USER_INFO,
  payload: data,
});

export const updateTechnologies = (data) => ({
  type: types.UPDATE_TECHNOLOGIES,
  payload: data,
});

export const test = (data) => ({
  type: types.TEST
});

export const deleteNote = (data) => ({
  type: types.DELETE_NOTE,
  payload: data,
});

export const allCategories = (data) => ({
  type: types.ALL_CATEGORIES,
  payload: data,
});

export const makeNewNote = (data) => ({
  type: types.MAKE_NEW_NOTE,
  payload: data,
});

// thunk to get notes from DB
export const getNotes = (userId) => {
  return dispatch => {
    fetch(APIURL + `/technology/notes?id=${userId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json",
        "Access-Control-Allow-Origin" : "*"
      },
      mode: "cors"
    })
    .then(res => res.json())
    .then(data => dispatch(updateTechnologies(data.technologies)))
    .catch(err => console.log(err));
  }
} 