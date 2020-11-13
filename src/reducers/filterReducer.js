const initialState = {
  filters: {},
  activeFilters: {},
  activeFields: [],
  level: 0,
  f_set: () => {},
  f_dset: () => {},
  f_share: () => {},
  groups: [],
  upper_izd: [],
  items: []
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
        groups: [action.payload]
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: [action.payload]
      };
    case 'SET_UPPER':
      return {
        ...state,
        upper_izd: action.payload,
      };
    case 'SET_SHARE_FILTER':
      return {
        ...state,
        f_share: action.payload
      };
    default:
      return state;
  }
}
