
const initialState = {
  filters: {},
  activeFilters: {},
  activeFields: [],
  level: 0,
  f_set: () => {},
  f_dset: () => {},
  groups: '',
  items: ''
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
    case 'SET_MOB_DATA':
      return {
        ...state,
        f_set: action.payload
      };
    case 'SET_DEF_MOB_DATA':
      return {
        ...state,
        f_dset: action.payload
      };
    case 'SET_GROUPS':
      return {
        ...state,
        groups: action.payload
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
