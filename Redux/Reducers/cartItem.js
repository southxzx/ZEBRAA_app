import {
  ADD_TO_CART,
  ADD_TO_CART_FAILED,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_CART
} from '../constants';


const cartItem = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload]
    case ADD_TO_CART_FAILED:
      return [...state]
    case REMOVE_FROM_CART:
      return state.filter(cartItem => (cartItem._id !== action.payload)
      )
    case CLEAR_CART:
      return state = []
    case GET_CART:
      return [...action.payload.cart]
  }
  return state;
}

export default cartItem;