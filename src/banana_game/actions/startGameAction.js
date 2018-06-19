import { newGame } from '../../common/api/request/miniGame/playGame';
import {
  loading,
  insufficientFundMessage,
  errorMessage,
} from '../../containers/utilities/actions';

const changeItem = (id, coins) =>
  ({
    type: 'ITEM_PRESS',
    item: id,
    coins,
  });

export const toggleItem = (id, coins) =>
  (dispatch) => {
    dispatch(changeItem(id, coins));
  };

export const navigateGame = (start, gameId, navigator) =>
  (dispatch, getState) => {
    const { coins } = getState().bananaGame.startGame;
    const { userId, id } = getState().auth.token.lbToken;
    if (start) {
      loading('show', navigator);
      newGame(userId, gameId, coins, id)
        .then((res) => {
          console.log(res);
          if (res.response === 'insufficient balance') {
            loading('hide', navigator);
            insufficientFundMessage(navigator);
          } else {
            loading('hide', navigator);
            setTimeout(() => {
              dispatch({
                type: 'START_GAME',
                start,
                trialId: res.response.trialId,
              });
            }, 600);
          }
        })
        .catch((err) => {
          loading('hide', navigator);
          errorMessage('show', navigator);
          console.warn(err);
        });
    } else {
      dispatch({
        type: 'START_GAME',
        start,
        trialId: null,
      });
    }
  };

export default null;
