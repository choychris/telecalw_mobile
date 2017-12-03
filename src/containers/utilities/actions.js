export function errorMessage(action,navigator,data){
	if(action === 'show'){
		navigator.showLightBox({
			screen : 'app.Error',
			animationType : 'slide-up',
			navigatorStyle: {
				navBarHidden: true
			},
			passProps : data,
			style: {
				backgroundBlur: "dark",
				backgroundColor : 'rgba(52, 52, 52, 0.2)',
				tapBackgroundToDismiss: true
			}
		});
	} else {
		navigator.dismissLightBox({
			animationType : 'slide-down'
		})
	}
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
				backgroundBlur: "dark",
				backgroundColor : 'rgba(52, 52, 52, 0.2)',
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
