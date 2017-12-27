import Request from '../../utils/fetch';
import { getPaymentToken , createSales } from '../../common/api/request/transaction';
import { getExchageRate } from '../../common/api/request/exchangeRate';
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
		const { rate } = getState()['transaction'];
		if(rate !== null){
			const params = {
				token : id,
				userId : userId
			};
			getPaymentToken(params,Request)
				.then((res,err)=>{
					console.warn(JSON.stringify(res.result));
					//console.warn(JSON.stringify(err));
					BTClient.setup(res.result[0]);
					BTClient.showPaymentViewController({}).then(function(nonce) {
						//payment succeeded, pass nonce to server
						//console.warn('Nonce')
						console.warn(JSON.stringify(nonce));	
						console.warn(rate);
						
						const data = {
							token : id,
							userId : userId,
							data : {
								rateId : rate,
								paymentNonce : res.result[0]
							}
						};

						createSales(data,Request)
							.then((res,err)=>{
								console.warn(JSON.stringify(res.result));
								console.warn(JSON.stringify(err));
							})
						.catch((err)=>{
							console.warn(err);
						})


					})
					.catch((err)=>{
						console.warn(err)
					});
				})
		}
	}
}

export function exchangeRate(){
	return (dispatch,getState)=>{
		const { userId , id } = getState()['auth']['token']['lbToken'];
		const params = { token : id };
		getExchageRate(params,Request)
			.then((res,err)=>{
				console.warn(JSON.stringify(res));
				//console.warn(JSON.stringify(err));
				return dispatch({ type : 'STORE_RATES' , value : res });	
			})
			.catch(function(err) {
				console.warn(err)
			});
	}
}
