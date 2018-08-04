import { fromJS } from 'immutable';

const arcadePlanet = require('../../../assets/planet/arcadePlanet.png');

const gameTag = {
  index: 0,
  game: true,
  name: {
    en: 'Game Planet!',
    zhHant: '游戲星球',
  },
  images: arcadePlanet,
};

const initialState = {
  gameId: null,
  tag: gameTag,
  tags: [gameTag],
  product: null,
  products: {},
  machine: null,
  machines: [],
  network: {},
  play: {
    timer: null,
    cameraMode: 'front',
    webrtcUrl: {},
    lastAction: null,
    config: null,
    webrtcTemp: {},
  },
  turnservers: [],
};

function gameReducer(state = initialState, action) {
  const immuteState = fromJS(state);
  switch (action.type) {
    case 'GAME_LOCATION':
      return immuteState
        .setIn(['gameId'], action.gameId)
        .toJS();
    case 'CHANGE_NETWORK_STATUS':
      return immuteState
        .setIn(['network'], action.value)
        .toJS();
    case 'STORE_GAME_TAGS':
      if (immuteState.toJS().tags.length === 1) {
        return immuteState
          .updateIn(['tags'], tags => tags.concat(action.value))
          .toJS();
      }
      return immuteState.toJS();
    case 'SELECT_TAG':
      return immuteState
        .setIn(['tag'], action.value)
        .toJS();
    case 'STORE_PRODUCT_LIST':
      return immuteState
        .setIn(['products'].concat(action.keys), action.value)
        .toJS();
    case 'SELECT_PRODUCT':
      return immuteState
        .setIn(['product'], action.value)
        .toJS();
    case 'STORE_MACHINE_LIST':
      return immuteState
        .setIn(['machines'], action.value)
        .toJS();
    case 'SELECT_MACHINE':
      return immuteState
        .setIn(['machine'], action.value)
        .toJS();
    case 'UPDATE_MACHINE_STATUS':
      return immuteState
        .setIn(['machine', 'status'], action.value.status)
        .setIn(['machine', 'reservation'], action.value.reservation)
        .setIn(['machine', 'currentUser'], action.value.currentUser)
        .toJS();
    case 'UPDATE_VIEWS':
      return immuteState
        .setIn(['machine', 'views'], action.value)
        .toJS();
    case 'UPDATE_MEMBERS':
      return immuteState
        .setIn(['machine', 'members'], action.value)
        .toJS();
    case 'UPDATE_TIMER':
      return immuteState
        .setIn(['play', 'timer'], action.value)
        .toJS();
    case 'SWITCH_CAMERA_MODE':
      return immuteState
        .setIn(['play', 'cameraMode'], action.value)
        .toJS();
    case 'STORE_WEBRTC_URL':
      return immuteState
        .setIn(['play', 'webrtcUrl'].concat(action.keys), action.value)
        .toJS();
    case 'CLEAR_WEBRTC_URL':
      return immuteState
        .setIn(['play', 'webrtcUrl'], {})
        .toJS();
    case 'CURRENT_WEBRTC_PC':
      return immuteState
        .setIn(['play', 'webrtcTemp'], action.value)
        .toJS();
    case 'LAST_PLAY_ACTION':
      return immuteState
        .setIn(['play', 'lastAction'], action.value)
        .toJS();
    case 'STORE_PLAY_CONFIG':
      return immuteState
        .setIn(['play', 'config'], action.value)
        .toJS();
    case 'STORE_TURNSERVERS':
      return immuteState
        .setIn(['turnservers'], action.value)
        .toJS();
    default:
      return immuteState.toJS();
  }
}

export default gameReducer;
