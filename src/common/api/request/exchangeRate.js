import  { api } from '../url';

// Get Exchange Rate
export function getExchageRate(params,request){
	const { token } = params;
	return new Promise((resolve,reject)=>{
		request(api.exchangeRates.root+'?filter[where][status]=true&access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
