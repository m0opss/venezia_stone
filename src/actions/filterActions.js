const filterActions = {
  setActiveFields: data => {
    return {
      type: 'SET_ACTIVE_FIELDS',
      payload: data
    };
  },
  setFilters: data => {
    return {
      type: 'SET_FILTERS',
      payload: data
    };
  },
  setUpper: data => {
    return {
      type: 'SET_UPPER',
      payload: data
    };
  },
  setCost: data => {
    return {
      type: 'SET_COST',
      payload: data
    };
  },
  setLe: data => {
    return {
      type: 'SET_LE',
      payload: data
    };
  },
  setHe: data => {
    return {
      type: 'SET_HE',
      payload: data
    };
  },
  setNew: data => {
    return {
      type: 'SET_NEW',
      payload: data
    };
  },
  setSale: data => {
    return {
      type: 'SET_SALE',
      payload: data
    };
  },
  setActiveFilters: data => {
    return {
      type: 'SET_ACTIVE_FILTERS',
      payload: data
    };
  },
  setAllUpper: data => {
    return {
      type: 'SET_ALL_UPPER',
      payload: data
    };
  }
};

export default filterActions;
