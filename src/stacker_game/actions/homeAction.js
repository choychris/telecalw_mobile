export const switchGameState = () => (dispatch) => {
  dispatch({ type: 'STACTER_START' });
};

export const restartGame = () => (dispatch) => {
  dispatch({ type: 'STACTER_RESTART' });
};

export const getWinHistory = () => (dispatch) => {
  const winners = [];
  for (let i = 0; i < 50; i += 1) {
    winners.push({
      key: Math.random(),
      name: 'COME ON JAMES',
      wins: 999,
    });
  }
  setTimeout(() => {
    dispatch({ type: 'STACKER_WINNERS', winners });
  }, 2000);
};

export default null;
