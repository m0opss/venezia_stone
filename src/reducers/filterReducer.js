import {  SET_CH_MT } from '../actions/filterActions';

const initialState = {
  filters: {},
  activeFilter: {}
};

export function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CH_MT:
      return {
        ...state,
        choosedMat: action.payload
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload
      };
    case 'SET_DEFAULT_FILTER_FIELDS':
      return {
        ...state,
        activeFilter: action.payload
      };
    case 'SET_FILTER_FIELD':
      return {
        ...state,
        activeFilter: action.payload
      };
    default:
      return state;
  }
}
