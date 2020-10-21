

const initialState = {
  user_info: {}
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        user_info: action.payload
      }
    default:
      return state
  }    
}
