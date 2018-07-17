const initialState = {
  start: false,
  history: false,
  how: false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STACTER_START':
      return {
        ...state,
        start: !state.start,
      };
    default:
      return state;
  }
};

export default homeReducer;
