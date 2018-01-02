import { fromJS , toJS } from 'immutable';

const initialState = {
	plays : [],
	play : [],
	logistic : {
		target : 'user',
		quotes : [],
		quote : null
	},
	issue : {
		type : 'gameAppeal'
	}
}

function misReducer (state = initialState, action){
	state = fromJS(state);
	switch(action.type){
		case 'STORE_PLAYS':
			return state
				.setIn(['plays'],action.value)
				.toJS();
			break;
		case 'SELECT_PLAY':
			return state
				.updateIn(['play'],array=>array.push(action.value))
				.toJS();
			break;
		case 'UNSELECT_PLAY':
		 	return state
				.updateIn(['play'],array=>{
					return array.filter((data)=>{
						if(data.getIn(['playId']) != action.value){
							return data;
						}		                
					})
				})
				.toJS();
		break;
		case 'RESET_DELIVERY':
			return state
				.setIn(['play'],[])
				.setIn(['logistic'],{   
					target :'user',
					quotes : [],
					quote : null
				})
				.toJS();
		break;
		case 'CHANGE_LOGISTIC_TARGET':
			return state
				.setIn(['logistic','target'],action.value)
				.toJS();
		break;
		case 'LOGISTIC_ADDRESS':
			return state
				.setIn(['logistic','address'],action.value)
				.toJS()
		break;
		case 'LOGISTIC_PHONE':
			return state
				.setIn(['logistic','phone'],action.value)
				.toJS()
		break;
		case 'LOGISTIC_COUNTRY_CODE':
			return state
				.setIn(['logistic','countryCode'],action.value)
				.toJS()
		break;
		case 'LOGISTIC_POSTAL_CODE':
			return state	
				.setIn(['logistic','postalCode'],action.value)
				.toJS()
		break;
		case 'STORE_QUOTES':
			return state
				.setIn(['logistic','quotes'],action.value)
				.toJS()
		break;
		case 'SELECT_ISSUE_TYPE':
			return state
				.setIn(['issue','type'],action.value)
				.toJS()
		break;
		case 'SELECT_QUOTE':
			return state
				.setIn(['logistic','quote'],action.value)
				.toJS()
		break;
		default:
			return state.toJS();
		break;
	}
}

export default misReducer;
