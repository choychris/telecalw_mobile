import  { api } from '../url';

// Post Game Result
export function gameResult(params,request){
	const { token , result , playId } = params;
	return new Promise((resolve,reject)=>{
		request(api.plays.root+'/'+playId+'?access_token='+token,'PATCH',result)
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Get Winning Game Play Result
export function getWinResult(params,request){
	const { token , filter } = params;
	return new Promise((resolve,reject)=>{
		request(api.plays.root+'?filter='+JSON.stringify(filter)+'&access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Refund Mechanism
export function playRefund(params,request){
	const { token , userId } = params;
	return new Promise((resolve,reject)=>{
		request(api.plays.root+'/'+userId+'/refund?access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

