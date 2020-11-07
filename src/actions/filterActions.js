const filterActions = {
  setActiveFields: data => {
    return {
      type: 'SET_ACTIVE_FIELDS',
      payload: data
    };
  },
  setLvl: data => {
    return {
      type: 'SET_LVL',
      payload: data
    };
  },
  setFilters: data => {
    return {
      type: 'SET_FILTERS',
      payload: data
    };
  },

  setActiveFilters: data => {
    return {
      type: 'SET_ACTIVE_FILTERS',
      payload: data
    };
  }
};

export default filterActions;
