import  { api } from '../url';

// Get Delivery Quote
export function getDeliveryQuote(params,request){
	const { token , data } = params;
	return new Promise((resolve,reject)=>{
		request(api.deliveries.root+'/getRate?access_token='+token,'POST',{ data : data })
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Post Delivery
export function postDelivery(params,request){
	const { token , data } = params;
	return new Promise((resolve,reject)=>{
		request(api.deliveries.root+'/new?access_token='+token,'POST',{ data : data })
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Get Delivery
export function getDelivery(params,request){
	const { token , deliveryId } = params;
	return new Promise((resolve,reject)=>{
		request(api.deliveries.root+'/'+deliveryId+'?access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
