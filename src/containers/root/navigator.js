import { Navigation } from 'react-native-navigation';
import Error from '../utilities/error/layout';
import Loading from '../utilities/loading/layout';
import Auth from '../auth/layout';
import GamePlayList from '../game/gamePlayList/layout';

// register all screens of the app (including internal ones)
 export function registerScreens(store , Provider) {
	 Navigation.registerComponent('app.Error', () => Error,store,Provider);
	 Navigation.registerComponent('app.Loading', () => Loading,store,Provider);
	 Navigation.registerComponent('app.Auth', () => Auth,store,Provider);
	 Navigation.registerComponent('app.GamePlayList', () => GamePlayList,store,Provider);
}
