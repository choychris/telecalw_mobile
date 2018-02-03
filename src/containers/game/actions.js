import { NetInfo , Dimensions , Platform } from 'react-native';
import { errorMessage , loading, insufficientFundMessage } from '../utilities/actions';
import { tagList , getTagProduct } from '../../common/api/request/tag';
import { machineList , getProduct } from '../../common/api/request/product';
import { engageGamePlay } from '../../common/api/request/machine';
import { gameResult } from '../../common/api/request/play';
import { endGameEngage , cancelReserve } from '../../common/api/request/reservation';
import { checkinReward } from '../../common/api/request/reward';
import { playUISound } from '../../utils/sound';
import Request from '../../utils/fetch';
import { localPlanetImg } from '../../utils/images';
import Pusher from 'pusher-js/react-native';
import { pusherConfig } from '../../config/env';
import { api } from '../../common/api/url';
import { closeWebrtc } from '../../utils/webrtc';
import { trackEvent } from '../../utils/analytic';
import { checkInRewardChecking } from '../auth/actions';

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
		// Step 4 : Initial Check In Reward
		dispatch(checkInRewardChecking(navigator));
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
			// Step 0 : Sound Effect
			dispatch(playUISound('spaceship'));
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
		} else {
			dispatch(playUISound('cancel'));
		}
	}
}
export function switchMachine(navigator,load){
	return (dispatch,getState)=>{
		const currentMachine = getState()['game']['machine'];
		const machines = getState()['game']['machines'];
		const randomIndex = Math.floor(Math.random() * ((machines.length - 1) - 0 + 1)) + 0;
		if(load === true) loading('show',navigator);
		if(currentMachine.index === randomIndex){
			dispatch(switchMachine(navigator,false));
		} else {
			let targetMachine = machines[randomIndex];
			targetMachine.index = randomIndex;
			dispatch({
				type : 'SELECT_MACHINE',
				value : targetMachine
			});
			dispatch(machineStatus('leave'));
			setTimeout(()=>{
				dispatch(machineStatus('start'));
				loading('hide',navigator);
			},1000);
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
					value : { 
						status : data.status  , 
						reservation : data.reservation ,
						currentUser : data.currentUser
					}  
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

export function reserveStatus(navigator){
	return(dispatch,getState)=>{
		
		const { userId } = getState()['auth']['token']['lbToken'];
		const pusher = getState()['preference']['pusher'];

		var channel = pusher.subscribe('reservation-'+userId);
		channel.bind('your_turn', (data)=>{
			//console.warn(JSON.stringify(data));
			dispatch({ type : 'UPDATE_RESERVATION' , value : data  });

			navigator.showLightBox({
				screen : 'app.Reservation',
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
				},
				passProps : {
					data : data,
					navigator : navigator
				}
			});

		});

	}
}

export function networkChecking(navigator){
	return (dispatch,getState)=>{
		const { string } = getState()['preference']['language'];
		NetInfo.getConnectionInfo().then((connectionInfo) => {
			if(connectionInfo.type !== null){
				dispatch({ 
					type : 'CHANGE_NETWORK_STATUS' , 
					value : { status : true , type : connectionInfo.type }
				});
			}
		});
		NetInfo.addEventListener(
			'connectionChange',
			(connectionInfo)=>{
				const newStatus = (connectionInfo.type !== 'none') ? true : false;
				dispatch({ 
					type : 'CHANGE_NETWORK_STATUS' , 
					value : { status : newStatus , type : connectionInfo.type } 
				});
				if(connectionInfo.type === 'none') 
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
	const positions = (Platform.OS === 'ios') ? [
		{ x : -screenWidth/3 , y : -screenHeight*0.2 } ,
		{ x : 0 , y : -screenHeight*0.35 },
		{ x : screenWidth/3 , y : -screenHeight*0.3 },
		{ x : -screenWidth/3 , y : 0 },
		{ x : 0 , y : screenHeight*0.04 },
		{ x : screenWidth/3 , y : -screenHeight*0.1 }
	] : 
	[
		{x : 0 - 20 , y : screenHeight * 0.09 },
		{x : screenWidth / 3 - 10 , y : screenHeight * 0.01 },
		{x : screenWidth / 3 * 2 - 5 , y : screenHeight * 0.09 },
		{x : 0 - 20 , y : screenHeight / 2.7},
		{x : screenWidth / 3 - 10 , y : screenHeight * 0.46},
		{x : screenWidth / 3 * 2 - 5 , y : screenHeight / 2.7},
	];
	productList.map((item,index)=>{
		item.position = positions[index]
	});
	//console.warn(JSON.stringify(productList));
	return productList;
}

export function navigateToGameRoom(productId,status,navigator){
	return (dispatch,getState)=>{
		const token = getState()['auth']['token']['lbToken']['id'];
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
					targetMachine.index = randomIndex;
					res.map((machine,index)=>{
						if(machine.status === 'open') {
							targetMachine = machine;
							targetMachine.index = index;
						}
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
					// Step 7 : Tracking
					dispatch(trackEvent('viewProduct',targetProduct));
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

export function initGamePlay(navigator,loadState){
	return (dispatch,getState)=>{

		// Step 0 : Loading State
		if(loadState) loadState(true);

		// Step 1 : Check Wallet Balance || Wifi Connection
		const { balance } = getState()['auth']['wallet'];
		const { gamePlayRate } = getState()['game']['product'];
		const { status , type } = getState()['game']['network'];
		const sufficientFund = (balance >= gamePlayRate) ? true : false;
		const networkValid = (status === true && type === 'wifi') ? true : false;
		//console.warn(balance);
		//console.warn(gamePlayRate)
		if(sufficientFund === true && networkValid === true){
	
			// Step 2 : Get GamePlay Configuration from Backend
			const { id , userId } = getState()['auth']['token']['lbToken'];
			const machineId = getState()['game']['machine']['id'];
			const productId = getState()['game']['product']['id'];
			const params = {
				token : id,
				machineId : machineId,
				data : {
					productId : productId,
					userId : userId
				}
			};
			//console.warn(JSON.stringify(params));
			engageGamePlay(params,Request)
				.then((res,err)=>{
					//console.warn(JSON.stringify(res));
					//console.warn(JSON.stringify(err));
					if(!err){
						// Step 3 : Success Callback				
						const { result } = res;
						if(result.gizwits){
							const { 
								newWalletBalance , 
								gizwits ,
								playId
							} = result;
							// Store Gizwits Configure
							dispatch({ 
								type : 'STORE_PLAY_CONFIG' , 
								value : { gizwits : gizwits , playId : playId }
							});
							// Navigate to GamePlay
							navigator.resetTo({
								screen : 'app.GamePlay',
								navigatorStyle : {
									navBarHidden : true
								}
							});
							// Update Wallet Balance
							dispatch({ 
								type : 'UPDATE_WALLET_BALANCE' , 
								value : newWalletBalance 
							});
							// Tracking
							dispatch(trackEvent('playGame',productId));
						} else if(result.reservation){
							dispatch({
								type : 'UPDATE_RESERVATION',
								value : result.reservation
							});
						} else if(result === 'insufficient_balance'){
							insufficientFundMessage(navigator);
						}
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
		} else {
			// Reverse Loading State
			if(loadState) loadState(false);
			// Insufficient Fund PopUp
			if(sufficientFund === false) insufficientFundMessage(navigator);
			// Network Problem PopUp
			if(networkValid === false) errorMessage('show',navigator,{ title : 'networkProblem' , message : 'useWifi' }) ;
		}

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
				backgroundColor : (Platform.OS === 'ios') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)',
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
		if(front && front.pc !== undefined) closeWebrtc(front.pc,front.rtsp);
		if(top && top.pc !== undefined) closeWebrtc(top.pc,top.rtsp);
		dispatch({ type : 'CLEAR_WEBRTC_URL' });
	}
}

export function webSocketUrl(config){
	return (dispatch,getState)=>{
		if(config.websocket){
			const { host , wss_port } = config.websocket;
			return 'wss://'+host+':'+wss_port+'/ws/app/v1';
		} else {
			const { iotPlatform } = getState()['game']['machine'];
			const { gizwits } = iotPlatform;
			const { host , wss_port } = gizwits;
			return 'wss://'+host+':'+wss_port+'/ws/app/v1';
		}
	}
}

export function sendGameResult(result){
	return(dispatch,getState)=>{

		// Send Game Result to Backend
		const finalResult = (result === 1) ? true : false;
		const { playId } = getState()['game']['play']['config'];
		const token = getState()['auth']['token']['lbToken']['id'];
		const params = {
			token : token,
			result : {
				ended : new Date().getTime(),
				finalResult : finalResult
			},
			playId : playId
		}
		//console.warn(JSON.stringify(params));
		gameResult(params,Request)		
			.then((res,err)=>{
				//console.warn(JSON.stringify(res));
				//console.warn(JSON.stringify(err));
				if(err){
					const { string } = getState()['preference']['language'];
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

export function endGamePlay(action,navigator){
	return (dispatch,getState)=>{
		const token = getState()['auth']['token']['lbToken']['id'];

		// Step 0 : Close All WebRTC
		dispatch(closeAllWebrtc());

		// Step 1 : Reset All Parametes
		dispatch(resetTimer(null));
		dispatch(lastMachineMove(null));
		dispatch(switchMode('front'));

		// Step 2 : Navigate to Related Page
		if(action === 'replay'){

			navigator.dismissLightBox();
			setTimeout(()=>{
				dispatch(initGamePlay(navigator));
				loadGamePlay(navigator);
			},2000);

		} else if(action == 'exit'){
			
			const machineId = getState()['game']['machine']['id'];
			const userId = getState()['auth']['token']['lbToken']['userId'];
			//console.warn(machineId);
			endGameEngage({ 
				token : token  ,
				machineId : machineId,
				userId : userId
			},Request)
			//.then((res,err)=>{
				//console.warn(JSON.stringify(res));
				//console.warn(JSON.stringify(err));
			//});

			navigator.resetTo({
				screen : 'app.GamePlayList',
				navigatorStyle : {
					navBarHidden : true
				}
			});

		}
	}
}

export function cancelReservation(){
	return(dispatch,getState)=>{
		const { reservation } = getState()['auth'];
		const token = getState()['auth']['token']['lbToken']['id'];
		//console.warn(JSON.stringify(reservation));
		const params = {
			token : token,
			reservationId : reservation.id,
			data : { status : 'cancel' }
		};
		cancelReserve(params,Request)
			.then((res,err)=>{
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

export function rejectReserve(machineId,navigator){
	return(dispatch,getState)=>{
		const token = getState()['auth']['token']['lbToken']['id'];
			const userId = getState()['auth']['token']['lbToken']['userId'];
		endGameEngage({ 
			token : token  ,
			machineId : machineId,
			userId : userId
		},Request)
		navigator.dismissLightBox()
	}
}

export function acceptReserve(data,navigator){
	return(dispatch,getState)=>{
		//console.warn(JSON.stringify(data));
		const token = getState()['auth']['token']['lbToken']['id'];
		const { machineId , productId } = data;
		async function acceptFlow(){
			try {
				// Step 1 : Get Product
				const targetProduct = await getProduct({
					token : token,
					productId : productId
				},Request);
				//console.warn(JSON.stringify(targetProduct));
				dispatch({
					type : 'SELECT_PRODUCT',
					value : targetProduct
				});
				// Setp 2 : Get Machine
				const machineRes =  await machineList({
					token : token ,
					productId : productId
				},Request);
				//console.warn(JSON.stringify(machineRes));
				let targetMachine;
				machineRes.map((machine)=>{
					if(machine.id === machineId) targetMachine = machine;
				});
				//console.warn(JSON.stringify(targetMachine));
				dispatch({
					type : 'SELECT_MACHINE',
					value : targetMachine
				});
				navigator.dismissModal({
					animationType : 'slide-down'
				});
				navigator.dismissLightBox();
				// Step 3 : Initiate Game Play
				setTimeout(()=>{
					dispatch(initGamePlay(navigator));
				},1000);
			}
			catch(e){

			}
		}
		acceptFlow();
	}
}

export function getCheckinReward(){
	return (dispatch,getState)=>{
		const { id , userId } = getState()['auth']['token']['lbToken'];
		checkinReward(
			{
				token : id,
				userId : userId
			},
			Request
		)
			.then((res,err)=>{
				console.warn(JSON.stringify(err));
				console.warn(JSON.stringify(res));
				if(!err){
					const { result } = res;
					if(result.success === true){
						dispatch({
							type : 'UPDATE_WALLET_BALANCE',
							value : result.newWalletBalance
						});	
					}
				}
			})
			.catch((err)=>{
				console.warn(JSON.stringify(err));
			})
	}
}
