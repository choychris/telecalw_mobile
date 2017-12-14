import { api } from '../url';

// Initiate Claw MAchine through Gizwits
export function initiate(params,request){
	const { did , appId , userToken , value } = params;
	return new Promise((resolve,reject)=>{
		request(
				api.gizwits.control+'/'+did,
				'POST',
				{ 
					attrs : { 
						InitCatcher : value
					} 
				},
				{  
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'X-Gizwits-Application-Id' : appId ,
					'X-Gizwits-User-token' : userToken
				})
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Control Claw Machine through Gizwits
export function control(params,request){
	const { did , appId , userToken , value , direction } = params;
	return new Promise((resolve,reject)=>{
		request(
				api.gizwits.control+'/'+did,
				'POST',
				{ 
					attrs : { 
						[direction] : value 
					} 
				},
				{  
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'X-Gizwits-Application-Id' : appId ,
					'X-Gizwits-User-token' : userToken
				})
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
