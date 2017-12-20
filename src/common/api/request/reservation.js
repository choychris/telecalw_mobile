import  { api } from '../url';

// End Game Engage
export function endGameEngage(params,request){
	const { token , machineId } = params;
	return new Promise((resolve,reject)=>{
		request(api.reservations.root+'/'+machineId+'/endEngage?access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
