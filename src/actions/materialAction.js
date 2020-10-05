export const SEL_MAT = 'SELECT_MATERIAL'
export const SET_MAT_I_LIST = 'SET_MATERIAL_ITEMS_LIST'


const materialActions = {
  setSelectedMaterial: (data) => {
    return {
      type: SEL_MAT,
      payload: data,
    }
  },
  setMaterialItemList: (data) => {
    return {
      type: SET_MAT_I_LIST,
      payload: data,
    }
  },
}

export default materialActions