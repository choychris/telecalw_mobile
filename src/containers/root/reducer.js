import { combineReducers } from 'redux';
import authReducer from '../auth/reducer';
import preferenceReducer from '../../common/reducers/preference';
import gameReducer from '../game/reducer';
import transactionReducer from '../transaction/reducers';
import misReducer from '../miscellaneous/reducers';
import BananaGameReducer from '../../banana_game/store/rootReducer';
import StackerGameReducer from '../../stacker_game/store/rootReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  preference: preferenceReducer,
  game: gameReducer,
  transaction: transactionReducer,
  mis: misReducer,
  bananaGame: BananaGameReducer,
  stackerGame: StackerGameReducer,
});

export default rootReducer;

