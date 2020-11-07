
const initialState = {
  filters: {},
  activeFilters: {},
  activeFields: [],
  level: 0
};

export function filterReducer(state = initialState, action) {
  switch (action.type) {
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
    case 'SET_LVL':
      return {
        ...state,
        level: action.payload
      };
    case 'SET_ACTIVE_FILTERS':
      return {
        ...state,
        activeFilters: action.payload
      };
    default:
      return state;
  }
}
