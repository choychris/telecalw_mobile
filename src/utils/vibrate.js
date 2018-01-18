import { Vibration } from 'react-native';

export function vibrate(time){
	return (dispatch,getState)=>{
		const vibratePre = getState()['preference']['preference']['vibration'];
		if(vibratePre === true) Vibration.vibrate(time);
	}
}
