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

export const navigateGame = (start, navigator) =>
  (dispatch, getState) => {
    if (start) {
      const { coins } = getState().bananaGame.startGame;
      const { gameId } = getState().game;
      const { token, wallet } = getState().auth;
      const { userId, id } = token.lbToken;
      loading('show', navigator);
      newGame(userId, gameId, coins, id)
        .then((res) => {
          console.log(res);
          if (res.response === 'insufficient balance') {
            loading('hide', navigator);
            insufficientFundMessage(navigator);
          } else {
            dispatch({
              type: 'START_GAME',
              start,
              trialId: res.response.trialId,
            });
            loading('hide', navigator);
            dispatch({
              type: 'UPDATE_WALLET_BALANCE',
              value: (wallet.balance - coins),
            });
          }
        })
        .catch((err) => {
          loading('hide', navigator);
          errorMessage('show', navigator);
          console.log(err);
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
