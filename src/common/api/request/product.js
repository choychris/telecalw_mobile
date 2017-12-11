import { api } from '../url';

// Get Product Related Machines and Camera
export function machineList(params,request){
	const { token , productId } = params;
	return new Promise((resolve,reject)=>{
		const filter = JSON.stringify({ 
			include : {
				relation : "cameras"
			}	
		});
		request(api.products.root+'/'+productId+'/machines?filter='+filter+'&access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
