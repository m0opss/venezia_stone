export const SEL_MAT = 'SELECT_MATERIAL';


const userActions = {
  setUserInfo: data => {
    localStorage.setItem('email', data.email)
    localStorage.setItem('first_name', data.first_name)
    localStorage.setItem('last_name', data.last_name)
    localStorage.setItem('middle_name', data.middle_name)
    localStorage.setItem('phone', data.phone)
    return {
      type: 'SET_USER_INFO',
      payload: data
    };
  },
  setUserName: data => {
    return {
      type: 'SET_USER_NAME',
      payload: data
    };
  },
};

export default userActions;
