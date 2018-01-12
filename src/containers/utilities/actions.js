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
					backgroundBlur: "dark",
					backgroundColor : 'rgba(0, 0, 0, 0.6)',
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
				backgroundBlur: "dark",
				backgroundColor : 'rgba(0, 0, 0, 0.6)',
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
					backgroundBlur: "dark",
					backgroundColor : 'rgba(0, 0, 0, 0.6)',
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
