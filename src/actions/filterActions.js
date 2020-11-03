export const SET_MT_L = 'SET_MATERIAL_LIST'
export const SET_CH_MT = 'SET_CHOOSED_MAT'

const filterActions = {
    setChoosedMat: (data) => {
      return {
        type: SET_CH_MT,
        payload: data,
      }
    },
    setFilters: (data) => {
      return {
        type: 'SET_FILTERS',
        payload: data,
      }
    },
    setDefaultFields: (data) => {
      return {
        type: 'SET_DEFAULT_FILTER_FIELDS',
        payload: data,
      }
    },
    setFilterField: (data) => {
      return {
        type: 'SET_FIELD',
        payload: data,
      }
    },
    setActiveFields: (data) => {
      return {
        type: 'SET_ACTIVE_FIELDS',
        payload: data,
      }
    },
  }
  
  export default filterActions
  