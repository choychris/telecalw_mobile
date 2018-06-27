const initialState = {
  rankData: null,
  timeLeft: null,
  totalPlayer: null,
  weekHigh: [],
  weekWinners: [],
  showBoard: false,
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
    case 'WEEKLY_DATA':
      return {
        ...state,
        weekHigh: action.weekHigh,
        weekWinners: action.weekWinners,
      };
    case 'VIEW_BOARD':
      return {
        ...state,
        showBoard: action.open,
      };
    case 'CLEAR_DATA':
      return {
        ...state,
        rankData: null,
        timeLeft: null,
        totalPlayer: null,
      };
    default:
      return state;
  }
};

export default Reducer;
