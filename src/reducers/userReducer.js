

const initialState = {
  user_info: {},
  user_name: ''
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        user_info: action.payload
      }
    case 'SET_USER_NAME':
      return {
        ...state,
        user_name: action.payload
      }
    default:
      return state
  }    
}
