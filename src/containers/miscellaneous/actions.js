import Request from '../../utils/fetch';
import { userPrize, exchangePrize } from '../../common/api/request/prize';
import { getDeliveryQuote, postDelivery, getDelivery } from '../../common/api/request/delivery';
import { postIssue } from '../../common/api/request/issue';
import { updateUser } from '../../common/api/request/user';
import { loading, message, insufficientFundMessage, errorMessage } from '../utilities/actions';
import { languageSetting, preferenceSetting } from '../../utils/language';
import { trackEvent } from '../../utils/analytic';

// const Sound = require('react-native-sound');
export function exchange(navigator, prizeId) {
  return (dispatch, getState) => {
    const { userId, id } = getState().auth.token.lbToken;
    loading('show', navigator);
    exchangePrize(userId, prizeId, undefined, id)
      .then((res) => {
        loading('hide', navigator);
        if (res.res.ticket > 0) {
          dispatch({
            type: 'UPDATE_WALLET_TICKET',
            value: res.res.ticket,
          });
          dispatch({
            type: 'UPDATE_PRIZES',
            id: prizeId,
          });
        } else {
          errorMessage(
            'show',
            navigator,
            {
              title: 'Some error occur',
              message: 'tryAgain',
            },
          );
        }
      })
      .catch((err) => {
        loading('hide', navigator);
        errorMessage(
          'show',
          navigator,
          {
            title: 'Some error occur',
            message: 'tryAgain',
          },
        );
        console.log(err);
      });
  }
}
export function winResult() {
  return (dispatch, getState) => {
    const { userId, id } = getState().auth.token.lbToken;
    // loading('show', navigator);
    userPrize(userId, id)
      .then((res) => {
        console.log(res);
        // console.warn(JSON.stringify(err));
        // loading('hide', navigator);
        dispatch({ type: 'STORE_PRIZES', value: res });
        return null;
      })
      .catch((err) => {
        // loading('hide', navigator);
        console.warn(JSON.stringify(err));
      });
  };
}

export function selectPrize(prizeId) {
  return (dispatch, getState) => {
    const { prizes } = getState().mis;
    const index = prizes.findIndex(item => item.id === prizeId);
    dispatch({
      type: 'SELECT_PRIZE',
      index,
    });
  };
}

export function unselectPrize(prizeId) {
  return (dispatch, getState) => {
    const { prizes } = getState().mis;
    const index = prizes.findIndex(item => item.id === prizeId);
    dispatch({
      type: 'UNSELECT_PRIZE',
      index,
    });
  };
}

export function fillLogisticForm(field, value) {
  return (dispatch, getState) => {
    let action = '';
    const { target } = getState().mis.logistic;
    // console.warn(target);
    if (target === 'user') {
      action += 'USER_';
    } else if (target === 'logistic') {
      action += 'LOGISTIC_';
    }
    action += field;
    // console.warn(action);
    // Filter Incorrect value
    return dispatch({ type: action, value });
  };
}

export function confirmPlaySelect(nextState) {
  return (dispatch, getState) => {
    const { prizes } = getState().mis;
    const toShip = prizes.map((item) => {
      if (item.selected) {
        return {
          prizeId: item.id,
          id: item.productId,
        };
      }
      return undefined;
    })
      .filter(item => !!item);

    if (toShip.length > 0) {
      dispatch({
        type: 'TO_SHIP',
        value: toShip,
      });
      nextState();
    }
  };
}

export function changeLogisticTarget(value) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_LOGISTIC_TARGET',
      value,
    });
  };
}

export function getLogisticQuote(navigator, nextState) {
  return (dispatch, getState) => {
    const { logistic } = getState().mis;
    const { target } = logistic;
    const data = {};
    const address = (target === 'user') ? getState().auth.user.address : logistic.address;
    const {
      line1, phone, countryCode, postalCode, city,
    } = address;
    const valid = (line1 && phone && countryCode && postalCode && city);
    if (valid) {
      loading('show', navigator);
      const { prizeToShip } = getState().mis;
      const { id } = getState().auth.token.lbToken;
      data.postalCode = address.postalCode;
      data.countryCode = address.countryCode;
      data.products = prizeToShip;
      // console.warn(JSON.stringify(play));
      // console.warn(JSON.stringify(data));
      getDeliveryQuote({
        token: id,
        data,
      }, Request)
        .then((res, err) => {
          loading('hide', navigator);
          // console.warn(JSON.stringify(res));
          // console.warn(JSON.stringify(err));
          if (!err) {
            const { result } = res;
            dispatch({
              type: 'STORE_QUOTES',
              value: result,
            });
            nextState();
          }
        });
    }
  };
}

export function confirmDelivery(navigator, nextState) {
  return (dispatch, getState) => {
    // Step 1 : Check Wallet Balance and Quote Method is Selected
    const { balance } = getState().auth.wallet;
    const { logistic } = getState().mis;
    const { target, quote } = logistic;
    if (quote !== null && balance >= quote.coins_value) {
      const { user, token } = getState().auth;
      const { id, userId } = token.lbToken;
      const { prizeToShip } = getState().mis;
      // Step 2 : Post Delivery Request to Backend
      const data = {
        cost: quote.coins_value,
        status: 'pending',
        userId,
        products: prizeToShip,
        courier: quote,
        target,
      };
      const address = (target === 'user') ? user.address : logistic.address;
      address.name = address.name || user.name;
      address.email = address.email || user.contactEmail;
      data.address = address;
      // console.warn(JSON.stringify(user));
      // console.warn(JSON.stringify(logistic));
      // console.warn(JSON.stringify(data));
      loading('show', navigator);
      postDelivery(
        {
          token: id,
          data,
        },
        Request,
      )
        .then((res) => {
          loading('hide', navigator);
          console.log('response', res);
          // console.log('error', JSON.stringify(err));
          message(
            'show',
            navigator,
            {
              type: 'happy',
              header: 'Ya!',
              title: 'Shippment Processed!',
              message: 'Thank you!',
            },
          );

          dispatch({
            type: 'CLEAR_SHIP',
          });
          nextState();
        })
        .catch((err) => {
          loading('hide', navigator);
          console.log(JSON.stringify(err));
          errorMessage(
            'show',
            navigator,
            {
              title: 'Some error occur',
              message: 'tryAgain',
            },
          );
        });
    } else {
      insufficientFundMessage(navigator);
    }
  };
}

export function clearPrizes() {
  return dispatch => dispatch({
    type: 'CLEAR_PRIZES',
  });
}

export function resetLogistic() {
  return dispatch => dispatch({
    type: 'RESET_DELIVERY',
  });
}

export function selectIssueType(value) {
  return dispatch => dispatch({
    type: 'SELECT_ISSUE_TYPE',
    value,
  });
}

export function selectQuote(quote) {
  return dispatch => dispatch({
    type: 'SELECT_QUOTE',
    value: quote,
  });
}

export function getDeliveryData(navigator, deliveryId) {
  return (dispatch, getState) => {
    loading('show', navigator);
    const { id } = getState().auth.token.lbToken;
    getDelivery({
      token: id,
      deliveryId,
    }, Request)
      .then((res) => {
        // console.warn(JSON.stringify(res));
        // console.warn(JSON.stringify(err));
        loading('hide', navigator);
        return dispatch({ type: 'STORE_DELIVERY', value: res });
      })
      .catch((err) => {
        loading('hide', navigator);
        console.warn(JSON.stringify(err));
      });
  };
}

export function setUserLanguage(locale, navigator) {
  return (dispatch, getState) => {
    const { id, userId } = getState().auth.token.lbToken;
    const data = { language: locale };
    const params = {
      data,
      token: id,
      userId,
    };
    // console.warn(JSON.stringify(params));
    loading('show', navigator);
    updateUser(params, Request)
      .then((res, err) => {
        // console.warn(JSON.stringify(res));
        // console.warn(JSON.stringify(err));
        loading('hide', navigator);
        if (!err) {
          dispatch(languageSetting(res.language));
          return dispatch({
            type: 'STORE_USER_INFO',
            value: res,
          });
        }
        return null;
      })
      .catch((err) => {
        loading('hide', navigator);
        console.warn(JSON.stringify(err));
      });
  };
}

export function setUserPreference(navigator, key, value) {
  return (dispatch, getState) => {
    const { id, userId } = getState().auth.token.lbToken;
    const { preference } = getState().preference;
    preference[key] = value;
    const data = { preference };
    const params = {
      data,
      token: id,
      userId,
    };
    // console.warn(JSON.stringify(params));
    loading('show', navigator);
    updateUser(params, Request)
      .then((res, err) => {
        // console.warn(JSON.stringify(res));
        // console.warn(JSON.stringify(err));
        loading('hide', navigator);
        if (!err) {
          dispatch(preferenceSetting(res.preference));
          // if (!res.preference.sound === false) {

          // }
          return dispatch({
            type: 'STORE_USER_INFO',
            value: res,
          });
        }
        return null;
      })
      .catch((err) => {
        loading('hide', navigator);
        console.warn(JSON.stringify(err));
      });
  };
}

export function showTracking(navigator) {
  return (dispatch, getState) => {
    const { delivery } = getState().mis;
    if (delivery.tracking) {
      navigator.showLightBox({
        screen: 'app.Tracking',
        animationType: 'slide-up',
        navigatorStyle: {
          navBarHidden: true,
        },
        passProps: {
          tracking: delivery.tracking,
        },
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(52, 52, 52, 0.2)',
          tapBackgroundToDismiss: true,
        },
      });
    } else {
      message(
        'show',
        navigator,
        {
          title: 'sorry',
          message: 'noTracking',
        },
      );
    }
  };
}

export function createIssue(navigator) {
  return (dispatch, getState) => {
    const { id, userId } = getState().auth.token.lbToken;
    const { issue } = getState().mis;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(issue.email) === false) {
      dispatch({
        type: 'AMEND_ISSUE',
        keys: 'warn',
        value: 'email',
      });
    } else if (!issue.message) {
      dispatch({
        type: 'AMEND_ISSUE',
        keys: 'warn',
        value: 'NoMsg',
      });
    } else {
      issue.userId = userId;
      // console.warn(JSON.stringify(issue))
      loading('show', navigator);
      postIssue({
        token: id,
        data: issue,
      }, Request)
        .then((res) => {
          // console.warn(JSON.stringify(res));
          // console.warn(JSON.stringify(err));
          loading('hide', navigator);
          dispatch(trackEvent('createIssue', res));
          navigator.pop();
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          loading('hide', navigator);
        });
    }
  };
}


export function inputIssue(keys, value) {
  return dispatch => dispatch({
    type: 'AMEND_ISSUE',
    keys,
    value,
  });
}
