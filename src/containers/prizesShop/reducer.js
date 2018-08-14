const initialState = {
  prizes: [],
};

const prizeCenterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRIZES_LIST':
      return {
        ...state,
        prizes: action.value,
      };
    default:
      return state;
  }
};

export default prizeCenterReducer;
