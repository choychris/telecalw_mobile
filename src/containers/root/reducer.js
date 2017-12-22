import { combineReducers } from 'redux';
import authReducer from '../auth/reducer';
import preferenceReducer from '../../common/reducers/preference';
import gameReducer from '../game/reducer';
import transactionReducer from '../transaction/reducers';

const rootReducer = combineReducers({
	auth : authReducer,
	preference : preferenceReducer,
	game : gameReducer,
	transaction : transactionReducer
});

export default rootReducer;

