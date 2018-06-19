import { Platform, Dimensions } from 'react-native';
import Request from '../../utils/fetch';
import { releaseChecking } from '../../common/api/request/version';

const DeviceInfo = require('react-native-device-info');

const { width, height } = Dimensions.get('window');
const backgroundColor = (Platform.OS === 'ios') ?
  'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)';
const style = {
  flex: 1,
  height,
  width,
  backgroundBlur: 'dark',
  backgroundColor,
  tapBackgroundToDismiss: false,
};

export function errorMessage(action, navigator, data, time) {
  let callback;
  style.tapBackgroundToDismiss = true;
  if (action === 'show') {
    callback = () => {
      navigator.showLightBox({
        screen: 'app.Error',
        animationType: 'slide-up',
        navigatorStyle: {
          navBarHidden: true,
        },
        passProps: data,
        style,
      });
    };
  } else {
    callback = () => {
      navigator.dismissLightBox({
        animationType: 'slide-down',
      });
    };
  }
  if (time !== undefined) {
    setTimeout(() => callback(), time);
  } else {
    callback();
  }
}

export function loading(action, navigator) {
  if (action === 'show') {
    navigator.showLightBox({
      screen: 'app.Loading',
      animationType: 'fade',
      navigatorStyle: {
        navBarHidden: true,
      },
      style,
      adjustSoftInput: 'unspecified',
    });
  } else if (action === 'hide') {
    navigator.dismissLightBox({
      animationType: 'fade',
    });
  }
}

export function message(action, navigator, data, time) {
  let callback;
  style.tapBackgroundToDismiss = true;
  if (action === 'show') {
    callback = () => {
      navigator.showLightBox({
        screen: 'app.Error',
        animationType: 'slide-up',
        navigatorStyle: {
          navBarHidden: true,
        },
        passProps: data,
        style,
      });
    };
  } else {
    callback = () => {
      navigator.dismissLightBox({
        animationType: 'slide-down',
      });
    };
  }
  if (time !== undefined) {
    setTimeout(() => callback(), time);
  } else {
    callback();
  }
}

export function insufficientFundMessage(navigator) {
  style.tapBackgroundToDismiss = true;
  navigator.showLightBox({
    screen: 'app.InsufficientFund',
    animationType: 'slide-up',
    navigatorStyle: {
      navBarHidden: true,
    },
    passProps: { navigator },
    style,
  });
}

export function playMobileDataMessage(navigator) {
  navigator.showLightBox({
    screen: 'app.PlayMobileData',
    animationType: 'slide-up',
    navigatorStyle: {
      navBarHidden: true,
    },
    passProps: { navigator },
    style,
  });
}

export function checkVersionRelease() {
  return (dispatch) => {
    const originVersion = DeviceInfo.getReadableVersion();
    const lastIndex = originVersion.lastIndexOf('.');
    const formatVersion = `v${DeviceInfo.getReadableVersion().slice(0, lastIndex)}(${DeviceInfo.getBuildNumber()})`;
    // console.warn(Platform.OS);
    // console.warn(DeviceInfo.getReadableVersion());
    // console.warn(formatVersion);
    // console.warn(lastIndex);
    if (Platform.OS === 'ios') {
      // Engage checking procedure
      releaseChecking({
        versionName: formatVersion,
      }, Request)
        .then((res, err) => {
          // console.warn(err);
          // console.warn(JSON.stringify(res));
          if (!err && res.releaseStatus !== undefined) {
            const releaseStatus = (res.releaseStatus === 'release');
            dispatch({
              type: 'STORE_VERSION',
              value: {
                version: formatVersion,
                release: releaseStatus,
              },
            });
          }
        });
    } else if (Platform.OS === 'android') {
      dispatch({
        type: 'STORE_VERSION',
        value: {
          version: formatVersion,
          release: true,
        },
      });
    }
  };
}
