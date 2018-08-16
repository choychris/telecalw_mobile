import { getProductWithFilter } from '../../common/api/request/product';
import { exchangePrize } from '../../common/api/request/prize';
import { loading, message, errorMessage } from '../utilities/actions';

export const getPrizeList = () =>
  (dispatch, getState) => {
    const { id } = getState().auth.token.lbToken;
    const filter = {
      fields: {
        id: true,
        name: true,
        images: true,
        description: true,
        size: true,
        weight: true,
        status: true,
        ticketPrice: true,
        sku: true,
      },
      where: {
        ticketPrice: {
          gt: 0,
        },
      },
      order: 'created DESC',
    };
    getProductWithFilter(JSON.stringify(filter), id)
      .then((res) => {
        dispatch({
          type: 'GET_PRIZES_LIST',
          value: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const buyPrizes = (navigator, productId, prizeTicket, productName) =>
  (dispatch, getState) => {
    const { userId, id } = getState().auth.token.lbToken;
    const { ticket } = getState().auth.wallet;
    if (ticket >= prizeTicket) {
      loading('show', navigator);
      exchangePrize(userId, undefined, productId, id)
        .then((res) => {
          loading('hide', navigator);
          if (res.res.msg === 'not_enough_ticket') {
            errorMessage(
              'show',
              navigator,
              {
                title: 'Not Enough Tickets',
                message: 'Get more Tickets',
              },
            );
          } else if (res.res.msg === 'success') {
            dispatch({
              type: 'UPDATE_WALLET_TICKET',
              value: (ticket - prizeTicket),
            });
            message(
              'show',
              navigator,
              {
                type: 'happy',
                header: 'Ya!',
                title: 'Prize acquired!',
                message: `Congrats You just get ${productName}!`,
              },
            );
          }
        })
        .catch((error) => {
          console.log(error);
          loading('hide', navigator);
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
      // loading('hide', navigator);
      errorMessage(
        'show',
        navigator,
        {
          title: 'Not Enough Tickets',
          message: 'Get more Tickets',
        },
      );
    }
  };

export default null;
