import {DATA_REQUEST, SET_NUM_G} from '../actions/dataAction'

const initialState = {
  mts : [],
  eur: 0,
  usd: 0,
  sale: [],
  new: []
}

export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_REQUEST:
      return {
        ...state,
        mts: action.payload.mts,
        usd: action.payload.usd,
        eur: action.payload.eur,
        sale: action.payload.sale,
        new: action.payload.new,
      }
    case "SET_DATA":
      return {
        ...state,
        mts: action.payload,
      }
    default:
      return state
  }    
}