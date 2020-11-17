
const initialState = {
  izbrPsList: [],
  izbrList: [],
};

export function izbrReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_IZBR_PS":
      return {
        ...state,
        izbrPsList: action.payload
      }
    case "SET_IZBR":
      return {
        ...state,
        izbrPsList: action.payload
      }
    default:
      return state
  }    
}
