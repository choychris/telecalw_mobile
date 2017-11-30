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
