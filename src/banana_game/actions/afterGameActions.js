import { reportScore, retry, bonus } from '../../common/api/request/miniGame/playGame';

const startSending = () =>
  (dispatch) => {
    dispatch({ type: 'SENDING_SCORE' });
  };

export const saveScoreToDb = (score, resend) =>
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

export const addTime = coins =>
  (dispatch, getState) => {
    const { token, wallet } = getState().auth;
    const { userId, id } = token.lbToken;
    retry(userId, coins, id);
    dispatch({
      type: 'UPDATE_WALLET_BALANCE',
      value: (wallet.balance - coins),
    });
  };

export const scoreBonus = score =>
  (dispatch, getState) => {
    const { userId, id } = getState().auth.token.lbToken;
    const { gameId } = getState().game;
    bonus(userId, gameId, id)
      .then((res) => {
        console.log('res.response', res.response);
        if (res.response) {
          dispatch({ type: 'BOUNS_SCORE' });
        } else {
          dispatch(saveScoreToDb(score));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(saveScoreToDb(score));
      });
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
