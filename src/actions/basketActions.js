const basketActions = {
  setBasket: data => {
    return {
      type: 'GOODS:SET_ALL',
      payload: data
    };
  },
  addGood: data => {
    return {
      type: 'GOOD:ADD',
      payload: data
    };
  },
  editGood: data => {
    return {
      type: 'GOOD:EDIT',
      payload: data
    };
  },

  deleteAll: data => {
    return {
      type: 'GOODS:DELETE_ALL',
      payload: data
    };
  },
  deleteGood: data => {
    return {
      type: 'GOOD:DELETE',
      payload: data
    };
  }
};
export default basketActions;
