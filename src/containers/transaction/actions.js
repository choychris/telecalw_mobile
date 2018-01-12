import Request from '../../utils/fetch';
import { getPaymentToken , createSales, getTransactions } from '../../common/api/request/transaction';
import { userTransactions } from '../../common/api/request/user';
import { getExchangeRate } from '../../common/api/request/exchangeRate';
import { redeemReward } from '../../common/api/request/reward';
import { loading , message } from '../utilities/actions';
const BTClient = require('react-native-braintree-xplat');
import { ShareDialog } from 'react-native-fbsdk';

export function selectRate(rate){
	return (dispatch,getState)=>{
		dispatch({
			type : 'SELECT_RATE',
			value : rate
		})
	}
}

export function sales(nonce,rate,navigator){
	return (dispatch,getState)=>{
		//console.warn(JSON.stringify(nonce));	
		//console.warn(rate);
		const { userId , id } = getState()['auth']['token']['lbToken'];
		const { string } = getState()['preference']['language'];
		const params = {
			token : id,
			userId : userId,
			data : {
				rateId : rate,
				paymentNonce : nonce
			}
		};
		createSales(params,Request)
			.then((res,err)=>{
				//console.warn(JSON.stringify(res));
				//console.warn(JSON.stringify(err));
				loading('hide',navigator);
				if(!err){
					const { result } = res;
					if(result.success === true){
						message(
							'show',
							navigator,
							{ 
								type : 'happy',
								header : 'Ya!',
								title : string['successPurchase'],
								message : `${string['thankyou']}. ${string['newBalance']} : ${res.result.balance}`
							},
							500
						);
						dispatch(selectRate(null));
						return dispatch({
							type : 'UPDATE_WALLET_BALANCE',
							value : res.result.balance
						});
					} else {
						message(
							'show',
							navigator,
							{ 
								type : 'sick',
								title : string['error'],
								message : result.message
							},
							500
						);
					}
				}
			})
			.catch((err)=>{
				loading('hide',navigator);
				//console.warn(err);
				message(
					'show',
					navigator,
					{ 
						type : 'sick',
						title : string['error'],
						message : string['tryAgain']
					},
					500
				);
			})
	}
}

export function payment(navigator){
	return (dispatch,getState)=>{
		const { userId , id } = getState()['auth']['token']['lbToken'];
		const { string } = getState()['preference']['language'];
		const { rate } = getState()['transaction'];
		if(rate !== null){
			const params = {
				token : id,
				userId : userId
			};
			loading('show',navigator);
			getPaymentToken(params,Request)
				.then((res,err)=>{
					//console.warn(JSON.stringify(res.result));
					//console.warn(JSON.stringify(err));
					BTClient.setup(res.result).then(()=>{
						setTimeout(()=>{
							BTClient.showPaymentViewController({}).then((nonce)=>{
								//payment succeeded, pass nonce to server
								dispatch(sales(nonce,rate,navigator));	
							})
							.catch((err)=>{
								loading('hide',navigator);
								//console.warn(err)
								message(
									'show',
									navigator,
									{ 
										type : 'sick',
										title : string['error'],
										message : string['tryAgain']
									},
									500
								);
							});
						},5000)		
					});
			})
		} else {
			message(
				'show',
				navigator,
				{ 
					type : 'sick',
					title : string['error'],
					message : string['selectRate']
				}
			);
		}
	}
}

export function exchangeRate(navigator){
	return (dispatch,getState)=>{
		const { userId , id } = getState()['auth']['token']['lbToken'];
		const params = { token : id };
		loading('show',navigator);
		getExchangeRate(params,Request)
			.then((res,err)=>{
				//console.warn(JSON.stringify(res));
				//console.warn(JSON.stringify(err));
				loading('hide',navigator);
				return dispatch({ type : 'STORE_RATES' , value : res });	
			})
			.catch(function(err) {
				loading('hide',navigator);
				console.warn(err)
			});
	}
}

export function transactions(navigator){
	return (dispatch,getState)=>{
		const { userId , id } = getState()['auth']['token']['lbToken'];
		const params = {
			token : id,
			userId : userId
		};
		loading('show',navigator);
		userTransactions(params,Request)
			.then((res,err)=>{
				//console.warn(JSON.stringify(res));
				//console.warn(JSON.stringify(err));
				loading('hide',navigator);
				return dispatch({ type : 'STORE_TRANSACTIONS' , value : res });	
			})
			.catch(function(err) {
				loading('hide',navigator);
				console.warn(JSON.stringify(err));
			});
	}
}

export function shareToFacebook(shareLinkContent){
	return (dispatch,getState)=>{
		ShareDialog.canShow(shareLinkContent)
			.then(
				(canShow)=>{
					if (canShow) ShareDialog.show(shareLinkContent);   
				}	  
			)
			.then(
				(result)=>{
					console.warn(JSON.stringify(result));
						//if (result.isCancelled) {
							//alert('Share cancelled');
						//} else {
							//alert('Share success with postId: '
							//+ result.postId);
						//}	
				},
				(error)=>{

				}
			);
	}
}

export function inputRedeemCode(value){
	return (dispatch,getState)=>{
		return dispatch({
			type : 'STORE_REDEEM_CODE',
			value : value
		});
	}
}

export function confirmRedeem(){
	return(dispatch,getState)=>{
		const { reward } = getState()['transaction'];
		const { userId , id } = getState()['auth']['token']['lbToken'];
		if(reward && reward !== null){
			console.warn(reward);
			const data = {
				token : id,
				data : {
					userId : userId,
					code : reward
				}
			};
			redeemReward(data,Request)
				.then((res,err)=>{
					//console.warn(JSON.stringify(err));
					//console.warn(JSON.stringify(res));
					if(!err){
						const { result } = res;
						if(result.success === true){
							dispatch({
								type : 'STORE_REDEEM_CODE',
								value : null
							});
							dispatch({
								type : 'UPDATE_WALLET_BALANCE',
								value : result.newWalletBalance
							});
						} else {

						}
					}
				})
				.catch((err)=>{
					//console.warn(JSON.stringify(err));
				});
		}
	}
}


