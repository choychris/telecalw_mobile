import DeviceInfo from 'react-native-device-info';

export function languageChecking(){
	return (dispatch,getState)=>{
		const locale = DeviceInfo.getDeviceLocale().toLowerCase();
		return dispatch({ type : 'SET_LANGUAGE' , value : locale });
	}
}
