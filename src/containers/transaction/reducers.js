import { fromJS , toJS } from 'immutable';

const initialState = {
	rates : [
		// ------- Development Purpose Only -------//
		{ 
			coins : 60 , 
			bonus : 0 , 
			currency : { 
				usd : {   
					value : 8
				}  
			}  
		},
		{ 
			coins : 60 , 
			bonus : 0 , 
			currency : { 
				usd : {   
					value : 8
				}  
			}  
		},
		{ 
			coins : 300 , 
			bonus : 0 , 
			currency : { 
				usd : {   
					value : 8
				}  
			}  
		},
		{ 
			coins : 400 , 
			bonus : 0 , 
			currency : { 
				usd : {   
					value : 8
				}  
			}  
		}
		// ------- Development Purpose Only -------//
	],
	rate : null
}

function transactionReducer (state = initialState, action){
	state = fromJS(state);
	switch(action.type){
		case 'SELECT_RATE':
			return state
				.setIn(['rate'],action.value)
				.toJS();
			break;
		default:
			return state.toJS();
		break;
	}
}

export default transactionReducer;
