import { api } from '../url';

// Get All Tag List
export function tagList(params,request){
	const { id } = params;
	return new Promise((resolve,reject)=>{
		request(api.tags.root+'?access_token='+id,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Get Tag Related Product
export function getTagProduct(params,request){
	const { token , tagId } = params;
	return new Promise((resolve,reject)=>{
		const filter = JSON.stringify({ 
			where : {
			 	'status.visible' : true
			}
		})
		request(api.tags.root+'/'+tagId+'/products?filter='+filter+'&access_token='+token,'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
