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
  setMobData: data => {
    return {
      type: 'SET_MOB_DATA',
      payload: data
    };
  },
  setDefMobData: data => {
    return {
      type: 'SET_DEF_MOB_DATA',
      payload: data
    };
  },
  setGroups: data => {
    return {
      type: 'SET_GROUPS',
      payload: data
    };
  },
  setItems: data => {
    return {
      type: 'SET_ITEMS',
      payload: data
    };
  },
  setUpper: data => {
    return {
      type: 'SET_UPPER',
      payload: data
    };
  },
  setActiveFilters: data => {
    return {
      type: 'SET_ACTIVE_FILTERS',
      payload: data
    };
  },
  setShareFilterFunc: data => {
    return {
      type: 'SET_SHARE_FILTER',
      payload: data
    };
  }
};

export default filterActions;
