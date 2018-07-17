import rand from 'lodash/random';
import { rowNum, boxNum } from '../config/constants';

function rowList(num) {
  const row = [];
  for (let i = 0; i < num; i += 1) {
    let size;
    if (i < 4) {
      size = 1;
    } else if (i < 8) {
      size = 2;
    } else if (i < 10) {
      size = 3;
    } else {
      size = 4;
    }
    row.push({ size, index: rand(1, boxNum - size) });
  }
  return row;
}

const initialState = {
  rows: rowList(rowNum),
  activeRow: rowNum,
  lastIndex: null,
  win: 0,
  end: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_ROW': {
      return {
        ...state,
        end: false,
      };
    }
    case 'LAST_INDEX': {
      return {
        ...state,
        lastIndex: action.lastIndex,
        rows: action.rows,
        activeRow: state.activeRow - 1,
      };
    }
    case 'STACKER_REWARD': {
      return {
        ...state,
        win: action.amount,
      };
    }
    case 'END_STACKER_GAME': {
      return {
        ...state,
        end: true,
        rows: action.rows,
      };
    }
    case 'STACTER_RESTART': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
