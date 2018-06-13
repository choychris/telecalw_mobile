const changeItem = (id, coins) =>
  ({
    type: 'ITEM_PRESS',
    item: id,
    coins,
  });

export const toggleItem = (id, coins) =>
  (dispatch) => {
    dispatch(changeItem(id, coins));
  };

export const navigateGame = start =>
  (dispatch) => {
    dispatch({ type: 'START_GAME', start });
  };

export default null;
