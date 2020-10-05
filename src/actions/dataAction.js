export const DATA_REQUEST = 'GET_REQUEST'


const dataActions = {
  getDataResponse: (data) => {
    return {
      type: DATA_REQUEST,
      payload: data,
    }
  },
}

export default dataActions
