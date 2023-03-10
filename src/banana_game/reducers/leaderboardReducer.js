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
    case 'UPDATE_PLAYERCOUNT':
      return {
        ...state,
        totalPlayer: action.totalPlayer,
      };
    case 'CLEAR_RANK_DATA':
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
