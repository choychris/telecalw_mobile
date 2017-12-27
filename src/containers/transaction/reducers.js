import { fromJS , toJS } from 'immutable';

const initialState = {
	rates : [],
	rate : null
}

function transactionReducer (state = initialState, action){
	state = fromJS(state);
	switch(action.type){
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
		default:
			return state.toJS();
		break;
	}
}

export default transactionReducer;
