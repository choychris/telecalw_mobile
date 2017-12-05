import { api } from '../url';

// Authentication Request
export function authRequest(userObj,request){
	return new Promise((resolve,reject)=>{
		request(api.users.auth, 'POST', userObj)
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Get User Basic Info request
export function userInfoRequest(params,request){
	const { userId , id } = params;
	return new Promise((resolve,reject)=>{
		request(api.users.root+'/'+userId+'?access_token='+id,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Get User Wallet 
export function userWallet(params,request){
	const { userId , id } = params;
	return new Promise((resolve,reject)=>{
		request(api.users.root+'/'+userId+'/wallet?access_token='+id,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
