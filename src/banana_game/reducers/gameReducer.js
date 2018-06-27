// import { merge } from 'immutable';

const initialState = {
  positionList: [],
  numberList: [],
  traceNumberList: [],
  level: 1,
  ascending: true,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MAKE_BANANAS':
      return {
        ...state,
        positionList: action.positionList,
        numberList: action.numberList.list,
        traceNumberList: action.numberList.list,
      };
    case 'NEXT_LEVEL':
      return {
        ...state,
        level: state.level + 1,
        positionList: action.positionList,
        numberList: action.numberList.list,
        traceNumberList: action.numberList.list,
        ascending: action.numberList.ascend,
      };
    case 'SHIFT_LIST':
      return {
        ...state,
        traceNumberList: state.traceNumberList.slice(1),
      };
    case 'CLEAR_LIST':
      return {
        ...state,
        positionList: [],
        numberList: [],
        traceNumberList: [],
        ascending: true,
      };
    default:
      return state;
  }
};

export default gameReducer;
