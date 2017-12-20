import  { api } from '../url';

// Post Game Result
export function gameResult(params,request){
	const { token , result , playId } = params;
	return new Promise((resolve,reject)=>{
		request(api.plays.root+'/'+playId+'?access_token='+token,'PATCH',result)
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
