import DeviceInfo from 'react-native-device-info';

export function languageChecking(){
	return (dispatch,getState)=>{
		const locale = DeviceInfo.getDeviceLocale().toLowerCase();
		const avaLanguage = getState()['preference']['language']['avaLanguage'];
		const valid = (avaLanguage[locale]) ? true : false;
		if(valid === true){
			return dispatch({ type : 'SET_LANGUAGE' , value : locale });
		}
	}
}


export function languageSetting(locale){
	return(dispatch,getState)=>{
		return dispatch({ type : 'SET_LANGUAGE' , value : locale });
	}
}

