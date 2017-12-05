import { fromJS , toJS } from 'immutable';

const initialState = {
	tag : null,
	tags : [],
	list : {}
}

function gameReducer (state = initialState, action){
	state = fromJS(state);
	switch(action.type){
		case 'STORE_GAME_TAGS':
			return state
				.setIn(['tags'],action.value)
				.toJS();
		break;
		case 'STORE_PRODUCT_LIST':
			return state
				.setIn(['list'].concat(action.keys),action.value)
				.toJS();
		break;
		case 'SELECT_TAG':
			return state
				.setIn(['tag'],action.value)
				.toJS();
		break;
		default:
			return state.toJS();
		break;
	}
}

export default gameReducer;
