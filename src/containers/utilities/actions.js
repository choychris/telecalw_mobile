import { Platform , Dimensions } from 'react-native';
const DeviceInfo = require('react-native-device-info');
import Request from '../../utils/fetch';
import { releaseChecking } from '../../common/api/request/version';

export function errorMessage(action,navigator,data,time){
	let callback;
	if(action === 'show'){
		callback = ()=>{
			navigator.showLightBox({
				screen : 'app.Error',
				animationType : 'slide-up',
				navigatorStyle: {
					navBarHidden: true
				},
				passProps : data,
				style: {
					flex: 1,
					height : Dimensions.get('window').height,
					backgroundBlur: "dark",
					backgroundColor : (Platform.OS === 'ios') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)',
					tapBackgroundToDismiss: true
				}
			});
		};
	} else {
		callback = ()=>{
			navigator.dismissLightBox({
				animationType : 'slide-down'
			})
		}
	}
	(time) ? setTimeout(()=>callback(),time) : callback();
}

export function loading (action,navigator){
	if(action === 'show'){
		navigator.showLightBox({
			screen : 'app.Loading',
			animationType : 'fade',
			navigatorStyle: {
				navBarHidden: true
			},
			style: {
				height : Dimensions.get('window').height,
				width : Dimensions.get('window').width,
				backgroundBlur: "dark",
				backgroundColor : (Platform.OS === 'ios') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)',
				tapBackgroundToDismiss: false
			},
			adjustSoftInput: "unspecified"
		});
	}
 	else if (action === 'hide'){
		navigator.dismissLightBox({
			animationType : 'fade'
		})
	}
}

export function message(action,navigator,data,time){
	let callback;
	if(action === 'show'){
		callback = ()=>{
			navigator.showLightBox({
				screen : 'app.Error',
				animationType : 'slide-up',
				navigatorStyle: {
					navBarHidden: true
				},
				passProps : data,
				style: {
					flex : 1,
					height : Dimensions.get('window').height,
					backgroundBlur: "dark",
					backgroundColor : (Platform.OS === 'ios') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)',
					tapBackgroundToDismiss: true
				}
			});
		};
	} else {
		callback = ()=>{
			navigator.dismissLightBox({
				animationType : 'slide-down'
			})
		}
	}
	(time) ? setTimeout(()=>callback(),time) : callback();
}

export function insufficientFundMessage(navigator){
	navigator.showLightBox({
		screen : 'app.InsufficientFund',
		animationType : 'slide-up',
		navigatorStyle: {
			navBarHidden: true
		},
		passProps : { navigator : navigator },
		style: {
			flex : 1,
			height : Dimensions.get('window').height,
			backgroundBlur: "dark",
			backgroundColor : (Platform.OS === 'ios') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)',
			tapBackgroundToDismiss: true,
			flex : 1
		}
	});
}

export function playMobileDataMessage(navigator){
  navigator.showLightBox({
    screen : 'app.PlayMobileData',
    animationType : 'slide-up',
    navigatorStyle: {
      navBarHidden: true
    },
    passProps : { navigator : navigator },
    style: {
      flex : 1,
      height : Dimensions.get('window').height,
      backgroundBlur: "dark",
      backgroundColor : (Platform.OS === 'ios') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)',
      tapBackgroundToDismiss: true,
      flex : 1
    }
  });
}

export function checkVersionRelease(){
	return (dispatch,getState)=>{
		const originVersion = DeviceInfo.getReadableVersion();
		const lastIndex = originVersion.lastIndexOf("."); 
		let formatVersion = `v${DeviceInfo.getReadableVersion().slice(0,lastIndex)}(${DeviceInfo.getBuildNumber()})`;
		//console.warn(Platform.OS);	
		//console.warn(DeviceInfo.getReadableVersion());
		//console.warn(formatVersion);
		//console.warn(lastIndex);
		if(Platform.OS === 'ios'){
			// Engage checking procedure
			releaseChecking({
				versionName : formatVersion
			},Request)
				.then((res,err)=>{
					//console.warn(err);
					//console.warn(JSON.stringify(res));
					if(!err && res.releaseStatus !== undefined){
						const releaseStatus = (res.releaseStatus === 'release') ? true : false;
						dispatch({
							type : 'STORE_VERSION',
							value : {
								version : formatVersion,
								release : releaseStatus
							}
						});
					}
				})
		} else if(Platform.OS === 'android'){
			dispatch({
				type : 'STORE_VERSION',
				value : {
					version : formatVersion,
					release : true
				}
			})
		}
	}
}
