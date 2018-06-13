const initialState = {
  addTime: false,
  positive: false,
  upOnly: false,
  coins: 20,
  startGame: false,
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
      };
    default:
      return state;
  }
};

export default startGameReducer;
