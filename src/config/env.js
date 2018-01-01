export function baseApi(){
	const devMode = 'local';
	// There are three types of backend environment
	// 1. Production Server
	// 2. Local Server
	// 3. Development Server
	const backendApi = {
		production : "https://www.teleclawapi.com/api",
		local : "http://192.168.1.180:3000/api",
		development : "https://kiostech-pos-dev.herokuapp.com/api"
	};
	return (__DEV__) ? backendApi[devMode] : backendApi['production'];
}

export function pusherConfig(){
	return (__DEV__) ? { 
		key : '0094cc321ae56ee8aa56',
		cluster : 'ap1',
		encrypted : true
	} : { 
		key : '0094cc321ae56ee8aa56',
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
