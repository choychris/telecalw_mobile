const startSending = () =>
  (dispatch) => {
    dispatch({ type: 'SENDING_SCORE' });
  };

const saveScoreToDb = score =>
  (dispatch) => {
    setTimeout(() => {
      console.warn(score, 'score saved!');
      dispatch({ type: 'SCORE_SAVED' });
    }, 2000);
  };

const reset = () =>
  (dispatch) => {
    // console.warn('reset');
    dispatch({ type: 'RESET' });
  };

export default {
  startSending,
  saveScoreToDb,
  reset,
};
