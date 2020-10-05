export const SET_GOOD_ARR = 'SET_GOOD_ARR'
export const SET_SELECTED_GOOD = 'SELECTED_GOOD'

const goodActions = {
    setSelectedGood: (data) => {
      return {
        type: SET_SELECTED_GOOD,
        payload: data,
      }
    },
    setGoodArray: (data) => {
      return {
        type: SET_GOOD_ARR,
        payload: data,
      }
    }
  }
  
  export default goodActions
  