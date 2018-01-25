import { Platform , Dimensions } from 'react-native';
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
				flex : 1,
				height : Dimensions.get('window').height,
				backgroundBlur: "dark",
				backgroundColor : (Platform.OS === 'ios') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)',
				tapBackgroundToDismiss: false
			}
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
