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
	const { userId , token } = params;
	return new Promise((resolve,reject)=>{
		request(api.users.root+'/'+userId+'?access_token='+token,'GET')
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

// Get User Status
export function userStatus(params,request){
	const { userId , id } = params;
	return new Promise((resolve,reject)=>{
		request(api.users.root+'/'+userId+'?filter[fields][status]=true&access_token='+id,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Get User Language
export function userPreference(params,request){
	const { userId , id } = params;
	return new Promise((resolve,reject)=>{
		request(api.users.root+'/'+userId+'?filter[fields][language]=true&filter[fields][preference]=true&access_token='+id,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// User Logout
export function userLogout(params,request){
	const { id } = params;
	return new Promise((resolve,reject)=>{
		request(api.users.logout+'?access_token='+id,'POST')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Get User Reservation
export function userReservation(params,request){
	const { token , userId } = params;
	return new Promise((resolve,reject)=>{
		request(api.users.root+'/'+userId+'/reservation?access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Get User Transactions
export function userTransactions(params,request){
	const { token , userId } = params;
	const filter = {
		where:{
			success: true
		}, 
		order: "created DESC"
	};
	return new Promise((resolve,reject)=>{
		request(api.users.root+'/'+userId+'/transactions?filter='+JSON.stringify(filter)+'&access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Patch User / Udpate User
export function updateUser(params,request){
	const { token , data , userId } = params;
	return new Promise((resolve,reject)=>{
		request(api.users.root+'/'+userId+'?access_token='+token,'PATCH',data)
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
