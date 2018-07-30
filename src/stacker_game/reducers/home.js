const initialState = {
  start: false,
  winners: null,
  trialId: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STACTER_START':
      return {
        ...state,
        start: !state.start,
        trialId: action.trialId,
      };
    case 'STACKER_WINNERS':
      return {
        ...state,
        winners: action.winners,
      };
    case 'STACKER_NEW_TRIAL':
      return {
        ...state,
        trialId: action.trialId,
      };
    default:
      return state;
  }
};

export default homeReducer;
