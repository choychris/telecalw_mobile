import { errorMessage , loading } from '../utilities/actions';
import { NetInfo } from 'react-native';

async function loadGameListFlow(dispatch,getState,navigator){
	try {
		// Fetch Tag List From backend API
		// Get the Gamplay List ( Product List ) from the first tag
		dispatch(getTagsList(navigator));
		loading('hide',navigator);
	}
	catch(e){
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

export function getTagsList(navigator){
	return(dispatch,getState)=>{
		// **** This is for development purpose only **** //
		const tags = [
			{
				name : {
					en : 'Earth'
				},
				picture : require('../../../assets/planet/earth.png')
			},
			{
				name : {
					em : 'Moon'
				},
				picture : require('../../../assets/planet/moon.png')
			}
		];
		// **** This is for development purpose only **** //
		dispatch({ 
			type : 'STORE_GAME_TAGS',
			value : tags
		});
		dispatch({
			type : 'SELECT_TAG',
			value : tags[0]
		});
	}
}

export function getProductList(tag){
	return (dispatch,getState)=>{
		const tags = getState()['game']['tags'];
		const smapleList = [
			{  
				
			}
		]
		dispatch({
			type : 'STORE_PRODUCT_LIST',
			keys : ['earth'],
			value : smapleList
		});
		dispatch({
			type : 'SELECT_TAG',
			value : tags[1]
		});
	}
}

export function networkChecking(navigator){
	return (dispatch,getState)=>{
		const { string } = getState()['preference']['language'];
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
