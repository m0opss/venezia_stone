export const SEL_MAT = 'SELECT_MATERIAL';


const userActions = {
  setUserInfo: data => {
    return {
      type: 'SET_USER_INFO',
      payload: data
    };
  },

};

export default userActions;
