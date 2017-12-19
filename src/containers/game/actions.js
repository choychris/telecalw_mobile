import { NetInfo , Dimensions } from 'react-native';
import { errorMessage , loading } from '../utilities/actions';
import { tagList , getTagProduct } from '../../common/api/request/tag';
import { machineList } from '../../common/api/request/product';
import Request from '../../utils/fetch';
import { localPlanetImg } from '../../utils/images';
import Pusher from 'pusher-js/react-native';
import { pusherConfig } from '../../config/env';
import { api } from '../../common/api/url';
import { closeWebrtc } from '../../utils/webrtc';

async function loadGameListFlow(dispatch,getState,navigator){
	try {
		const token = getState()['auth']['token']['lbToken'];
		const { string } = getState()['preference']['language'];
		// Step 1 : Get Tag List From backend API
		const tags = await tagList(token,Request);	
		if(tags.length > 0){
			let initiatedTag = tags[0];
			initiatedTag.index = 0;
			dispatch({ 
				type : 'STORE_GAME_TAGS',
				value : tags
			});
			dispatch({
				type : 'SELECT_TAG',
				value : initiatedTag
			});
		// Step 2 : Get the Gamplay List ( Product List ) from the first tag
			const productList = await getTagProduct(
				{ 
					token : token.id ,   
					tagId : initiatedTag.id
				},Request);	
			dispatch({
				type : 'STORE_PRODUCT_LIST',
				keys : [initiatedTag.id],
				value : productList
			});
		}
		// Step 3 : Hide Loading Lightbox
		loading('hide',navigator);
	}
	catch(e){
		loading('hide',navigator);
		errorMessage(
			'show',
			navigator,
			{
				title : string['error'],
				message : string['tryAgain']
			}
		);
	}
}

export function loadGameList(navigator){
	return (dispatch,getState)=>loadGameListFlow(dispatch,getState,navigator);
}

export function switchTag(action){
	return (dispatch,getState)=>{
		const token = getState()['auth']['token']['lbToken'];
		const tags = getState()['game']['tags'];
		const currentTag = getState()['game']['tag'];
		const { index } = currentTag;
		const targetIndex = (action === 'next') ? index + 1 : index - 1;
		if(tags[targetIndex]){
			// Step 1 : Dispatch Selected Tag
			let targetTag = tags[targetIndex];
			targetTag.index = targetIndex;
			dispatch({
				type : 'SELECT_TAG',
				value :	targetTag 
			});
			// Step 2 : Update the Gameplay List
			getTagProduct({  
				token : token.id,
				tagId : targetTag.id
			},Request).then((res,err)=>{
				if(!err){
					dispatch({
						type : 'STORE_PRODUCT_LIST',
						keys : [targetTag.id],
						value : res
					});
				} else {
					errorMessage(
						'show',
						navigator,
						{
							title : string['error'],
							message : string['tryAgain']
						}
					);
				}
			});			
		}
	}
}

export function initiatePusher(userId,dispatch){
	Pusher.logToConsole = true;
	const { key , cluster , encrypted } = pusherConfig();
	// Dispatch Pusher to Local Store
	const pusher = new Pusher(key, {
		cluster: cluster,
		encrypted: encrypted,
		authEndpoint : api.users.root+'/'+userId+'/pusherAuth' 
	});

	dispatch({ type : 'STORE_PUSHER' , value : pusher });
	return pusher;
}

export function productStatus(){
	return (dispatch,getState)=>{

		// Step 1 : Initiate and Authenticate Pusher
		const userId = getState()['auth']['token']['lbToken']['userId'];
		const pusher = initiatePusher(userId,dispatch);
		console.log(userId);

		// Step 2 : Initiate Product Status Channel
		var channel = pusher.subscribe('products');
		channel.bind('statusChange', function(data) {
			//console.warn(JSON.stringify(data));
			const { productId , status } = data;
			const currentTag = getState()['game']['tag'];
			const products = getState()['game']['products'];
			if(currentTag !== null && products[currentTag.id]){
				let updateProductIndex = null
				products[currentTag.id].map((item,index)=>{
					if(item.id === productId) updateProductIndex = index;
				});
				if(updateProductIndex !== null){
					dispatch({ 
						type : 'STORE_PRODUCT_LIST',
						keys : [currentTag.id,updateProductIndex,'status'],
						value : status 
					});
				}
			}
		});

	}
}

export function machineStatus(action){
	return(dispatch,getState)=>{

		const machine = getState()['game']['machine'];
		const pusher = getState()['preference']['pusher'];

		if(action === 'start'){
			// Initiate Machine Status Channel
			var channel = pusher.subscribe('presence-machine-'+machine.id);
			channel.bind('machine_event', (data)=>{
				//console.warn(JSON.stringify(data));
				dispatch({ 
					type : 'UPDATE_MACHINE_STATUS' , 
					value : { status : data.status  , reservation : data.reservation }  
				});	
			});

			channel.bind('pusher:subscription_succeeded',(members)=>{
				dispatch({ type : 'UPDATE_VIEWS' , value : members.count });
			});

			channel.bind('pusher:member_added',(members)=>{
				const count = channel.members.count;
				dispatch({ type : 'UPDATE_VIEWS' , value : count });
			});

			channel.bind('pusher:member_removed', (member)=>{
				const count = channel.members.count;
				dispatch({ type : 'UPDATE_VIEWS' , value : count });
			});
		} else if (action === 'leave'){
			pusher.unsubscribe('presence-machine-'+machine.id);
		}
		
	}
}

export function networkChecking(navigator){
	return (dispatch,getState)=>{
		const { string } = getState()['preference']['language'];
		NetInfo.getConnectionInfo().then((connectionInfo) => {
			if(connectionInfo.type !== null) 
				dispatch({ type : 'CHANGE_NETWORK_STATUS' , value : true });
		});
		NetInfo.isConnected.addEventListener(
			'connectionChange',
			(isConnected)=>{
				dispatch({ type : 'CHANGE_NETWORK_STATUS' , value : isConnected });
				if(isConnected === false) 
					errorMessage('show',navigator,{ title : string['offline'] , message : string['internetProblem'] }) ;
			}
		);
	}
}

export function getPlanetImageSource(name,picture){
	if(localPlanetImg()[name]){
		return localPlanetImg()[name];
	} else if (picture) {
		return picture;
	} else {
		return null
	}
}

export function positioningItems(productList){
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;
	const positions = [
		{ x : -screenWidth/3 , y : -screenHeight*0.2 } ,
		{ x : 0 , y : -screenHeight*0.32 },
		{ x : screenWidth/3 , y : -screenHeight*0.3 },
		{ x : -screenWidth/3 , y : 0 },
		{ x : 0 , y : screenHeight*0.07 },
		{ x : screenWidth/3 , y : -screenHeight*0.1 }
	];
	productList.map((item,index)=>item.position = positions[index]);
	//console.warn(JSON.stringify(productList));
	return productList;
}

export function navigateToGameRoom(productId,status,navigator){
	return (dispatch,getState)=>{
		const token = getState()['auth']['token']['lbToken'];
		const tag = getState()['game']['tag'];
		const products = getState()['game']['products'];
		if(status === true){
			errorMessage(
				'show',
				navigator,
				{
					title : string['maintenance'],
					message : string['tryAgainLater']
				}
			);	
		} else {
			// Step 1 : Initiate Loading UI
			loading('show',navigator);
			// Step 2 : Dispatch Selected Product to Store
			let targetProduct = null;
			products[tag.id].map((product)=>{
				if(product.id == productId)	targetProduct = product;
			});
			dispatch({ 
				type : 'SELECT_PRODUCT' , 
				value : targetProduct
			});
			// Step 3 : Get Product Machine
			machineList(
				{ 
					productId : productId,
					token : token
				},
				Request
			).then((res,err)=>{
				if(!err){
					// Step 4 : Dispatch Machine List to Store
					dispatch({
						type : 'STORE_MACHINE_LIST',
						keys : [productId],
						value : res
				 	});	
					// Step 5 : Randomly Select a Target Machine
					const randomIndex = Math.floor(Math.random() * ((res.length - 1) - 0 + 1)) + 0;
					let targetMachine = res[randomIndex];
					res.map((machine)=>{
						if(machine.status === 'open') targetMachine = machine;
					});
					dispatch({
						type : 'SELECT_MACHINE',
						value : targetMachine
					});
					// Step 6 : Navigate tp Game Room UI
					navigator.push({
						screen : 'app.GameRoom',
						navigatorStyle : {
							navBarHidden : true
						}
					});
				} else {
					loading('hide',navigator);
					errorMessage(
						'show',
						navigator,
						{
							title : string['error'],
							message : string['tryAgain']
						}
					);
				}
			});
		}
	}
}

export function filterCamera(cameras,mode){
	let targetCamera = null;
	cameras.map((camera)=>{
		if(camera.position === mode) targetCamera = camera;
	});
	return targetCamera;
}

export function navigateToGamePlay(navigator){
	return (dispatch,getState)=>{
		navigator.resetTo({
			screen : 'app.GamePlay',
			navigatorStyle : {
				navBarHidden : true
			}
		});
	}
}

export function navigateToGamePlayList(navigator){
	navigator.resetTo({
		screen : 'app.GamePlayList',
		navigatorStyle : {
			navBarHidden : true
		}
	});
}

export function resetTimer(playTime){
	return(dispatch,getState)=>{
		const time = (playTime) ? playTime : null;
		dispatch({ 
			type : 'UPDATE_TIMER',
			value :	time
		});
	}
}

export function loadGamePlay(navigator){
	return(dispatch,getState)=>{
		
		navigator.showLightBox({
			screen : 'app.GameCountDown',
			animationType : 'fade',
			navigatorStyle: {
				navBarHidden: true
			},
			style: {
				backgroundBlur: "dark",
				backgroundColor : 'rgba(52, 52, 52, 0.1)',
				tapBackgroundToDismiss: false
			}
		});

	}
}

export function switchMode(setMode){
	return (dispatch,getState)=>{
		const cameraMode = getState()['game']['play']['cameraMode'];
		const mode = (setMode) ? setMode : ((cameraMode === 'top' ) ? 'front': 'top');
		dispatch({ type : 'SWITCH_CAMERA_MODE' , value : mode  })
	}
}

export function lastMachineMove(action){
	return (dispatch,getState)=>{
		dispatch({
			type : 'LAST_PLAY_ACTION',
			value : action
		});
	}
}

export function closeAllWebrtc(){
	return(dispatch,getState)=>{
		const { webrtcUrl } = getState()['game']['play'];
		const { front , top } = webrtcUrl;		
		closeWebrtc(front.pc,front.rtsp);
		closeWebrtc(top.pc,top.rtsp);
		dispatch({ type : 'CLEAR_WEBRTC_URL' });
	}
}

