const axiosActions = {
  setResponseData: ({type, payload}) => {
    return {
      type: type,
      payload: payload
    };
  },
};

export default axiosActions;
