import { getProductWithFilter } from '../../common/api/request/product';

export const getPrizeList = () =>
  (dispatch, getState) => {
    const { id } = getState().auth.token.lbToken;
    const filter = {
      fields: {
        name: true,
        images: true,
        description: true,
        size: true,
        weight: true,
        status: true,
        ticketPrice: true,
        sku: true,
      },
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

export default null;
