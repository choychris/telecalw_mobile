const initialState = {
  sendingScore: false,
  scoreSaved: false,
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
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
