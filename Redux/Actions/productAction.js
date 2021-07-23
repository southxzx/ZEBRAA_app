import axios from 'axios';
import { FETCH_PRODUCT, FETCH_CATE } from '../constants';
import baseURL from '../../assets/common/baseURL';

const getCate = (cateList) => {
  return {
    type: FETCH_CATE,
    payload: cateList
  }
}
export const getCategories = () =>
  async (dispatch) => {
    const res = await axios.get(`${baseURL}category/get`);
    dispatch(getCate(res.data));
  }

const getProducts = (productList) => {
  return {
    type: FETCH_PRODUCT,
    payload: productList
  }
}
export const fetchProducts = (args) =>
  async (dispatch) => {
    const res = await axios.post(`${baseURL}product/getAll`, args)
    dispatch(getProducts(res.data.data));
  }