import { LoginManager } from 'react-native-fbsdk';
import { errorMessage } from '../utilities/actions';

export function loginFacebook(navigator){
	return (dispatch,getState)=>{
		LoginManager.logInWithReadPermissions(['public_profile']).then(
			(result)=>{
				// ***** Temp logic for development , please move this to new user callback ****
				navigator.resetTo({
					screen : 'app.Signup',
					navigatorStyle : {
						navBarHidden : true
					}
				});
				// ***** Temp logic for development , please move this to new user callback ****
				if (result.isCancelled) {
					dispatch(authError(navigator,'facebookCancel','tryAgain'));
				} else {
					// Sucessful Facebook Login Callback
					console.warn(JSON.stringify(result));
					alert('Login success with permissions: '+result.grantedPermissions.toString());
					// Success UI callback :
					// 1. If new user , navigate to Signup Page
					// 2. In user exist , navigate to Gameplay Page
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
