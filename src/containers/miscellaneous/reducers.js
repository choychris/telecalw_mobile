import { fromJS , toJS } from 'immutable';

const initialState = {
	plays : [],
	play : []
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
					array.filter((data)=>{
						if(data.getIn(['id']) != action.value){
							return data;
						}		                
					})
				})
				.toJS();
			break;
		default:
			return state.toJS();
		break;
	}
}

export default misReducer;
