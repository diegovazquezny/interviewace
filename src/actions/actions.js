import * as types from '../reducers/actionTypes';

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