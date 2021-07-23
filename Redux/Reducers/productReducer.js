import {
  FETCH_CATE,
  FETCH_PRODUCT
} from '../constants';

let initialState = {
  loadingCate: true,
  loadingProduct: true,
  cateList: [],
  productList: [],
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATE: {
      return { ...state, cateList: action.payload }
    }
    case FETCH_PRODUCT: {
      console.log(action.payload.length);
      return { ...state, productList: action.payload, loadingProduct: false }
    }
  }
  return state;
}

export default productReducer;