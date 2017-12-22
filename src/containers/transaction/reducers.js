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
		}
		// ------- Development Purpose Only -------//
	],
	rate : null
}

function transactionReducer (state = initialState, action){
	state = fromJS(state);
	switch(action.type){
		default:
			return state.toJS();
		break;
	}
}

export default transactionReducer;
