import {SEL_MAT, SET_WORK_ARR, SET_MAT_I_LIST} from '../actions/materialAction'

const initialState = {
  selectedMaterial: ''
};

export function materialReducer(state = initialState, action) {
  switch (action.type) {
    case SEL_MAT:
      return {
        ...state,
        selectedMaterial: action.payload
      }
    default:
      return state
  }    
}
