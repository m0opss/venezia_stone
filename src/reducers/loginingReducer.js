
// import {DATA_REQUEST} from '../actions/dataAction'

const initialState = {
  isLogging: false
}

export function loginingReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGGED':
      return {
        ...state,
        isLogging: action.payload 
      }
    default:
      return state
  }    
}