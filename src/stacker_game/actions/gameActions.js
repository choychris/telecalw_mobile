import { rewards } from '../config/constants';
import { stackerGameSound } from '../../utils/sound';

const getRewards = amount => ({ type: 'STACKER_REWARD', amount });

export const next = () => (dispatch) => {
  dispatch({ type: 'NEXT_ROW' });
};

export const saveLastIndex = (lastIndex, rowNumber) => (dispatch, getState) => {
  const { rows } = getState().stackerGame.game;
  rows[rowNumber - 1].index = lastIndex;
  dispatch({
    type: 'LAST_INDEX',
    rows,
    lastIndex,
  });
  if (rowNumber === 4) {
    dispatch(getRewards(rewards.mini));
    dispatch(stackerGameSound('minor'));
  } else {
    dispatch(stackerGameSound('stack'));
  }
};

export const endGame = (lastIndex, rowNumber, major) => (dispatch, getState) => {
  const { rows } = getState().stackerGame.game;
  rows[rowNumber - 1].index = lastIndex;
  dispatch({
    type: 'END_STACKER_GAME',
    rows,
  });
  if (major) {
    dispatch(getRewards(rewards.major));
    dispatch(stackerGameSound('major'));
  }
};

export default null;
