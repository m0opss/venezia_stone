
const izbrActions = {
  setIzbrPs: data => {
    return {
      type: 'SET_IZBR_PS',
      payload: data
    };
  },
  setIzbr: data => {
    return {
      type: 'SET_IZBR',
      payload: data
    };
  },
};

export default izbrActions;
