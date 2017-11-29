import { fromJS , toJS  } from 'immutable';

const initialState = {
	user : null,
	accessToken : null
}

function authReducer(state = initialState, action){
	state = fromJS(state);
	switch (action.type) {
		default:
		return state.toJS();
		break;
	}
}

export default authReducer;

