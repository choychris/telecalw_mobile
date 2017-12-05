import { AsyncStorage } from 'react-native';
import { LoginManager , AccessToken , GraphRequest , GraphRequestManager } from 'react-native-fbsdk';
import { errorMessage , loading } from '../utilities/actions';
import { authRequest, userInfoRequest, userWallet } from '../../common/api/request/user';
import Request from '../../utils/fetch';

function getFbAccessToken(){
	return AccessToken.getCurrentAccessToken().then((data)=>data);
}

function getFbUserInfo(){
	return new Promise((resolve,reject)=>{
		const infoRequest = new GraphRequest(
			'/me',
			{
				httpMethod: 'GET',
				version: 'v2.5',
				parameters: {
					'fields': {
						'string' : 'email,name'						        
					}	    
				}
			},
			(err,res)=>{
				(err) ? reject(err) : resolve(res);
			}
		);
		new GraphRequestManager().addRequest(infoRequest).start();	
	})
}

function formUserObj(fbAccessTokenObj,fbUserInfo,getState){
	const language = getState()['preference']['language']['locale'];
	let userObj = {
		provider : 'facebook',
		accessToken : fbAccessTokenObj.accessToken,
		username : fbUserInfo.name,
		userId : fbUserInfo.id,
		language : language
	};
	// Append user email if exist
	if(fbUserInfo.email) userObj.email = fbUserInfo.email;
	// Calculate Access Token TTL
	const now = new Date().getTime();	
	const ttl = Math.round((fbAccessTokenObj.expirationTime - now)/1000);
	userObj.expiresIn = ttl;
	return userObj;
}

async function authenticationFlow(dispatch,getState,navigator) {
	try {
		// Step 0 : Initiate Loading Buffer UI
		loading('show',navigator);
		// Step 1 : Get Facebook Access Token
		const fbAccessTokenObj = await getFbAccessToken();
		//console.warn(JSON.stringify(fbAccessTokenObj));
		
		// Step 2 : Use Grpah Api Request to Get User Info	
		const fbUserInfo = await getFbUserInfo();
		//console.warn(JSON.stringify(fbUserInfo));
		
		// Step 3 : Form request object
		const userObj = formUserObj(fbAccessTokenObj,fbUserInfo,getState);
		//console.warn(JSON.stringify(userObj)); 
		
		// Step 4 : Post User Info to Loopback Backend , dispatch response to local store
		const authRes = await authRequest(userObj,Request);
		//console.warn(JSON.stringify(res));
		const { result } = authRes;
		//console.warn(JSON.stringify(result));
		dispatch({ type : 'STORE_AUTH_TOKEN' , value : result });
		
		// Step 5 : Save in Local Storage of the Movile Device
		await AsyncStorage.setItem('token', JSON.stringify(result));	
		
		// Step 6 : Navigate to Gameplay List UI
		navigator.resetTo({
			screen : 'app.GamePlayList',
			navigatorStyle : {
				navBarHidden : true
			}
		});
	}
	catch(e){
		//console.warn(JSON.stringify(e));
		loading('hide',navigator);
		dispatch(authError(navigator,'facebookErr','tryAgain'));
	}
}

export function loginFacebook(navigator){
	return (dispatch,getState)=>{
		LoginManager.logInWithReadPermissions(['public_profile','email']).then(
			(result)=>{
				if (result.isCancelled) {
					dispatch(authError(navigator,'facebookCancel','tryAgain'));
				} else {
					//console.warn(JSON.stringify(result));
					authenticationFlow(dispatch,getState,navigator);
				}
			},
			(error)=>{
				dispatch(authError(navigator,'facebookErr','tryAgain'));
			}
		)
	}
}

function checkTokenExpire(token){

}

export function accessTokenChecking(){
	return (dispatch,getState)=>{
		async function checkLocalToken(){
			try {
				const localToken = await AsyncStorage.getItem('token');
				const checkToken = JSON.parse(localToken);
				console.warn(localToken);
				console.warn(checkToken);
				const tokeIsExpired = checkTokenExpire(checkToken);				
			}
			catch(e){

			}
		}
		checkLocalToken();
		// Access Token Mechanism
		// 1. If accessToken exist and valid , navigate to Gameplay Page
		// a. Check Token Expirations
		// b. Check User Latest Status from Loopback Backend API
		// 2. If accessToken not valid , navigate to login page
	}
}

export function getUserWallet(navigator){
	return (dispatch,getState)=>{
		const token = getState()['auth']['token'];
		async function walletRequest(){
			try {
				const walletRes = await userWallet(token.lbToken,Request);
				//console.warn(JSON.stringify(walletRes));
				dispatch({ type : 'STORE_WALLET_INFO' , value : walletRes  });
			}
			catch(e){
				dispatch(authError(navigator,'error','tryAgain'));
			}
		}		
		walletRequest();
	}
}

export function authError(navigator,title,message){
	return (dispatch,getState)=>{
		const { string } = getState()['preference']['language'];
		errorMessage(
			'show',
			navigator,
			{ 
				title : string[title],
				message : string[message]
			}
		);
	}
}


//export function fillSignUpForm(action,value){
	//return (dispatch,getState)=>{
		//// Filter Incorrect value
		//return dispatch({ type : action , value });
	//}
//}

//export function confirmSignUp(navigator){
	//return (dispatch,getState)=>{
		//const user = getState()['auth']['user'];
		//if(
			//user.address &&
			//user.phone &&
			//user.countryCode
		//){
			//// Handle the Signup Procedure to Backend
			////loading('show',navigator);
			////console.warn(JSON.stringify(user));
			//navigator.resetTo({
				//screen : 'app.GamePlayList',
				//navigatorStyle : {
					//navBarHidden : true
				//}
			//});
		//} else {
			//dispatch(authError(navigator,'formError','doubleCheckForm'));
		//}
	//}
//}
