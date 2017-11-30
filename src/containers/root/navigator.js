import { Navigation } from 'react-native-navigation';
import Login from '../auth/login/layout';
import Error from '../utilities/error/layout'

// register all screens of the app (including internal ones)
 export function registerScreens(store , Provider) {
	 Navigation.registerComponent('app.Login', () => Login,store,Provider);
	 Navigation.registerComponent('app.Error', () => Error,store,Provider);
}
