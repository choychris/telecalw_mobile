import { fromJS } from 'immutable';
import DeviceInfo from 'react-native-device-info';

const initialState = {
  plays: [],
  play: [],
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
  state = fromJS(state);
  switch (action.type) {
    case 'STORE_PLAYS':
      return state
        .setIn(['plays'], action.value)
        .toJS();
    case 'CLEAR_PLAYS':
      return state
        .setIn(['plays'], [])
        .toJS();
    case 'SELECT_PLAY':
      return state
        .updateIn(['play'], array => array.push(action.value))
        .toJS();
    case 'UNSELECT_PLAY':
      return state
        .updateIn(['play'], array => array.filter((data) => {
          if (data.getIn(['playId']) !== action.value) {
            return data;
          }
        }))
        .toJS();
    case 'CLEAR_PLAY':
      return state
        .setIn(['play'], [])
        .toJS();
    case 'RESET_DELIVERY':
      return state
        .setIn(['play'], [])
        .setIn(['delivery'], {})
        .setIn(['logistic'], {
          target: 'user',
          quotes: [],
          quote: null,
        })
        .toJS();
    case 'CHANGE_LOGISTIC_TARGET':
      return state
        .setIn(['logistic', 'target'], action.value)
        .toJS();
    case 'LOGISTIC_ADDRESS_1':
      return state
        .setIn(['logistic', 'address', 'line1'], action.value)
        .toJS();
    case 'LOGISTIC_ADDRESS_2':
      return state
        .setIn(['logistic', 'address', 'line2'], action.value)
        .toJS();
    case 'LOGISTIC_CITY':
      return state
        .setIn(['logistic', 'address', 'city'], action.value)
        .toJS();
    case 'LOGISTIC_STATE':
      return state
        .setIn(['logistic', 'address', 'state'], action.value)
        .toJS();
    case 'LOGISTIC_PHONE':
      return state
        .setIn(['logistic', 'address', 'phone'], action.value)
        .toJS();
    case 'LOGISTIC_COUNTRY_CODE':
      return state
        .setIn(['logistic', 'address', 'countryCode'], action.value)
        .toJS();
    case 'LOGISTIC_POSTAL_CODE':
      return state
        .setIn(['logistic', 'address', 'postalCode'], action.value)
        .toJS();
    case 'STORE_QUOTES':
      return state
        .setIn(['logistic', 'quotes'], action.value)
        .toJS();
    case 'SELECT_ISSUE_TYPE':
      return state
        .setIn(['issue', 'type'], action.value)
        .toJS();
    case 'AMEND_ISSUE':
      return state
        .setIn(['issue'].concat(action.keys), action.value)
        .toJS();
    case 'SELECT_QUOTE':
      return state
        .setIn(['logistic', 'quote'], action.value)
        .toJS();
    case 'STORE_DELIVERY':
      return state
        .setIn(['delivery'], action.value)
        .toJS();
    case 'STORE_VERSION':
      return state
        .setIn(['version'], action.value)
        .toJS();
    default:
      return state.toJS();
  }
}

export default misReducer;
