import {SET_GOOD_ARR, SET_SELECTED_GOOD} from '../actions/goodAction'

const initialState = {
    goodArray: []
  }

  export function goodReducer(state = initialState, action) {
    switch (action.type) {
      case SET_SELECTED_GOOD:
        return {
          ...state,
          selectedGoodId: action.payload
        }
      case SET_GOOD_ARR:
        return {
          ...state,
          goodArray: action.payload
        }
      default:
        return state
    }    
  }