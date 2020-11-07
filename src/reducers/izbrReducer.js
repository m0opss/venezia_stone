
const initialState = {
  izbrPsList: []
};

export function izbrReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_IZBR":
      return {
        ...state,
        izbrPsList: action.payload
      }
    default:
      return state
  }    
}
