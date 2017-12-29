import Request from '../../utils/fetch';
import { getWinResult } from '../../common/api/request/play';

export function winResult(){
	return(dispatch,getState)=>{
		const { userId , id } = getState()['auth']['token']['lbToken'];
		const filter = {
			where : { 
				finalResult : true,
				userId : userId
	 		},
			include : 'product',
			order : 'ended DESC'
		};
		const params = {
			token : id,
			filter : filter
		};
		getWinResult(params,Request)
			.then((res,err)=>{
				//console.warn(JSON.stringify(res));
				//console.warn(JSON.stringify(err));
				return dispatch({ type : 'STORE_PLAYS' , value : res });
			})
			.catch((err)=>{
				console.warn(JSON.stringify(err));
			})
	}
}

export function selectPlay(productId){
	return(dispatch,getState)=>{
		return(dispatch(
			{
				type : 'SELECT_PLAY',
				value : {
					id : productId
				}
			}
		))
	}
}

export function unselectPlay(productId){
	return (dispatch,getState)=>{
		return(dispatch(
			{
				type : 'UNSELECT_PLAY',
				value : productId
			}
		));
	}
}
