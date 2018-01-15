import { AsyncStorage , Vibration , Platform } from 'react-native';
import { LoginManager , AccessToken , GraphRequest , GraphRequestManager } from 'react-native-fbsdk';
import { errorMessage , loading } from '../utilities/actions';
import { authRequest, userWallet , userStatus , userLogout , userReservation , userInfoRequest , userLanguage , updateUser } from '../../common/api/request/user';
import { checkinReward } from '../../common/api/request/reward';
import { languageSetting } from '../../utils/language';
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
		
		// Step 4 : Post User Info to Loopback Backend 
		const authRes = await authRequest(userObj,Request);
		const { result } = authRes;
		//console.warn(JSON.stringify(res));
		//console.warn(JSON.stringify(result));
		
		// Step 5 : Save in Local Storage of the Movile Device
		await AsyncStorage.setItem('token', JSON.stringify(result));	
		
		// Step 6 : Dispatch response to local store , Navigate to Gameplay List UI
		dispatch(dispatchTokenAndNavigate(result,navigator));
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
					authenticationFlow(dispatch,getState,navigator);
				}
			},
			(error)=>{
				dispatch(authError(navigator,'facebookErr','tryAgain'));
			}
		)
	}
}

function dispatchTokenAndNavigate(token,navigator){
	return (dispatch,getState)=>{
		console.log(token);
		dispatch({ type : 'STORE_AUTH_TOKEN' , value : token });
		dispatch(getUserReservation());
		userLanguage(token['lbToken'],Request)
			.then((res,err)=>{
				//console.warn(JSON.stringify(res));
				//console.warn(JSON.stringify(err));
				if(!err) dispatch(languageSetting(res.language));
			});
			checkinReward(
				{
					userId : token['lbToken']['userId'],
					token : token['lbToken']['id'],
				},
				Request
			)
			.then((res,err)=>{
				//console.warn(JSON.stringify(err));
				//console.warn(JSON.stringify(res));
				if(!err){
					const { result } = res;
					if(result.success === true){
						dispatch({
							type : 'UPDATE_WALLET_BALANCE',
							value : result.newWalletBalance
						});
						setTimeout(()=>{
							navigator.showLightBox({
								screen : 'app.CheckinReward',
								animationType : 'slide-up',
								navigatorStyle: {
									navBarHidden: true
								},
								passProps : result,
								style: {
									backgroundBlur: "dark",
									backgroundColor : (Platform.OS === 'ios') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)',
									tapBackgroundToDismiss: true,
									flex : 1
								}
							});
							Vibration.vibrate(500);
						},3000);
					}
				}
			})
			.catch((err)=>{
				dispatch(authError(navigator,'error','tryAgain'));
			})
		updateUser(
			{
				userId : token['lbToken']['userId'],
				token : token['lbToken']['id'],
				data : {
					lastLogIn : new Date().getTime()
				},
			},
			Request
		)
			.then((res,err)=>{
				//console.warn(JSON.stringify(err));
				//console.warn(JSON.stringify(res));
				navigator.resetTo({
					screen : 'app.GamePlayList',
					navigatorStyle : {
						navBarHidden : true
					}
				});
			})
			.catch((err)=>{
				dispatch(authError(navigator,'error','tryAgain'));
			});
			
	}
}

function checkTokenExpire(token){
	const now = new Date().getTime();
	const tokenExpireDate = new Date(token.lbToken.created).getTime()+(token.lbToken.ttl*1000);
	//console.warn(now);
	//console.warn(tokenExpireDate);
	return (tokenExpireDate > now) ? true : false;
}


export function accessTokenChecking(navigator){
	return (dispatch,getState)=>{
		async function checkTokenFlow(){
			try {
				// Access Token Mechanism
				// 1. If accessToken exist and valid , navigate to Gameplay Page
				// a. Check Token Expirations
				// b. Check User Latest Status from Loopback Backend API
				// 2. If accessToken not valid , navigate to login page
			
				loading('show',navigator);
				
				const localToken = await AsyncStorage.getItem('token');
				//console.warn(localToken);
				if(localToken !== null){
					const checkToken = JSON.parse(localToken);
					const tokenIsNotExpired = checkTokenExpire(checkToken);				
					//console.warn(checkToken);
					//console.warn(tokenIsNotExpired);

					const userStatusRes = await userStatus(checkToken.lbToken,Request);
					//console.warn(JSON.stringify(userStatusRes));

					(tokenIsNotExpired === true && userStatusRes.status === true) ? 
						dispatch(dispatchTokenAndNavigate(checkToken,navigator)) : 
						dispatch(logout(checkToken.lbToken,navigator));
				} else {
					loading('hide',navigator);
				}
			}
			catch(e){
				loading('hide',navigator);
				dispatch(authError(navigator,'error','tryAgain'));
			}
		}
		checkTokenFlow();
	}
}

export function logout(token,navigator){
	return (dispatch,getState)=>{
		if(token === null || token === undefined) token = getState()['auth']['token']['lbToken'] ;
		async function logoutFlow(){
			try {
				// Step 1 : Clear Local Storage
				await AsyncStorage.clear();	
				// Step 2 : Deprecate Remote Backend Access Token
				userLogout(token,Request);				
				// Step 3 : Navigate to Login UI
				navigator.resetTo({
					screen : 'app.Auth',
					navigatorStyle : {
						navBarHidden : true
					}
				});
			}
			catch(e){
				dispatch(authError(navigator,'error','tryAgain'));
			}
		}	
		logoutFlow();	
	}
}

export function getUserWallet(navigator){
	return (dispatch,getState)=>{
		const token = getState()['auth']['token']['lbToken'];
		async function walletRequestFlow(){
			try {
				const walletRes = await userWallet(token,Request);
				//console.warn(JSON.stringify(walletRes));
				dispatch({ type : 'STORE_WALLET_INFO' , value : walletRes  });
			}
			catch(e){
				dispatch(authError(navigator,'error','tryAgain'));
			}
		}		
		walletRequestFlow();
	}
}

export function getUserReservation(){
	return (dispatch,getState)=>{
		const lbToken = getState()['auth']['token']['lbToken'];
		const { id , userId } = lbToken;
		//console.warn(JSON.stringify(lbToken));
		userReservation({
			token : id,
			userId : userId
		},Request)
		.then((res,err)=>{
			delete res['userId'];
			delete res['created'];
			//console.warn(JSON.stringify(res));
			//console.warn(JSON.stringify(err));
			if(!err){
				dispatch({
					type : 'UPDATE_RESERVATION',
					value : res
				})			
			} else {

			}
		});
	}
}

export function getUserInfo(){
	return (dispatch,getState)=>{
		const lbToken = getState()['auth']['token']['lbToken'];
		const { id , userId } = lbToken;
		userInfoRequest({
			token : id,
			userId : userId
		},Request).then((res,err)=>{
			if(!err){
				//console.warn(JSON.stringify(res))
				dispatch({
					type : 'STORE_USER_INFO',
					value : res
				});
			}
		});
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

