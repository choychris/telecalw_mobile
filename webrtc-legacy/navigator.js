import GameRoom from '../game/gameRoom/layout';
import ProductDetailContainer from '../game/gameRoom/product/listContainer';
import GamePlay from '../game/gamePlay/layout';
import GameResult from '../game/gamePlay/result/layout';
import GameCountDown from '../game/gamePlay/transition/layout';
import Reservation from '../game/reservation/layout';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('app.GameRoom', () => GameRoom, store, Provider);
    Navigation.registerComponent('app.ProductDetail', () => ProductDetailContainer, store, Provider);
    Navigation.registerComponent('app.GamePlay', () => GamePlay, store, Provider);
    Navigation.registerComponent('app.GameResult', () => GameResult, store, Provider);
    Navigation.registerComponent('app.Reservation', () => Reservation, store, Provider);
    Navigation.registerComponent('app.GameCountDown', () => GameCountDown, store, Provider);
}