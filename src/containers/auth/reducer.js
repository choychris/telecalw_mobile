import { fromJS , toJS } from 'immutable';

const initialState = {
	user : {},
	token : {},
	wallet : {},
	reservation : {}
}

function authReducer(state = initialState, action){
	state = fromJS(state);
	switch (action.type) {
		case 'STORE_AUTH_TOKEN':
			return state
				.setIn(['token'],action.value)
				.toJS();
		break;
		case 'STORE_USER_INFO':
			return state
				.setIn(['user'],action.value)
				.toJS();
		break;
		case 'STORE_WALLET_INFO':
			return state
				.setIn(['wallet'],action.value)
				.toJS();
		break;
		case 'UPDATE_WALLET_BALANCE':
			return state
				.setIn(['wallet','balance'],action.value)
				.toJS();
		break;
		case 'UPDATE_RESERVATION':
			return state
				.setIn(['reservation'],action.value)
				.toJS();
		break;
		case 'USER_ADDRESS':
			return state
				.setIn(['user','address'],action.value)
				.toJS()
		break;
		case 'USER_PHONE':
			return state
				.setIn(['user','phone'],action.value)
				.toJS()
		break;
		case 'USER_COUNTRY_CODE':
			return state
				.setIn(['user','countryCode'],action.value)
				.toJS()
		break;
		case 'USER_POSTAL_CODE':
			return state	
				.setIn(['user','postalCode'],action.value)
				.toJS()
		break;
		default:
			return state.toJS();
		break;
	}
}

export default authReducer;

