const initialState = {
  filters: {},
  sale: [],
  nw: [],
  activeFilters: {},
  activeFields: [],
  upper_izd: [],
  all_upper: [],
  cost: [],
  le: [],
  he: [],
  lvl: null
};

export function filterReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LVL':
      return {
        ...state,
        lvl: action.payload
      }
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
    case 'SET_COST':
      return {
        ...state,
        cost: action.payload
      };
    case 'SET_LE':
      return {
        ...state,
        le: action.payload
      };
    case 'SET_HE':
      return {
        ...state,
        he: action.payload
      };
    default:
      return state;
  }
}
