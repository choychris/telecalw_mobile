import { fromJS , toJS } from 'immutable';

const initialState = {
	rates : [],
	rate : null,
	transactions : [],
	reward : null
}

function transactionReducer (state = initialState, action){
	state = fromJS(state);
	switch(action.type){
		case 'STORE_TRANSACTIONS':
			return state
				.setIn(['transactions'],action.value)
				.toJS();
			break;
		case 'STORE_RATES':
			return state
				.setIn(['rates'],action.value)
				.toJS();
			break;
		case 'SELECT_RATE':
			return state
				.setIn(['rate'],action.value)
				.toJS();
			break;
		case 'STORE_REDEEM_CODE':
			return state
				.setIn(['reward'],action.value)
				.toJS();
			break;
		default:
			return state.toJS();
		break;
	}
}

export default transactionReducer;
