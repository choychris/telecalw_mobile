import Analytics from 'analytics-react-native';
import { segmentKey } from '../config/env';

const analytics = new Analytics(segmentKey());

export function identitfyUser(userId,userObj){
	let identifyObj = {
		userId : userId
	};
	if(userObj) identifyObj.traits = userObj
	analytics.identify(identifyObj);
}


export function trackEvent(event,params){
	return(dispatch,getState)=>{
		const token = getState()['auth']['token'];
		if(token.lbToken !== undefined){
			const { userId } = token.lbToken;
			let trackObj = {
				userId : userId,
				event : event
			};
			if(params) trackObj.properties  = params;
			analytics.track(trackObj);	
		}
	}
}

export function trackScreen(screen,params){
	return(dispatch,getState)=>{
		const token = getState()['auth']['token'];
		if(token.lbToken !== undefined){
			const { userId } = token.lbToken;
			let screenObj = {
				userId : userId,
				name : screen
			};
			if(params) screenObj.properties  = params;
			analytics.screen(screenObj);	
		}
	}
}
