import { types } from '../Reducers/Reducer';

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