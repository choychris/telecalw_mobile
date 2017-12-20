import  { api } from '../url';

// Engage Game Play
export function engageGamePlay(params,request){
	const { token , machineId , data } = params;
	return new Promise((resolve,reject)=>{
		request(api.machines.root+'/'+machineId+'/gamePlay?access_token='+token,'POST',{ data : data })
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
