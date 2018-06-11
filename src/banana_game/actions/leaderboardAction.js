const mockData = [
  {
    rank: 1, name: 'Chris', points: 60, plays: 2, self: true,
  },
  {
    rank: 2, name: 'Amy', points: 57, plays: 1,
  },
  {
    rank: 3, name: 'Mary', points: 50, plays: 2,
  },
  {
    rank: 4, name: 'Tom', points: 44, plays: 2,
  },
  {
    rank: 5, name: 'Peter', points: 30, plays: 1,
  },
  {
    rank: 6, name: 'Jeff', points: 29, plays: 1,
  },
];

export const getRankData = currentPeriod =>
  (dispatch) => {
    if (currentPeriod) {
      setTimeout(() => {
        const players = 20;
        // const currentTime = new Date().getTime();
        // const endTime = currentTime + 86400000;
        dispatch({
          type: 'RANK_DATA',
          data: mockData,
          timeLeft: 86400,
          totalPlayer: players,
        });
      }, 3000);
    }
  };

export default null;

