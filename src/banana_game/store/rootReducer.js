import { combineReducers } from 'redux';
import gameReducer from '../reducers/gameReducer';
import afterGameReducer from '../reducers/afterGameReducer';
import leaderboardReducer from '../reducers/leaderboardReducer';
import startGameReducer from '../reducers/startGameReducer';

const rootReducer = combineReducers({
  startGame: startGameReducer,
  game: gameReducer,
  afterGame: afterGameReducer,
  leaderboard: leaderboardReducer,
});

export default rootReducer;
