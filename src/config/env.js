export function baseApi(){
	const devMode = 'local';
	// There are three types of backend environment
	// 1. Production Server
	// 2. Local Server
	// 3. Development Server
	const backendApi = {
		production : "https://api.teleclawapi.live/api",
		local : "http://192.168.1.139:3000/api",
		development : "http://teleclawbackendapi-staging.ap-southeast-1.elasticbeanstalk.com/api"
	};
	return (__DEV__) ? backendApi[devMode] : backendApi['production'];
}

export function pusherConfig(){
	return (__DEV__) ? { 
		key : '0094cc321ae56ee8aa56',
		cluster : 'ap1',
		encrypted : true
	} : { 
		key : '7fbd034f7c175d877b05',
		cluster : 'ap1',
		encrypted : true
	};
}

export function webrtcUrl(){
	//return 'https://webrtc-streamer.herokuapp.com';
	return 'http://webrtcstreamer-env.ap-southeast-1.elasticbeanstalk.com'
}

export function gizwitsUrl(){
	return 'https://api.gizwits.com/app/';
}

export function segmentKey(){
	return (__DEV__) ? '6615xgSmJFb9OrBuywhtCwYgJ47YdYSf' : 'nCcd1t1DAQPkeFwe1IWIRoQzOUY9QNC6';
}

export function serverlessUrl(){
	return 'https://quw8838zec.execute-api.ap-southeast-1.amazonaws.com/prod'
}
