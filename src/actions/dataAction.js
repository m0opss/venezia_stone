export const DATA_REQUEST = 'GET_REQUEST'
export const SET_NUM_G = 'SET_NUM_GROUPS'


const dataActions = {
  getDataResponse: (data) => {
    return {
      type: DATA_REQUEST,
      payload: data,
    }
  },
  setNumGroups: data => {
    return {
      type: SET_NUM_G,
      payload: data
    };
  }
}

export default dataActions
