import { api } from '../url';

// Get Product Related Machines and Camera
export function machineList(params,request){
	const { token , productId } = params;
	return new Promise((resolve,reject)=>{
		request(api.products.root+'/'+productId+'/machines?filter[include]=cameras&access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
