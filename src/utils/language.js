import DeviceInfo from 'react-native-device-info';

export function languageChecking() {
  return (dispatch, getState) => {
    const locale = DeviceInfo.getDeviceLocale().toLowerCase();
    const { avaLanguage } = getState().preference.language;
    const valid = !!(avaLanguage[locale]);
    if (valid) {
      return dispatch({ type: 'SET_LANGUAGE', value: locale });
    }
  };
}

export function languageSetting(locale) {
  return (dispatch, getState) => dispatch({ type: 'SET_LANGUAGE', value: locale });
}


export function preferenceSetting(preference) {
  return (dispatch, getState) => dispatch({ type: 'SET_PREFERENCE', value: preference });
}
