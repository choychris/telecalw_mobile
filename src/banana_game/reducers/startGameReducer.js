const initialState = {
  addTime: false,
  positive: false,
  upOnly: false,
  coins: 15,
  startGame: false,
  trialId: null,
};

const startGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEM_PRESS':
      return {
        ...state,
        coins: state[action.item] ?
          (state.coins - action.coins) :
          (state.coins + action.coins),
        [action.item]: !state[action.item],
      };
    case 'START_GAME':
      return {
        ...state,
        startGame: action.start,
        trialId: action.trialId,
      };
    default:
      return state;
  }
};

export default startGameReducer;
