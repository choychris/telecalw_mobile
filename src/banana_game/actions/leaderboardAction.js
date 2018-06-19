import { getSelfRank } from '../../common/api/request/miniGame/leaderboard';

export const getRankData = (gameId, currentPeriod) =>
  (dispatch, getState) => {
    const { userId, id } = getState().auth.token.lbToken;
    const period = currentPeriod ? 'current' : 'last';
    getSelfRank(gameId, userId, period, id)
      .then((res) => {
        console.log(res.response);
        const { result, endTime, totalPlayer } = res.response;
        const currentTime = new Date().getTime();
        const timeLeft = Math.floor((endTime - currentTime) / 1000);
        dispatch({
          type: 'RANK_DATA',
          data: result,
          timeLeft,
          totalPlayer,
        });
      });
  };

export default null;

