import  { api } from '../url';

// End Game Engage
export function endGameEngage(params,request){
	const { token , machineId , userId } = params;
	return new Promise((resolve,reject)=>{
		request(api.reservations.root+'/'+machineId+'/'+userId+'/endEngage?access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Cancel Reservation
export function cancelReserve(params,request){
	const { token , reservationId , data } = params;
	return new Promise((resolve,reject)=>{
		request(api.reservations.root+'/'+reservationId+'?access_token='+token,'PATCH',data)
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
