import  { api } from '../url';

// Post Issue
export function postIssue(params,request){
	const { token , data } = params;
	return new Promise((resolve,reject)=>{
		request(api.issues.root+'?access_token='+token,'POST',data)
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}
