import { combineReducers } from 'redux';
import authReducer from '../auth/reducer';
import preferenceReducer from '../../common/reducers/preference';

const rootReducer = combineReducers({
	auth : authReducer,
	preference : preferenceReducer
});

export default rootReducer;

