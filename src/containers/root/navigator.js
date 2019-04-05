import { Navigation } from 'react-native-navigation';
import GamePlayList from '../game/gamePlayList/layout';
import Error from '../utilities/error/layout';
import Loading from '../utilities/loading/layout';
import Auth from '../auth/layout';
import TopUp from '../transaction/topup/payment/layout';
import Delivery from '../miscellaneous/delivery/layout';
import Tracking from '../miscellaneous/delivery/receipt/tracking';
import Reward from '../transaction/reward/layout';
import CheckinReward from '../transaction/reward/checkin/layout';
import CustomerSupport from '../miscellaneous/cs/layout';
import Setting from '../miscellaneous/setting/layout';
import PrizeShop from '../prizesShop/layout';
import InsufficientFundSuggest from '../utilities/popup/fundSuggest';
import PlayMobileData from '../utilities/popup/playUnderCellular';
import BananaGame from '../../banana_game/root';
import StackerGame from '../../stacker_game/Home';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('app.GamePlayList', () => GamePlayList, store, Provider);
  Navigation.registerComponent('app.Error', () => Error, store, Provider);
  Navigation.registerComponent('app.Loading', () => Loading, store, Provider);
  Navigation.registerComponent('app.Auth', () => Auth, store, Provider);
  Navigation.registerComponent('app.TopUp', () => TopUp, store, Provider);
  Navigation.registerComponent('app.Reward', () => Reward, store, Provider);
  Navigation.registerComponent('app.CheckinReward', () => CheckinReward, store, Provider);
  Navigation.registerComponent('app.Delivery', () => Delivery, store, Provider);
  Navigation.registerComponent('app.Tracking', () => Tracking, store, Provider);
  Navigation.registerComponent('app.Support', () => CustomerSupport, store, Provider);
  Navigation.registerComponent('app.Setting', () => Setting, store, Provider);
  Navigation.registerComponent('app.InsufficientFund', () => InsufficientFundSuggest, store, Provider);
  Navigation.registerComponent('app.PlayMobileData', () => PlayMobileData, store, Provider);
  Navigation.registerComponent('app.BananaGame', () => BananaGame, store, Provider);
  Navigation.registerComponent('app.StackerGame', () => StackerGame, store, Provider);
  Navigation.registerComponent('app.PrizeShop', () => PrizeShop, store, Provider);
}

export default null;
