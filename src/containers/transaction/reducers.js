import { fromJS } from 'immutable';

const initialState = {
  rates: [],
  rate: null,
  transactions: null,
  reward: null,
};

function transactionReducer(state = initialState, action) {
  const immutableState = fromJS(state);
  switch (action.type) {
    case 'STORE_TRANSACTIONS':
      return immutableState
        .setIn(['transactions'], action.value)
        .toJS();
    case 'STORE_RATES':
      return immutableState
        .setIn(['rates'], action.value)
        .toJS();
    case 'SELECT_RATE':
      return immutableState
        .setIn(['rate'], action.value)
        .toJS();
    case 'STORE_REDEEM_CODE':
      return immutableState
        .setIn(['reward'], action.value)
        .toJS();
    default:
      return state;
  }
}

export default transactionReducer;
