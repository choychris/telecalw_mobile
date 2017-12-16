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

// WebScoket Initialize
export function websockeInitialize(params,ws){
	const { 
		appid , 
		uid , 
		token , 
		heartbeat_interval , 
		did ,
		machine_init
	} = params;
	const loginData = JSON.stringify({
		cmd: "login_req",
		data: {
			appid : appid,
			uid : uid,
			token : token,
			p0_type: "attrs_v4",
			heartbeat_interval : heartbeat_interval,
			auto_subscribe : false
		}
	});
	ws.send(loginData);
	const subData = JSON.stringify({
		cmd: "subscribe_req",
		data:[{
			did : did
		}]
	});
	const initData = JSON.stringify({
		cmd: "c2s_write",
		data : {
			did : did ,
			attrs : {
				InitCatcher : machine_init
			}
		}
	});
	ws.onmessage = e =>{
		const { data , cmd } = JSON.parse(e.data);	
		//console.warn(JSON.stringify(data));
		//console.warn(JSON.stringify(cmd));
		if(cmd === 'login_res' && data.success === true){
			ws.send(subData);
			ws.send(initData);
		} else {
			//login(params,ws);
		}
	 	if(cmd === 's2c_noti' && data.attrs.GameResult !== 0){
			console.warn(e.data);
		}
	}
	ws.onerror = e => {
		// an error occurred
		//console.warn(e.message);
	};

	ws.onclose = e => {
		// connection closed
		//console.warn(e.code, e.reason);
	};
}

// WebSocket Control 
export function websocketControl(params,ws){
	const { direction , value , did } = params;
	const controlData = JSON.stringify({
		cmd: "c2s_write",
		data : {
			did : did ,
			attrs : {
				[direction] : value
			}
		}
	});
	ws.send(controlData);
}

