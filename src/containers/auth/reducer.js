import { fromJS } from 'immutable';

const initialState = {
  user: {},
  token: {},
  wallet: {},
  reservation: {},
};

function authReducer(state = initialState, action) {
  state = fromJS(state);
  switch (action.type) {
    case 'STORE_AUTH_TOKEN':
      return state
        .setIn(['token'], action.value)
        .toJS();
    case 'STORE_USER_INFO':
      return state
        .setIn(['user'], action.value)
        .toJS();
    case 'STORE_WALLET_INFO':
      return state
        .setIn(['wallet'], action.value)
        .toJS();
    case 'UPDATE_WALLET_BALANCE':
      return state
        .setIn(['wallet', 'balance'], action.value)
        .toJS();
    case 'UPDATE_RESERVATION':
      return state
        .setIn(['reservation'], action.value)
        .toJS();
    case 'USER_ADDRESS_1':
      return state
        .setIn(['user', 'address', 'line1'], action.value)
        .toJS();
    case 'USER_ADDRESS_2':
      return state
        .setIn(['user', 'address', 'line2'], action.value)
        .toJS();
    case 'USER_STATE':
      return state
        .setIn(['user', 'address', 'state'], action.value)
        .toJS();
    case 'USER_CITY':
      return state
        .setIn(['user', 'address', 'city'], action.value)
        .toJS();
    case 'USER_PHONE':
      return state
        .setIn(['user', 'address', 'phone'], action.value)
        .toJS();
    case 'USER_EMAIL':
      return state
        .setIn(['user', 'address', 'email'], action.value)
        .toJS();
    case 'USER_FULL_NAME':
      return state
        .setIn(['user', 'address', 'name'], action.value)
        .toJS();
    case 'USER_COUNTRY_CODE':
      return state
        .setIn(['user', 'address', 'countryCode'], action.value)
        .toJS();
    case 'USER_POSTAL_CODE':
      return state
        .setIn(['user', 'address', 'postalCode'], action.value)
        .toJS();
    default:
      return state.toJS();
  }
}

export default authReducer;

