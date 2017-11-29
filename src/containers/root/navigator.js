import { Navigation } from 'react-native-navigation';
import Login from '../auth/login/layout.ios';

// register all screens of the app (including internal ones)
 export function registerScreens(store , Provider) {
	 Navigation.registerComponent('app.Login', () => Login,store,Provider);
}
