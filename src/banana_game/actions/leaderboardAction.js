import { getSelfRank, getWeeklyRank } from '../../common/api/request/miniGame/leaderboard';

export const getRankData = currentPeriod =>
  (dispatch, getState) => {
    dispatch({ type: 'CLEAR_RANK_DATA' });
    const { userId, id } = getState().auth.token.lbToken;
    const { gameId } = getState().game;
    const period = currentPeriod ? 'current' : 'last';
    getSelfRank(gameId, userId, period, id)
      .then((res) => {
        // console.log(res.response);
        const { result, endTime, totalPlayer } = res.response;
        const currentTime = new Date().getTime();
        const timeLeft = Math.floor((endTime - currentTime) / 1000);
        dispatch({
          type: 'RANK_DATA',
          data: result,
          timeLeft,
          totalPlayer,
        });
      })
      .catch((error) => {
        dispatch({ type: 'RANK_DATA', data: [] });
        console.log(error);
      });
  };

export const getWeeklyBest = () =>
  (dispatch, getState) => {
    dispatch({ type: 'CLEAR_RANK_DATA' });
    const { id } = getState().auth.token.lbToken;
    const { gameId } = getState().game;
    getWeeklyRank(gameId, id)
      .then((res) => {
        // console.log('res.response', res.response);
        // const { allWinner, weeklyTopThree } = res.response;
        dispatch({
          type: 'RANK_DATA',
          data: res.response,
          // weekHigh: weeklyTopThree,
          // weekWinners: allWinner,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const clearData = () =>
  (dispatch) => {
    dispatch({ type: 'CLEAR_RANK_DATA' });
  };

export const viewLeaderBoard = open =>
  (dispatch) => {
    dispatch({ type: 'VIEW_BOARD', open });
  };

export default null;

