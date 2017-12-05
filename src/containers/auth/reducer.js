import { fromJS , toJS } from 'immutable';

const initialState = {
	user : {},
	token : {},
	wallet : {}
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
		//case 'SIGNUP_ADDRESS':
			//return state
				//.setIn(['user','address'],action.value)
				//.toJS()
		//break;
		//case 'SIGNUP_PHONE':
			//return state
				//.setIn(['user','phone'],action.value)
				//.toJS()
		//break;
		//case 'SIGNUP_COUNTRY_CODE':
			//return state
				//.setIn(['user','countryCode'],action.value)
				//.toJS()
		//break;
		default:
		return state.toJS();
		break;
	}
}

export default authReducer;

