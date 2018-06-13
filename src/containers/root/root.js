import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from '../../config/configureStore';
import { registerScreens } from './navigator';


const store = configureStore();
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.Auth',
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  appStyle: {
    orientation: 'portrait',
  },
  animationType: 'fade',
});
