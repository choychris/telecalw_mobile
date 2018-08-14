import moment from 'moment';
import { newGame, reportScore } from '../../common/api/request/miniGame/playGame';
import { fetchWinHistory } from '../../common/api/request/miniGame/leaderboard';
import {
  loading,
  insufficientFundMessage,
  errorMessage,
} from '../../containers/utilities/actions';
import { coins } from '../config/constants';

export const switchGameState = (start, navigator, animate) =>
  (dispatch, getState) => {
    if (start) {
      // hard coding 15 coins per play
      // const coins = 25;
      const { gameId } = getState().game;
      const { userId, id } = getState().auth.token.lbToken;
      loading('show', navigator);
      newGame(userId, gameId, coins, id)
        .then((res) => {
          // console.log(res);
          if (res.response === 'insufficient balance') {
            loading('hide', navigator);
            insufficientFundMessage(navigator);
            if (animate) animate.start();
          } else {
            loading('hide', navigator);
            dispatch({
              type: 'STACTER_START',
              trialId: res.response.trialId,
            });
            if (animate) animate.start();
          }
        })
        .catch((err) => {
          loading('hide', navigator);
          if (animate) animate.start();
          errorMessage('show', navigator);
          console.log(err);
        });
    } else {
      dispatch({
        type: 'STACTER_START',
        trialId: null,
      });
      if (animate) animate.start();
    }
  };

export const restartGame = (navigator, animate, callback) =>
  (dispatch, getState) => {
    if (navigator) {
      // const coins = 15;
      const { gameId } = getState().game;
      const { userId, id } = getState().auth.token.lbToken;
      loading('show', navigator);
      newGame(userId, gameId, coins, id)
        .then((res) => {
          // console.log(res);
          if (res.response === 'insufficient balance') {
            loading('hide', navigator);
            insufficientFundMessage(navigator);
          } else {
            loading('hide', navigator);
            dispatch({ type: 'STACTER_RESTART' });
            dispatch({
              type: 'STACKER_NEW_TRIAL',
              trialId: res.response.trialId,
            });
            if (animate) animate.start();
            if (callback) callback();
          }
        })
        .catch((err) => {
          loading('hide', navigator);
          errorMessage('show', navigator);
          console.log(err);
        });
    } else {
      dispatch({ type: 'STACTER_RESTART' });
    }
  };

export const saveGameSore = () =>
  (dispatch, getState) => {
    const { win } = getState().stackerGame.game;
    if (win > 0) {
      const { id } = getState().auth.token.lbToken;
      const { trialId } = getState().stackerGame.home;
      reportScore(trialId, win, id);
    }
  };

export const getWinHistory = () =>
  (dispatch, getState) => {
    // const winners = [];
    // for (let i = 0; i < 50; i += 1) {
    //   winners.push({
    //     key: Math.random(),
    //     name: 'COME ON JAMES',
    //     wins: 999,
    //   });
    // }
    const { id } = getState().auth.token.lbToken;
    const filter = {
      where: {
        gameId: 'B0001',
        created: {
          gt: moment().startOf('isoWeek'),
        },
        score: {
          gt: 0,
        },
      },
      order: 'score DESC',
    };
    fetchWinHistory(id, JSON.stringify(filter))
      .then((res) => {
        console.log(res);
        dispatch({ type: 'STACKER_WINNERS', winners: res });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export default null;
