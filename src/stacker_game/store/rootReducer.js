import { combineReducers } from 'redux';
import gameReducer from '../reducers/game';
import homeControl from '../reducers/home';

const rootReducer = combineReducers({
  game: gameReducer,
  home: homeControl,
});

export default rootReducer;
