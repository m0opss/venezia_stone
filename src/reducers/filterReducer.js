import {  SET_CH_MT } from '../actions/filterActions';

const initialState = {
  materialNames: [],
  choosedMat: ''
};

export function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CH_MT:
      return {
        ...state,
        choosedMat: action.payload
      };

    default:
      return state;
  }
}
