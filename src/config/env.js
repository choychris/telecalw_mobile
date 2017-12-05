export function baseApi(){
	const devMode = 'local';
	// There are three types of backend environment
	// 1. Production Server
	// 2. Local Server
	// 3. Development Server
	const backendApi = {
		production : "https://www.teleclawapi.com/api",
		local : "http://192.168.2.100:3000/api",
		development : "https://kiostech-pos-dev.herokuapp.com/api"
	};
	return (__DEV__) ? backendApi[devMode] : backendApi['production'];
}

