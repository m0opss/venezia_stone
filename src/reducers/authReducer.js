
// import {DATA_REQUEST} from '../actions/dataAction'

const initialState = {
  isAuth: false,
  auth_token : ''
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuth: action.payload 
      }
    case 'SET_TOKEN':
      return {
        ...state,
        auth_token: action.payload 
      }
    default:
      return state
  }    
}