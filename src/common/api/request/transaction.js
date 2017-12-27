import  { api } from '../url';

// Get Payment Token
export function getPaymentToken(params,request){
	const { token , userId } = params;
	return new Promise((resolve,reject)=>{
		request(api.transactions.root+'/'+userId+'/clientToken?access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Engage Transaction Sales
export function createSales(params,request){
	const { token , userId , data } = params;
	return new Promise((resolve,reject)=>{
		request(api.transactions.root+'/'+userId+'/createSale?access_token='+token,'POST',{ data : data })
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Get User Transactions
export function getTransactions(params,request){
	const { token , userId } = params;
	return new Promise((resolve,reject)=>{
		request(api.transactions.root+'?filter[where][userId]='+userId+'&filter[order]=created%20DESC&access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
