export const types = {
  SHOW_SAVED_NOTES: 'SHOW_SAVED_NOTES',
  CHANGE_MAIN: 'CHANGE_MAIN',
}

const uiState = {
  showSavedNotes: {
    display: false,
    techName: '',
    renders: 0  
  },
  mainPanel: '',
}

const uiReducer = (state = uiState, action) => {
  switch(action.type) {
    case types.SHOW_SAVED_NOTES:
      const techName = action.payload;
      if (techName === state.showSavedNotes.techName) {
        return state;
      } 
      return {
        ...state,
        mainPanel: 'user notes',
        showSavedNotes: {
          display: true,
          techName: techName,
          renders: state.showSavedNotes.renders + 1,  
        }
      }
    case types.CHANGE_MAIN:
      switch(action.payload) {
        case 'Add':
          return {
            ...state,
            mainPanel: 'add'
          }
        case 'search':
          return {
            ...state,
            mainPanel: 'search'
          }
        case 'new note':
          return {
            ...state,
            mainPanel: 'new note'
          }
        case 'saved notes':
          return {
            ...state,
            mainPanel: 'saved notes'
          }
      }
    default:
      return state;
  }
}

export default uiReducer;