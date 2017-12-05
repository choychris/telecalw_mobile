function request(url, method, body) {
	return new Promise((resolve, reject) => {
		let header = {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'											      
			}			    
		}
		if(method == 'POST' || method == 'PUT'){
			header.body = JSON.stringify(body);			    
		}
		fetch(url, header)
			.then((response)=>response.json())
			.then((responseData)=>resolve(responseData))
			.catch((error)=>reject(error));	  
	})
}

export default request;

