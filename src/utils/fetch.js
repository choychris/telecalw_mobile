function request(url, method, body, header) {
	return new Promise((resolve, reject) => {
		let config = {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}			    
		}
		if(header) config.headers = header;
		if(method == 'POST' || method == 'PUT'){
			config.body = JSON.stringify(body);			    
		}
		fetch(url, config)
			.then((response)=>response.json())
			.then((responseData)=>resolve(responseData))
			.catch((error)=>reject(error));	  
	})
}

export default request;

