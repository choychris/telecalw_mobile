import { fromJS } from 'immutable';
import DeviceInfo from 'react-native-device-info';

const initialState = {
  prizes: null,
  prizeToShip: [],
  delivery: {},
  logistic: {
    target: 'user',
    quotes: [],
    quote: null,
    address: {
      countryCode: DeviceInfo.getDeviceCountry().toLowerCase() || 'us',
    },
  },
  issue: {
    type: 'gameAppeal',
  },
  version: {},
};

function misReducer(state = initialState, action) {
  const immuteState = fromJS(state);
  switch (action.type) {
    case 'STORE_PRIZES':
      return immuteState
        .setIn(['prizes'], action.value)
        .toJS();
    case 'CLEAR_PRIZES':
      return immuteState
        .setIn(['prizes'], [])
        .toJS();
    case 'CLEAR_SHIP':
      return immuteState
        .setIn(['prizeToShip'], [])
        .toJS();
    case 'SELECT_PRIZE':
      return immuteState
        .setIn(['prizes', action.index, 'selected'], true)
        .toJS();
    case 'UNSELECT_PRIZE':
      return immuteState
        .setIn(['prizes', action.index, 'selected'], false)
        .toJS();
    case 'TO_SHIP':
      return immuteState
        .setIn(['prizeToShip'], action.value)
        .toJS();
    case 'RESET_DELIVERY':
      return immuteState
        .setIn(['play'], [])
        .setIn(['delivery'], {})
        .setIn(['logistic'], {
          target: 'user',
          quotes: [],
          quote: null,
        })
        .toJS();
    case 'CHANGE_LOGISTIC_TARGET':
      return immuteState
        .setIn(['logistic', 'target'], action.value)
        .toJS();
    case 'LOGISTIC_ADDRESS_1':
      return immuteState
        .setIn(['logistic', 'address', 'line1'], action.value)
        .toJS();
    case 'LOGISTIC_ADDRESS_2':
      return immuteState
        .setIn(['logistic', 'address', 'line2'], action.value)
        .toJS();
    case 'LOGISTIC_CITY':
      return immuteState
        .setIn(['logistic', 'address', 'city'], action.value)
        .toJS();
    case 'LOGISTIC_STATE':
      return immuteState
        .setIn(['logistic', 'address', 'state'], action.value)
        .toJS();
    case 'LOGISTIC_PHONE':
      return immuteState
        .setIn(['logistic', 'address', 'phone'], action.value)
        .toJS();
    case 'LOGISTIC_COUNTRY_CODE':
      return immuteState
        .setIn(['logistic', 'address', 'countryCode'], action.value)
        .toJS();
    case 'LOGISTIC_POSTAL_CODE':
      return immuteState
        .setIn(['logistic', 'address', 'postalCode'], action.value)
        .toJS();
    case 'STORE_QUOTES':
      return immuteState
        .setIn(['logistic', 'quotes'], action.value)
        .toJS();
    case 'SELECT_ISSUE_TYPE':
      return immuteState
        .setIn(['issue', 'type'], action.value)
        .toJS();
    case 'AMEND_ISSUE':
      return immuteState
        .setIn(['issue'].concat(action.keys), action.value)
        .toJS();
    case 'SELECT_QUOTE':
      return immuteState
        .setIn(['logistic', 'quote'], action.value)
        .toJS();
    case 'STORE_DELIVERY':
      return immuteState
        .setIn(['delivery'], action.value)
        .toJS();
    case 'STORE_VERSION':
      return immuteState
        .setIn(['version'], action.value)
        .toJS();
    default:
      return state;
  }
}

export default misReducer;
