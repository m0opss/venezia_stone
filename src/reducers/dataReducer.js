import {DATA_REQUEST, SET_NUM_G} from '../actions/dataAction'

const initialState = {
  mts : [],
  eur: 0,
  usd: 0,
  num_gr: {}
}

export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_REQUEST:
      return {
        ...state,
        mts: action.payload.mts,
        usd: action.payload.usd,
        eur: action.payload.eur
      }
    case SET_NUM_G:
      return {
        ...state,
        num_gr: action.payload
      }
    default:
      return state
  }    
}