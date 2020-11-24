const initialState = {
  filters: {},
  sale: [],
  nw: [],
  activeFilters: {},
  activeFields: [],
  upper_izd: [],
  all_upper: []
};

export function filterReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ALL_UPPER':
      return {
        ...state,
        all_upper: action.payload
      };
    case 'SET_ACTIVE_FIELDS':
      return {
        ...state,
        activeFields: action.payload
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload
      };
    case 'SET_ACTIVE_FILTERS':
      return {
        ...state,
        activeFilters: action.payload
      };
    case 'SET_UPPER':
      return {
        ...state,
        upper_izd: action.payload
      };
    case 'SET_SALE':
      return {
        ...state,
        sale: action.payload
      };
    case 'SET_NEW':
      return {
        ...state,
        nw: action.payload
      };
    default:
      return state;
  }
}
