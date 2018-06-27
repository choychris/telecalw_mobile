import { reportScore, retry } from '../../common/api/request/miniGame/playGame';

const startSending = () =>
  (dispatch) => {
    dispatch({ type: 'SENDING_SCORE' });
  };

const saveScoreToDb = (score, resend) =>
  (dispatch, getState) => {
    if (resend) dispatch({ type: 'RESEND' });
    const { trialId } = getState().bananaGame.startGame;
    const { id } = getState().auth.token.lbToken;
    reportScore(trialId, score, id)
      .then(() => {
        dispatch({ type: 'SCORE_SAVED' });
      })
      .catch((err) => {
        dispatch({ type: 'SAVE_ERROR' });
        console.warn(err);
      });
  };

export const addTime = () =>
  (dispatch, getState) => {
    const { userId, id } = getState().auth.token.lbToken;
    retry(userId, 8, id);
  };

const reset = () =>
  (dispatch) => {
    // console.warn('reset');
    dispatch({ type: 'RESET_AFTERGAME' });
  };

export default {
  startSending,
  saveScoreToDb,
  reset,
};
