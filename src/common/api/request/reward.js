import  { api } from '../url';

// Redeem Reward
export function redeemReward(params,request){
	const { token , data } = params;
	return new Promise((resolve,reject)=>{
		request(api.rewards.root+'/refer?access_token='+token,'POST',{ data : data })
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Checkin Reward
export function checkinReward(params,request){
	const { token , userId } = params;
	return new Promise((resolve,reject)=>{
		request(api.rewards.root+'/checkIn/'+userId+'?access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
