export const SEL_MAT = 'SELECT_MATERIAL';


const materialActions = {
  setSelectedMaterial: data => {
    return {
      type: SEL_MAT,
      payload: data
    };
  },

};

export default materialActions;
