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
