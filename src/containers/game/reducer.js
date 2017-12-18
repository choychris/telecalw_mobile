import { fromJS , toJS } from 'immutable';

const initialState = {
	tag : null,
	tags : [],
	product : null,
	products : {},
	machine : null,
	machines : [],
	network : null,
	play : { 
		timer : null,
		cameraMode : 'front',
		webrtcUrl : {},
		lastAction : null
	}
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
				.toJS();
		break;
		case 'UPDATE_MACHINE_STATUS':
			return state
				.setIn(['machine','status'],action.value.status)
				.setIn(['machine','reservation'],action.value.reservation)
				.toJS()
		break;
		case 'UPDATE_VIEWS':
			return state
				.setIn(['machine','views'],action.value)
				.toJS();
		break;
		case 'UPDATE_TIMER':
			return state
				.setIn(['play','timer'],action.value)
				.toJS();
		break;
		case 'SWITCH_CAMERA_MODE':
			return state
				.setIn(['play','cameraMode'],action.value)
				.toJS();
		break;
		case 'STORE_WEBRTC_URL':
			return state
				.setIn(['play','webrtcUrl'].concat(action.keys),action.value)
				.toJS();
		break;
		case 'CLEAR_WEBRTC_URL':
			return state
				.setIn(['play','webrtcUrl'],{})
				.toJS();
		break;
		case 'LAST_PLAY_ACTION':
			return state
				.setIn(['play','lastAction'],action.value)
				.toJS();
		break;
		default:
			return state.toJS();
		break;
	}
}

export default gameReducer;
