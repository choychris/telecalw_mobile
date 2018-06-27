import RandomUtils from '../utils/randomUtil';

const banansInfo = (level, numberItem, sequenceItem) => ({
  type: 'MAKE_BANANAS',
  positionList: RandomUtils.generatePositionList(level, numberItem, sequenceItem),
  numberList: RandomUtils.getRandomNumberList(level, numberItem, sequenceItem),
});

const nextLevel = (level, numberItem, sequenceItem) => ({
  type: 'NEXT_LEVEL',
  positionList: RandomUtils.generatePositionList(level, numberItem, sequenceItem),
  numberList: RandomUtils.getRandomNumberList(level, numberItem, sequenceItem),
});

const getNewBananaSet = () =>
  (dispatch, getState) => {
    const { level } = getState().bananaGame.game;
    const { positive, upOnly } = getState().bananaGame.startGame;
    const lowest = positive ? 1 : null;
    dispatch(banansInfo(level, lowest, upOnly));
  };

const toNextLevel = () =>
  (dispatch, getState) => {
    const { level } = getState().bananaGame.game;
    const { positive, upOnly } = getState().bananaGame.startGame;
    const lowest = positive ? 1 : null;
    dispatch(nextLevel(level + 1, lowest, upOnly));
  };

const shiftList = () =>
  (dispatch) => {
    dispatch({ type: 'SHIFT_LIST' });
  };

const clearList = () =>
  (dispatch) => {
    dispatch({ type: 'CLEAR_LIST' });
  };

export default {
  getNewBananaSet,
  shiftList,
  toNextLevel,
  clearList,
};
