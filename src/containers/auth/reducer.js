import { fromJS , toJS } from 'immutable';

const initialState = {
	user : {},
	accessToken : null
}

function authReducer(state = initialState, action){
	state = fromJS(state);
	switch (action.type) {
		case 'SIGNUP_ADDRESS':
			return state
				.setIn(['user','address'],action.value)
				.toJS()
		break;
		case 'SIGNUP_PHONE':
			return state
				.setIn(['user','phone'],action.value)
				.toJS()
		break;
		case 'SIGNUP_COUNTRY_CODE':
			return state
				.setIn(['user','countryCode'],action.value)
				.toJS()
		break;
		default:
		return state.toJS();
		break;
	}
}

export default authReducer;

