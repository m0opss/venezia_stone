export const SET_MT_L = 'SET_MATERIAL_LIST'
export const SET_CH_MT = 'SET_CHOOSED_MAT'

const filterActions = {
    setChoosedMat: (data) => {
      return {
        type: SET_CH_MT,
        payload: data,
      }
    },

  }
  
  export default filterActions
  