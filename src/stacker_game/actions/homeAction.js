export const switchGameState = () => (dispatch) => {
  dispatch({ type: 'STACTER_START' });
};

export const restartGame = () => (dispatch) => {
  dispatch({ type: 'STACTER_RESTART' });
};

export default null;
