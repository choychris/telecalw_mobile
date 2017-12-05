import { combineReducers } from 'redux';
import authReducer from '../auth/reducer';
import preferenceReducer from '../../common/reducers/preference';
import gameReducer from '../game/reducer';

const rootReducer = combineReducers({
	auth : authReducer,
	preference : preferenceReducer,
	game : gameReducer
});

export default rootReducer;

