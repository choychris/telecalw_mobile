const initialState = {
  start: false,
  winners: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STACTER_START':
      return {
        ...state,
        start: !state.start,
      };
    case 'STACKER_WINNERS':
      return {
        ...state,
        winners: action.winners,
      };
    default:
      return state;
  }
};

export default homeReducer;
