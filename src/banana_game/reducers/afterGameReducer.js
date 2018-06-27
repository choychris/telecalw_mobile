const initialState = {
  sendingScore: false,
  scoreSaved: false,
  saveError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SENDING_SCORE':
      return {
        ...state,
        sendingScore: true,
      };
    case 'SCORE_SAVED':
      return {
        ...state,
        scoreSaved: true,
      };
    case 'SAVE_ERROR':
      return {
        ...state,
        saveError: true,
      };
    case 'RESEND':
      return {
        ...state,
        saveError: false,
      };
    case 'RESET_AFTERGAME':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
