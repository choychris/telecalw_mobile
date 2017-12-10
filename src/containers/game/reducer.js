import { fromJS , toJS } from 'immutable';

const initialState = {
	tag : null,
	tags : [],
	product : null,
	products : {},
	machine : null,
	machines : [],
	network : null
}

function gameReducer (state = initialState, action){
	state = fromJS(state);
	switch(action.type){
		case 'CHANGE_NETWORK_STATUS':
			return state
				.setIn(['network'],action.value)
				.toJS();
		break;
		case 'STORE_GAME_TAGS':
			return state
				.setIn(['tags'],action.value)
				.toJS();
		break;
		case 'SELECT_TAG':
			return state
				.setIn(['tag'],action.value)
				.toJS();
		break;
		case 'STORE_PRODUCT_LIST':
			return state
				.setIn(['products'].concat(action.keys),action.value)
				.toJS();
		break;
		case 'SELECT_PRODUCT':
			return state
				.setIn(['product'],action.value)
				.toJS();
		break;
		case 'STORE_MACHINE_LIST':
			return state
				.setIn(['machines'],action.value)
				.toJS();
		break;
		case 'SELECT_MACHINE':
			return state
				.setIn(['machine'],action.value)
				.toJS()
		break;
		default:
			return state.toJS();
		break;
	}
}

export default gameReducer;
