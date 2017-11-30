import { fromJS , toJS  } from 'immutable';
import { languageSetting } from '../constants/string';

const initialPrefernece = {
	language : { 
		locale : 'en',
		string : languageSetting('en')
 	},
	preference : {
		sound : true,
		vibration : true
	}
};

function preferenceReducer(state = initialPrefernece , action){
		state = fromJS(state);
		switch(action.type){
			case 'SET_LANGUAGE':
				return state
					.setIn(['language','locale'],action.value)
					.setIn(['language','string'],languageSetting(action.value))
					.toJS()
			break;
			default:
				return state.toJS();
			break;												  
		}
}

export default preferenceReducer;

