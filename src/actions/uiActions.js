import { types } from '../Reducers/uiReducer';

export const showSavedNotes = (data) => ({
  type: types.SHOW_SAVED_NOTES,
  payload: data
});

export const changeMain = (data) => ({
  type: types.CHANGE_MAIN,
  payload: data
});