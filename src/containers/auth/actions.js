import { LoginManager , AccessToken , GraphRequest , GraphRequestManager } from 'react-native-fbsdk';
import { errorMessage ,loading } from '../utilities/actions';

export function loginFacebook(navigator){
	return (dispatch,getState)=>{
		LoginManager.logInWithReadPermissions(['public_profile','email']).then(
			(result)=>{
				if (result.isCancelled) {
					// *** For development purpose only , please remove this code when deploy to production
					//navigator.resetTo({
						//screen : 'app.GamePlayList',
						//navigatorStyle : {
							//navBarHidden : true
						//}
					//});
					// *** For development purpose only , please remove this code when deploy to production
					dispatch(authError(navigator,'facebookCancel','tryAgain'));
				} else {
					console.warn(JSON.stringify(result));
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
					async function authentication(url) {
						try {
							// Step 1 : Get Facebook Access Token
							const fbAccessTokenObj = await getFbAccessToken();
							console.warn(JSON.stringify(fbAccessTokenObj));
							// Step 2 : Use Grpah Api Request to Get User Info	
							const fbUserInfo = await getFbUserInfo();
							console.warn(JSON.stringify(fbUserInfo));
							// Step 3 : Form request object
							const now = new Date().getTime();	
							//const ttl = Math.round(face)
							console.warn(now);
							console.warn(fbAccessTokenObj.expirationTime);
							console.warn((fbAccessTokenObj.expirationTime) - now);
							// Step 4 : Post User Info to Loopback Backend
							navigator.resetTo({
								screen : 'app.GamePlayList',
								navigatorStyle : {
									navBarHidden : true
								}
							});
						}
						catch(e){
							console.warn(JSON.stringify(e));
							dispatch(authError(navigator,'facebookErr','tryAgain'));
						}
					}
					authentication();
				}
			},
			(error)=>{
				dispatch(authError(navigator,'facebookErr','tryAgain'));
			}
		)
	}
}

export function accessTokenChecking(){
	return (dispatch,getState)=>{
		// Access Token Mechanism
		// 1. If accessToken exist and valid , navigate to Gameplay Page
		// 2. If accessToken not valid , navigate to login page
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

export function fillSignUpForm(action,value){
	return (dispatch,getState)=>{
		// Filter Incorrect value
		return dispatch({ type : action , value });
	}
}

export function confirmSignUp(navigator){
	return (dispatch,getState)=>{
		const user = getState()['auth']['user'];
		if(
			user.address &&
			user.phone &&
			user.countryCode
		){
			// Handle the Signup Procedure to Backend
			//loading('show',navigator);
			//console.warn(JSON.stringify(user));
			navigator.resetTo({
				screen : 'app.GamePlayList',
				navigatorStyle : {
					navBarHidden : true
				}
			});
		} else {
			dispatch(authError(navigator,'formError','doubleCheckForm'));
		}
	}
}
