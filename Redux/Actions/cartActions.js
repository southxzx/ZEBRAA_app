import axios from 'axios';
import baseURL from '../../assets/common/baseURL';

import {
  ADD_TO_CART,
  ADD_TO_CART_FAILED,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_CART,
} from '../constants';

const addCart = (itemCart) => {
  return {
    type: ADD_TO_CART,
    payload: itemCart
  }
}
export const addToCart = (payload) =>
  async (dispatch) => {
    const res = await axios.post(`${baseURL}cart/add`, payload);
    if (res.data && res.data.success) {
      dispatch(getCart(payload.idUser || '607a9c70d7d435322ca372d7'));
    } else {
      dispatch(addCartFailed());
    }
  }
const addCartFailed = () => {
  return {
    type: ADD_TO_CART_FAILED
  }
}
export const getCart = (idUser) =>
  async (dispatch) => {
    console.log(idUser);
    const res = await axios.get(`${baseURL}cart/get?idUser=${idUser}`);
    dispatch(getCartAction(res.data));
  }
const getCartAction = (cartList) => {
  return {
    type: GET_CART,
    payload: cartList
  }
}
export const removeFromCart = (idItem) =>
  async (dispatch) => {
    const res = await axios.delete(`${baseURL}cart/delete?idItem=${idItem}`);
    dispatch(removeCartAction(idItem));
  }

  export const removeCartAction = (idItem) => {
    return {
      type: REMOVE_FROM_CART,
      payload: idItem
    }
  }

export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}