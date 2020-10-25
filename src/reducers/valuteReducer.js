

const initialState = {
  valute: 'rub'
};

export function valuteReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_VALUTE':
      return {
        ...state,
        valute: action.payload
      }
    default:
      return state
  }    
}
