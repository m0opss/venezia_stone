const initialState = {
  basket: []
};

export function basketReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'GOODS:GET_ALL': {
      if (state.basket.length > 0) {
        return state;
      } else if (localStorage.getItem('basket') !== null) {
        return {
          ...state,
          basket: [...JSON.parse(localStorage.getItem('basket'))]
        };
      }
    }
    case 'GOODS:DELETE_ALL': {
      localStorage.setItem('basket', JSON.stringify([]));
      return {
        ...state,
        basket: []
      };
    }
    case 'GOOD:ADD': {
      let newbasket = [];
      if (state.basket.length > 0) {
        newbasket = [...state.basket, payload];
        localStorage.setItem('basket', JSON.stringify(newbasket));
      } else {
        if (localStorage.getItem('basket') !== null) {
          newbasket = [...JSON.parse(localStorage.getItem('basket')), payload];
        } else {
          newbasket = [payload];
        }
      }
      return {
        ...state,
        basket: newbasket
      };
    }

    case 'GOOD:DELETE': {
      return {
        ...state,
        basket: state.basket.filter(n => n.ps !== payload.ps)
      };
    }

    case 'GOOD:EDIT': {
      const a = state.basket.map(el => {
        if (payload.goodId === el.goodId) {
          el.goodCount += 0.5;
          // return el;
        }
      });
      return {
        ...state,
        basket: state.basket.map(n =>
          n.goodId === payload.goodId ? payload : n
        )
      };
    }

    default:
      return state;
  }
}
