import { LoginManager } from 'react-native-fbsdk';
import { errorMessage } from '../utilities/actions';

export function loginFacebook(navigator){
	return (dispatch,getState)=>{
		LoginManager.logInWithReadPermissions(['public_profile']).then(
			(result)=>{
				if (result.isCancelled) {
					errorMessage(
						'show',
						navigator,
						{ 
							title : 'Facebook Login Cancel',
							message : 'Please Try again.'
						}
					);
				} else {
					// Sucessful Facebook Login Callback
					console.warn(JSON.stringify(result));
					alert('Login success with permissions: '+result.grantedPermissions.toString());
				}
			},
			(error)=>{
				errorMessage('show',navigator,{});
			}
		)
	}
}

export function accessTokenChecking(){
	return (dispatch,getState)=>{
	}
}
