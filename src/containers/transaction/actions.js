import Request from '../../utils/fetch';
import { getPaymentToken } from '../../common/api/request/transaction';
var BTClient = require('react-native-braintree-xplat');

export function selectRate(rate){
	return (dispatch,getState)=>{
		dispatch({
			type : 'SELECT_RATE',
			value : rate
		})
	}
}

export function payment(){
	return (dispatch,getState)=>{
		//console.warn('Engage Payment');
		const { userId , id } = getState()['auth']['token']['lbToken'];
		const params = {
			token : id,
			userId : userId
		};
		getPaymentToken(params,Request)
			.then((res,err)=>{
				//console.warn(JSON.stringify(res.result));
				//console.warn(JSON.stringify(err));
				BTClient.setup(res.result.clientToken[0]);
				BTClient.showPaymentViewController({}).then(function(nonce) {
					//payment succeeded, pass nonce to server
					console.warn('Nonce')
					console.warn(JSON.stringify(nonce));	
				})
				.catch(function(err) {
					console.warn(err)
				});
			})
	}
}
