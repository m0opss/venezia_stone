import {DATA_REQUEST} from '../actions/dataAction'

const initialState = {
  mts : []
}

export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_REQUEST:
      return {
        ...state,
        url: action.payload.photolink,
        mts: action.payload.mts
      }
    default:
      return state
  }    
}