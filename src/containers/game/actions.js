import { NetInfo , Dimensions } from 'react-native';
import * as firebase from 'firebase';
import { errorMessage , loading } from '../utilities/actions';
import { firebaseCredentials } from '../../config/env';
import { tagList , getTagProduct } from '../../common/api/request/tag';
import Request from '../../utils/fetch';
import { localPlanetImg } from '../../utils/images';

async function loadGameListFlow(dispatch,getState,navigator){
	try {
		const token = getState()['auth']['token']['lbToken'];
		const { string } = getState()['preference']['language'];
		// Step 1 : Get Tag List From backend API
		const tags = await tagList(token,Request);	
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
		// Step 3 : Hide Loading Lightbox
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

export function productStatus(){
	return (dispatch,getState)=>{
		firebase.initializeApp(firebaseCredentials());
		let initialData = false;
		const productStatus = firebase.database().ref('messages/product');
		productStatus
			.orderByChild("time")
			.on('child_added', (snapshot)=>{
				if(initialData === true) {
					console.warn(JSON.stringify(snapshot.val()));
					const statusMsg = snapshot.val();
					const { productId , status } = statusMsg;
					const currentTag = getState()['game']['tag'];
					const list = getState()['game']['list'];
					if(currentTag !== null && list[currentTag.id]){
						let updateProductIndex = null
						list[currentTag.id].map((item,index)=>{
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
				};
			});
		productStatus.once('value',()=>initialData = true);
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
