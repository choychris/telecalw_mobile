import { LoginManager , AccessToken , GraphRequest , GraphRequestManager } from 'react-native-fbsdk';
import { errorMessage ,loading } from '../utilities/actions';

export function loginFacebook(navigator){
	return (dispatch,getState)=>{
		LoginManager.logInWithReadPermissions(['public_profile','email']).then(
			(result)=>{
				if (result.isCancelled) {
					// *** For development purpose only , please remove this code when deploy to production
					navigator.resetTo({
						screen : 'app.Signup',
						navigatorStyle : {
							navBarHidden : true
						}
					});
					// *** For development purpose only , please remove this code when deploy to production
					dispatch(authError(navigator,'facebookCancel','tryAgain'));
				} else {
					//console.warn(JSON.stringify(result));
					// Use Grpah Api Request to Get User Info	
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
							if(err){
								dispatch(authError(navigator,'facebookErr','tryAgain'));
							} else {
								console.warn(JSON.stringify(res));
								// Success UI callback :
								// 1. If new user , navigate to Signup Page
								// 2. In user exist , get access token , navigate to Gameplay Page
								navigator.resetTo({
									screen : 'app.Signup',
									navigatorStyle : {
										navBarHidden : true
									}
								});
							}
						}
					);
					new GraphRequestManager().addRequest(infoRequest).start();	
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
			loading('show',navigator);
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
