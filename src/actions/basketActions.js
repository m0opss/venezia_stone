const basketActions = {
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
  deleteGood: data => {
    return {
      type: 'GOOD:DELETE',
      payload: data
    };
  }
};
export default basketActions