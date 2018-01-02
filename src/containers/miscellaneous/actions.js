import Request from '../../utils/fetch';
import { getWinResult } from '../../common/api/request/play';
import { getDeliveryQuote , postDelivery } from '../../common/api/request/delivery';

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

export function selectPlay(playId,productId){
	return(dispatch,getState)=>{
		return(dispatch(
			{
				type : 'SELECT_PLAY',
				value : {
					playId : playId,
					id : productId
				}
			}
		))
	}
}

export function unselectPlay(playId){
	return (dispatch,getState)=>{
		return(dispatch(
			{
				type : 'UNSELECT_PLAY',
				value : playId
			}
		));
	}
}

export function fillLogisticForm(field,value){
	return (dispatch,getState)=>{
		let action = '';
		const target = getState()['mis']['logistic']['target'];
		//console.warn(target);
		if(target === 'user'){
			action += 'USER_';			
		} else if(target === 'logistic') {
			action += 'LOGISTIC_'
		}
		action += field;
		//console.warn(action);
		// Filter Incorrect value
		return dispatch({ type : action , value : value });
	}
}

export function changeLogisticTarget(value){
	return (dispatch,getState)=>{
		dispatch({
			type : 'CHANGE_LOGISTIC_TARGET',
			value : value
		})
	}
}

export function getLogisticQuote(nextState){
	return (dispatch,getState)=>{
		const logistic = getState()['mis']['logistic'];
		const { target } = logistic;
		let data = {};
		let valid = false;
		if(target === 'user'){
			const user = getState()['auth']['user'];
		  valid = (user.address && user.phone && user.countryCode && user.postalCode) ? true : false;
			data.postalCode = user.postalCode;
			data.countryCode = user.countryCode.toUpperCase();
		} else if (target === 'logistic'){
		  valid = (logistic.address && logistic.phone && logistic.countryCode && logistic.postalCode) ? true : false;
			data.postalCode = logistic.postalCode;
			data.countryCode = logistic.countryCode.toUpperCase();
		}
		//console.warn(valid);
		if(valid === true){
			const play = getState()['mis']['play'];
			const { id } = getState()['auth']['token']['lbToken'];
			data.products = play;
			//console.warn(JSON.stringify(play));
			//console.warn(JSON.stringify(data));
			getDeliveryQuote({
				token : id,
				data : data
			},Request)
				.then((res,err)=>{
					//console.warn(JSON.stringify(res));
					//console.warn(JSON.stringify(err));
					if(!err){
						const { result } = res;
						dispatch({
							type : 'STORE_QUOTES',
							value : result
						});
						nextState();
					} else {

					}
				});
		} else {

		}
	}
}

export function confirmDelivery(){
	return (dispatch,getState)=>{
		// Step 1 : Check Wallet Balance and Quote Method is Selected
		const { balance } = getState()['auth']['wallet'];
		const logistic = getState()['mis']['logistic'];
		const { target , quote } = logistic
		if(quote !== null && balance >= quote.coins_value){
			const { id , userId } = getState()['auth']['token']['lbToken'];
			const play = getState()['mis']['play'];
			// Step 2 : Post Delivery Request to Backend
			let data = {
				address : {},
				cost : quote.coins_value,
				status : 'pending',
				userId : userId,
				products : play	,
				courier : quote
			};
			const user = getState()['auth']['user'];
			//console.warn(JSON.stringify(user));
			//console.warn(JSON.stringify(logistic));
			if(target === 'user'){
				data.address.postalCode = user.postalCode;
				data.address.countryCode = user.countryCode.toUpperCase();
				data.address.line1 = user.address;
				data.address.name = user.name;
				data.address.phone = user.phone;
			} else if(target === 'logistic'){
				data.postalCode = logistic.postalCode;
				data.countryCode = logistic.countryCode.toUpperCase();
			}
			console.warn(JSON.stringify(data));
			postDelivery(
				{  
					token : id ,
					data : data
				},
				Request
			)
				.then((res,err)=>{
					console.warn(JSON.stringify(res));
					console.warn(JSON.stringify(err));
				})
				.catch((err)=>{
					console.warn(JSON.stringify(err));
				});
		}
	}
}

export function resetLogistic(){
	return (dispatch,getState)=>{
		return dispatch({
			type : 'RESET_DELIVERY'
		})
	}
}

export function selectIssueType(value){
	return(dispatch,getState)=>{
		return dispatch({
			type : 'SELECT_ISSUE_TYPE',
			value : value
		})
	}
}

export function selectQuote(quote){
	return(dispatch,getState)=>{
		return dispatch({
			type : 'SELECT_QUOTE',
			value : quote
		})
	}
}
