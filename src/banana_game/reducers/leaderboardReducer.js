const initialState = {
  rankData: null,
  timeLeft: null,
  totalPlayer: null,
  weekHigh: [],
  weekWinners: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RANK_DATA':
      return {
        ...state,
        rankData: action.data,
        totalPlayer: action.totalPlayer,
        timeLeft: action.timeLeft,
      };
    default:
      return state;
  }
};

export default Reducer;
